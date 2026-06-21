import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NOTIFY_EMAIL = 'zane@mondaymorning-af.com';

const LABELS: Record = {
  b2b: 'B2B & Distribution',
  popups: 'Retail Pop-Up',
  consulting: 'Consulting',
  brewing: 'Contract Brewing',
  events: 'Events & Vibations',
  tasting: 'Tasting',
  general: 'General Inquiry',
};

const esc = (s: unknown) =>
  String(s ?? '').replace(/[<>&]/g, (c) => ({ '<': '<', '>': '>', '&': '&' }[c]!));

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const { inquiryId } = await req.json();
    if (!inquiryId) {
      return new Response(JSON.stringify({ error: 'inquiryId is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: inq, error: fetchError } = await supabase
      .from('inquiries').select('*').eq('id', inquiryId).single();
    if (fetchError || !inq) {
      return new Response(JSON.stringify({ error: 'Inquiry not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const recipient = NOTIFY_EMAIL;
    const label = LABELS[inq.offering] ?? LABELS.general;

const emailHtml = `

<div style="margin:0;padding:0;background:#FFF6E5;font-family:Helvetica,Arial,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF6E5;padding:24px 0;">

    <tr><td align="center">

      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:92%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e6dfce;">

        <tr><td style="background:#255256;padding:22px 28px;">

          <div style="color:#E2A325;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">New ${esc(label)} Inquiry</div>

          <div style="color:#FFF6E5;font-size:22px;font-weight:700;margin-top:4px;">Monday Morning Lab</div>

        </td></tr>

        <tr><td style="padding:24px 28px;">

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;color:#255256;">

            <tr><td style="padding:6px 0;opacity:.6;width:110px;">Name</td><td style="padding:6px 0;font-weight:600;">${esc(inq.name)}</td></tr>

            <tr><td style="padding:6px 0;opacity:.6;">Email</td><td style="padding:6px 0;"><a href="mailto:${esc(inq.email)}" style="color:#48A3AA;">${esc(inq.email)}</a></td></tr>

            ${inq.company ? `<tr><td style="padding:6px 0;opacity:.6;">Company</td><td style="padding:6px 0;">${esc(inq.company)}</td></tr>` : ''}

            ${inq.phone ? `<tr><td style="padding:6px 0;opacity:.6;">Phone</td><td style="padding:6px 0;"><a href="tel:${esc(inq.phone)}" style="color:#255256;">${esc(inq.phone)}</a></td></tr>` : ''}

          </table>

          ${inq.message ? `<div style="margin-top:16px;padding:14px 16px;background:#E2F1F3;border-radius:8px;border-left:3px solid #E2A325;font-size:14px;line-height:1.5;color:#255256;white-space:pre-wrap;">${esc(inq.message)}</div>` : ''}

        </td></tr>

        <tr><td style="padding:14px 28px;border-top:1px solid #eee;opacity:.55;font-size:12px;color:#255256;">${esc(label)} · Submitted ${new Date(inq.created_at).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</td></tr>

      </table>

    </td></tr>

  </table>

</div>

`;

    const { error: queueError } = await supabase.rpc('enqueue_transactional_email', {
      p_to: recipient,
      p_subject: `New ${label} Inquiry: ${inq.name}${inq.company ? ` (${inq.company})` : ''}`,
      p_html: emailHtml,
      p_template_name: `inquiry-${inq.offering}`,
    });
    if (queueError) {
      return new Response(JSON.stringify({ error: 'Failed to queue notification email' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Forward to the Sales CRM (best-effort; never fails the email).
    // ONLY B2B inquiries become CRM leads (they can become Shopify wholesale
    // accounts). The other offerings (consulting, pop-ups, brewing, events) are
    // partnership requests — they email the team only, and are NOT pushed into
    // the B2B sales pipeline.
    let crmSynced = false, crmStatus: number | null = null, crmError: string | null = null;
    const crmUrl = Deno.env.get('CRM_INQUIRY_URL');
    const crmSecret = Deno.env.get('CRM_INQUIRY_SECRET');
    const forwardToCrm = inq.offering !== 'brewing';
    const crmConfigured = !!(crmUrl && crmSecret);
    if (forwardToCrm && crmUrl && crmSecret) {
      try {
        const res = await fetch(crmUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-inquiry-secret': crmSecret },
          body: JSON.stringify({
            offering: inq.offering, name: inq.name, email: inq.email,
            company: inq.company, phone: inq.phone, message: inq.message, inquiry_id: inq.id,
            address: inq.address, city: inq.city, state: inq.state, zip: inq.zip,
            event_kind: inq.event_kind,
          }),
        });
        crmStatus = res.status;
        crmSynced = res.ok;
        if (res.ok) {
          await supabase.from('inquiries').update({ crm_synced: true }).eq('id', inq.id);
        } else {
          crmError = await res.text();
        }
      } catch (e) {
        crmError = e instanceof Error ? e.message : String(e);
      }
    }

    // Forward brewing inquiries to the Monday Morning Lab (best-effort).
    let labSynced = false, labStatus: number | null = null, labError: string | null = null;
    const labUrl = Deno.env.get('LAB_INQUIRY_URL');
    const labSecret = Deno.env.get('LAB_INQUIRY_SECRET');
    const isBrewing = inq.offering === 'brewing';
    const labConfigured = !!(labUrl && labSecret);
    if (isBrewing && labUrl && labSecret) {
      try {
        const res = await fetch(labUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-brew-secret': labSecret },
          body: JSON.stringify({
            name: inq.name, email: inq.email, company: inq.company,
            phone: inq.phone, message: inq.message, source: 'website',
          }),
        });
        labStatus = res.status;
        labSynced = res.ok;
        if (!res.ok) labError = await res.text();
      } catch (e) {
        labError = e instanceof Error ? e.message : String(e);
      }
    }

    return new Response(
      JSON.stringify({ success: true, routedTo: recipient, crmSynced, crmStatus, crmError, crmConfigured, labSynced, labStatus, labError, labConfigured }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
