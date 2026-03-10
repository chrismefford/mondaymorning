
CREATE TABLE public.social_club_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tier text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  celebration_date text,
  celebration_note text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.social_club_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit social club applications"
  ON public.social_club_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view social club applications"
  ON public.social_club_applications
  FOR SELECT
  TO public
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update social club applications"
  ON public.social_club_applications
  FOR UPDATE
  TO public
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_social_club_applications_updated_at
  BEFORE UPDATE ON public.social_club_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
