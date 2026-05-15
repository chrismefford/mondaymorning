// Note: Function name kept as "mailchimp-subscribe" for backwards compatibility,
// but it now pushes subscribers to Shopify instead of Mailchimp.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SHOPIFY_API_VERSION = '2024-10';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName, tags } = await req.json();

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const adminToken = Deno.env.get('SHOPIFY_ADMIN_ACCESS_TOKEN');
    const adminDomain = Deno.env.get('SHOPIFY_ADMIN_DOMAIN') || Deno.env.get('SHOPIFY_STORE_DOMAIN');

    if (!adminToken || !adminDomain) {
      console.error('Missing Shopify Admin configuration');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const cleanDomain = adminDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const url = `https://${cleanDomain}/admin/api/${SHOPIFY_API_VERSION}/customers.json`;

    const tagList = Array.isArray(tags) && tags.length > 0
      ? tags.map((t: string) => String(t).slice(0, 100))
      : [];
    // Always add a "Newsletter" tag so these signups are easy to segment in Shopify
    if (!tagList.includes('Newsletter')) tagList.push('Newsletter');

    const customer: Record<string, unknown> = {
      email: email.trim(),
      tags: tagList.join(', '),
      email_marketing_consent: {
        state: 'subscribed',
        opt_in_level: 'single_opt_in',
        consent_updated_at: new Date().toISOString(),
      },
    };
    if (firstName) customer.first_name = String(firstName).slice(0, 100);
    if (lastName) customer.last_name = String(lastName).slice(0, 100);

    console.log(`Subscribing email to Shopify: ${email}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': adminToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errors = data?.errors;
      const emailErrors = errors?.email;
      const alreadyExists = Array.isArray(emailErrors)
        && emailErrors.some((e: string) => /has already been taken|already exists/i.test(e));

      if (alreadyExists) {
        // Try to find the existing customer and update marketing consent
        try {
          const searchUrl = `https://${cleanDomain}/admin/api/${SHOPIFY_API_VERSION}/customers/search.json?query=${encodeURIComponent('email:' + email.trim())}`;
          const searchRes = await fetch(searchUrl, {
            headers: { 'X-Shopify-Access-Token': adminToken },
          });
          const searchData = await searchRes.json();
          const existing = searchData?.customers?.[0];
          if (existing?.id) {
            const updateUrl = `https://${cleanDomain}/admin/api/${SHOPIFY_API_VERSION}/customers/${existing.id}.json`;
            const mergedTags = new Set<string>(
              (existing.tags ? String(existing.tags).split(',').map((t: string) => t.trim()).filter(Boolean) : [])
                .concat(tagList)
            );
            await fetch(updateUrl, {
              method: 'PUT',
              headers: {
                'X-Shopify-Access-Token': adminToken,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                customer: {
                  id: existing.id,
                  tags: Array.from(mergedTags).join(', '),
                  email_marketing_consent: {
                    state: 'subscribed',
                    opt_in_level: 'single_opt_in',
                    consent_updated_at: new Date().toISOString(),
                  },
                },
              }),
            });
          }
        } catch (e) {
          console.error('Error updating existing Shopify customer:', e);
        }

        return new Response(
          JSON.stringify({ message: "You're already subscribed!" }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.error('Shopify error:', data);
      return new Response(
        JSON.stringify({ error: 'Failed to subscribe' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully subscribed to Shopify:', email);

    return new Response(
      JSON.stringify({ message: 'Successfully subscribed!', id: data?.customer?.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in newsletter subscribe:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
