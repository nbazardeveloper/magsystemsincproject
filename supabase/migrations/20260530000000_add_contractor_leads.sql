-- Contractor registration leads
CREATE TABLE public.contractor_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  specialization TEXT NOT NULL,
  has_license TEXT NOT NULL,
  service_area TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contractor_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contractor leads"
  ON public.contractor_leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contractor leads"
  ON public.contractor_leads FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contractor leads"
  ON public.contractor_leads FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contractor leads"
  ON public.contractor_leads FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
