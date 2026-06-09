import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicationId } = await req.json();
    if (!applicationId) {
      return new Response(JSON.stringify({ error: "applicationId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: app, error: fetchError } = await supabase
      .from("wholesale_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (fetchError || !app) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const firstName = (app.contact_name || "").trim().split(" ")[0] || "there";

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #ffffff; color: #1a3a2a; margin: 0; padding: 0; }
    .header { background: #1a3a2a; color: #f5f0e8; padding: 28px 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; letter-spacing: 1px; }
    .header p { margin: 8px 0 0; color: #c9a96e; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; }
    .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
    p { font-size: 15px; line-height: 1.6; color: #1a3a2a; }
    .cta { display: inline-block; background: #1a3a2a; color: #f5f0e8 !important; padding: 12px 24px; text-decoration: none; margin-top: 16px; letter-spacing: 1px; font-size: 13px; text-transform: uppercase; }
    .footer { border-top: 1px solid #e5e5e5; padding-top: 16px; margin-top: 32px; font-size: 12px; color: #999; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome to Wholesale</h1>
    <p>Monday Morning</p>
  </div>
  <div class="container">
    <p>Hi ${firstName},</p>
    <p>Good news, your wholesale application for <strong>${app.company_name ?? "your business"}</strong> has been approved.</p>
    <p>We have set up your account in our B2B system. Our team will be in touch shortly with catalog access, pricing, and next steps for placing your first order.</p>
    <p>If you have any questions in the meantime, just reply to this email.</p>
    <p>Cheers,<br/>The Monday Morning Team</p>
    <div class="footer">Monday Morning, non alcoholic drinks for the way you want to live.</div>
  </div>
</body>
</html>`;

    const { error: queueError } = await supabase.rpc("enqueue_transactional_email", {
      p_to: app.email,
      p_subject: "Your Monday Morning wholesale application is approved",
      p_html: emailHtml,
      p_template_name: "wholesale-approval",
    });

    if (queueError) {
      console.error("Failed to queue approval email:", queueError);
      return new Response(JSON.stringify({ error: "Failed to queue email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-wholesale-approval:", error);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
