-- Create wholesale pricing table to store F&B catalog prices
CREATE TABLE public.wholesale_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_handle TEXT NOT NULL,
    variant_id TEXT,
    wholesale_price DECIMAL(10,2) NOT NULL,
    retail_price DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(product_handle, variant_id)
);

-- Enable RLS
ALTER TABLE public.wholesale_prices ENABLE ROW LEVEL SECURITY;

-- Allow wholesale customers to view prices
CREATE POLICY "Wholesale customers can view wholesale prices"
ON public.wholesale_prices
FOR SELECT
USING (public.is_wholesale_customer());

-- Allow admins to manage prices
CREATE POLICY "Admins can manage wholesale prices"
ON public.wholesale_prices
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_wholesale_prices_updated_at
    BEFORE UPDATE ON public.wholesale_prices
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();