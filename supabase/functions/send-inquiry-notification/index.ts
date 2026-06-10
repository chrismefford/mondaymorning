import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ROUTING: Record<string, string> = {
  b2b:        'operations@mondaymorning-af.com',
  popups:     'operations@mondaymorning-af.com',
  consulting: 'zane@mondaymorning-af.com',
  brewing:    'brewery@mondaymorning-af.com',
  events:     'zane@mondaymorning-af.com',
  tasting:    'zane@mondaymorning-af.com',
  general:    'zane@mondaymorning-af.com',
};

const LABELS: Record<string, string> = {
  b2b:        'B2B & Distribution',
  popups:     'Retail Pop-Up',
  consulting: 'Consulting',
  brewing:    'Contract Brewing',
  events:     'Events & Vibations',
  tasting:    'Tasting',
  general:    'General Inquiry',
};

const esc = (s: unknown) =>
  String(s ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]!));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

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
      .from('inquiries')
      .select('*')
      .eq('id', inquiryId)
      .single();

    if (fetchError || !inq) {
      console.error('Failed to fetch inquiry:', fetchError);
      return new Response(JSON.stringify({ error: 'Inquiry not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const recipient = ROUTING[inq.offering] ?? ROUTING.general;
    const label = LABELS[inq.offering] ?? LABELS.general;

    const row = (k: string, v: string) => `
      <tr>
        <td style="padding:8px 12px;font-family:Georgia,serif;color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;width:140px;vertical-align:top;">${esc(k)}</td>
        <td style="padding:8px 12px;font-family:Georgia,serif;color:#1f2937;font-size:15px;">${esc(v)}</td>
      </tr>`;

    const emailHtml = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#faf7f2;font-family:Georgia,serif;color:#1f2937;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
      <tr>
        <td style="padding:24px 28px;background:#1f3a2e;color:#f5e9c8;">
          <div style="font-family:Georgia,serif;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.8;">Monday Morning</div>
          <h1 style="margin:6px 0 0;font-family:Georgia,serif;font-size:22px;font-weight:normal;">New ${esc(label)} Inquiry</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            ${row('Name', inq.name)}
            ${row('Email', inq.email)}
            ${inq.company ? row('Company / Venue', inq.company) : ''}
            ${inq.phone ? row('Phone', inq.phone) : ''}
            ${inq.message ? row('Message', inq.message) : ''}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;background:#faf7f2;color:#6b7280;font-size:12px;font-family:Georgia,serif;border-top:1px solid #e5e7eb;">
          ${esc(label)} · Submitted ${esc(new Date(inq.created_at).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))}
        </td>
      </tr>
    </table>
  </body>
</html>`;

    const { error: queueError } = await supabase.rpc('enqueue_transactional_email', {
      p_to: recipient,
      p_subject: `New ${label} Inquiry: ${inq.name}${inq.company ? ` (${inq.company})` : ''}`,
      p_html: emailHtml,
      p_template_name: `inquiry-${inq.offering}`,
    });

    if (queueError) {
      console.error('Failed to queue email:', queueError);
      return new Response(JSON.stringify({ error: 'Failed to queue notification email' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fire-and-forget forward to external CRM
    const crmUrl = Deno.env.get('CRM_INQUIRY_URL');
    const crmSecret = Deno.env.get('CRM_INQUIRY_SECRET');
    if (crmUrl && crmSecret) {
      try {
        const crmRes = await fetch(crmUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-inquiry-secret': crmSecret,
          },
          body: JSON.stringify({
            inquiry_id: inq.id,
            offering: inq.offering,
            name: inq.name,
            email: inq.email,
            company: inq.company ?? null,
            phone: inq.phone ?? null,
            message: inq.message ?? null,
          }),
        });
        if (crmRes.ok) {
          const { error: updErr } = await supabase
            .from('inquiries')
            .update({ crm_synced: true })
            .eq('id', inq.id);
          if (updErr) console.error('Failed to mark crm_synced:', updErr);
        } else {
          const body = await crmRes.text().catch(() => '');
          console.error('CRM forward non-2xx:', crmRes.status, body);
        }
      } catch (crmErr) {
        console.error('CRM forward failed:', crmErr);
      }
    } else {
      console.warn('CRM_INQUIRY_URL or CRM_INQUIRY_SECRET not set; skipping CRM forward');
    }

    return new Response(JSON.stringify({ success: true, routedTo: recipient }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in send-inquiry-notification:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
