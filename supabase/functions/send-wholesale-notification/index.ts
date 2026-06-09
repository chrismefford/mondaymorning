import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicationId } = await req.json();
    if (!applicationId) {
      return new Response(JSON.stringify({ error: 'applicationId is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: app, error: fetchError } = await supabase
      .from('wholesale_applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (fetchError || !app) {
      console.error('Failed to fetch application:', fetchError);
      return new Response(JSON.stringify({ error: 'Application not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #ffffff; color: #1a3a2a; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
    .header { background: #1a3a2a; color: #f5f0e8; padding: 24px 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; letter-spacing: 1px; }
    .header p { margin: 8px 0 0; color: #c9a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; }
    .body { padding: 32px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 4px; }
    .value { font-size: 15px; color: #1a3a2a; }
    .footer { border-top: 1px solid #e5e5e5; padding-top: 16px; margin-top: 24px; font-size: 12px; color: #999; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>New Wholesale Application</h1>
    <p>Monday Morning</p>
  </div>
  <div class="container">
    <div class="body">
      <div class="field"><div class="label">Company</div><div class="value">${app.company_name ?? ''}</div></div>
      <div class="field"><div class="label">Contact Name</div><div class="value">${app.contact_name ?? ''}</div></div>
      <div class="field"><div class="label">Email</div><div class="value">${app.email ?? ''}</div></div>
      ${app.phone ? `<div class="field"><div class="label">Phone</div><div class="value">${app.phone}</div></div>` : ''}
      ${app.business_type ? `<div class="field"><div class="label">Business Type</div><div class="value">${app.business_type}</div></div>` : ''}
      ${app.tax_id ? `<div class="field"><div class="label">Tax ID</div><div class="value">${app.tax_id}</div></div>` : ''}
      <div class="footer">
        Submitted ${new Date(app.created_at).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}
      </div>
    </div>
  </div>
</body>
</html>`;

    const { error: queueError } = await supabase.rpc('enqueue_transactional_email', {
      p_to: 'zane@mondaymorning-af.com',
      p_subject: `New Wholesale Application: ${app.company_name}`,
      p_html: emailHtml,
      p_template_name: 'wholesale-application',
    });

    if (queueError) {
      console.error('Failed to queue email:', queueError);
      return new Response(JSON.stringify({ error: 'Failed to queue notification email' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in send-wholesale-notification:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
