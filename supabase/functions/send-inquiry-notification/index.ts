import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ROUTING: Record<string, string> = {
  b2b: 'operations@mondaymorning-af.com',
  popups: 'operations@mondaymorning-af.com',
  consulting: 'zane@mondaymorning-af.com',
  brewing: 'brewery@mondaymorning-af.com',
  events: 'zane@mondaymorning-af.com',
  tasting: 'zane@mondaymorning-af.com',
  general: 'zane@mondaymorning-af.com',
};

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

    const recipient = ROUTING[inq.offering] ?? ROUTING.general;
    const label = LABELS[inq.offering] ?? LABELS.general;

    const emailHtml = `

  

New ${esc(label)} Inquiry

Monday Morning


    

Name: ${esc(inq.name)}


    

Email: ${esc(inq.email)}


    ${inq.company ? `

Company / Venue: ${esc(inq.company)}

` : ''}
    ${inq.phone ? `

Phone: ${esc(inq.phone)}

` : ''}
    ${inq.message ? `

Message:
${esc(inq.message)}

` : ''}
    

${esc(label)} · Submitted ${new Date(inq.created_at).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}

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

    // Forward the lead into the Sales CRM (best-effort; never fails the email).
    let crmSynced = false, crmStatus: number | null = null, crmError: string | null = null;
    const crmUrl = Deno.env.get('CRM_INQUIRY_URL');
    const crmSecret = Deno.env.get('CRM_INQUIRY_SECRET');
    const crmConfigured = !!(crmUrl && crmSecret);
    if (crmUrl && crmSecret) {
      try {
        const res = await fetch(crmUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-inquiry-secret': crmSecret },
          body: JSON.stringify({
            offering: inq.offering, name: inq.name, email: inq.email,
            company: inq.company, phone: inq.phone, message: inq.message, inquiry_id: inq.id,
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

    return new Response(
      JSON.stringify({ success: true, routedTo: recipient, crmSynced, crmStatus, crmError, crmConfigured }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
