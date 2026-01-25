-- Add RLS policy to allow admins to view all user roles
-- This enables proper role management and auditing by administrators

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));