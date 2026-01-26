-- Create table for B2B/Wholesale applications
CREATE TABLE public.wholesale_applications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    business_type TEXT NOT NULL, -- 'restaurant', 'bar', 'market', 'hotel', 'other'
    tax_id TEXT,
    estimated_monthly_volume TEXT,
    product_interests TEXT[], -- array of product categories
    locations_count INTEGER DEFAULT 1,
    website_url TEXT,
    additional_notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.wholesale_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public application form)
CREATE POLICY "Anyone can submit wholesale applications"
ON public.wholesale_applications
FOR INSERT
WITH CHECK (true);

-- Only admins can view applications
CREATE POLICY "Admins can view wholesale applications"
ON public.wholesale_applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update applications (change status)
CREATE POLICY "Admins can update wholesale applications"
ON public.wholesale_applications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_wholesale_applications_updated_at
BEFORE UPDATE ON public.wholesale_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create table for approved B2B customers (linked to auth users)
CREATE TABLE public.wholesale_customers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    tax_id TEXT,
    business_type TEXT NOT NULL,
    discount_tier TEXT DEFAULT 'standard', -- 'standard', 'premium', 'vip'
    payment_terms TEXT DEFAULT 'net30', -- 'net15', 'net30', 'net60'
    is_active BOOLEAN DEFAULT true,
    application_id UUID REFERENCES public.wholesale_applications(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.wholesale_customers ENABLE ROW LEVEL SECURITY;

-- Wholesale customers can view their own record
CREATE POLICY "Wholesale customers can view own record"
ON public.wholesale_customers
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all wholesale customers
CREATE POLICY "Admins can view all wholesale customers"
ON public.wholesale_customers
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage wholesale customers
CREATE POLICY "Admins can manage wholesale customers"
ON public.wholesale_customers
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_wholesale_customers_updated_at
BEFORE UPDATE ON public.wholesale_customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check if current user is a wholesale customer
CREATE OR REPLACE FUNCTION public.is_wholesale_customer()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.wholesale_customers
    WHERE user_id = auth.uid()
      AND is_active = true
  )
$$;