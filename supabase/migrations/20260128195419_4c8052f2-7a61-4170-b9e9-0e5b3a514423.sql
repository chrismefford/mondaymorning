-- Add Shopify B2B company location ID to wholesale customers
ALTER TABLE public.wholesale_customers 
ADD COLUMN shopify_company_location_id text;