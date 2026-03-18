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
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'name, email, and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="border-bottom: 2px solid #C8A55C; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #1B3A2D; font-size: 24px; margin: 0;">Founder's Club Inquiry</h1>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top; width: 100px;">Name</td>
            <td style="padding: 12px 0; color: #1B3A2D; font-size: 15px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Email</td>
            <td style="padding: 12px 0; color: #1B3A2D; font-size: 15px;"><a href="mailto:${email}" style="color: #1B3A2D;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; color: #1B3A2D; font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
      </div>
    `;

    const { error: emailError } = await supabase.rpc('enqueue_transactional_email', {
      p_to: 'Zane@mondaymorning-af.com',
      p_subject: `Founder's Club Inquiry from ${name}`,
      p_html: html,
      p_template_name: 'founders_club_inquiry',
    });

    if (emailError) {
      console.error('Failed to enqueue email:', emailError);
      throw emailError;
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send inquiry' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
