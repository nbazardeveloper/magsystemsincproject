CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials" ON public.testimonials
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials" ON public.testimonials
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view faq items" ON public.faq_items
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert faq items" ON public.faq_items
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update faq items" ON public.faq_items
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete faq items" ON public.faq_items
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.testimonials (name, city, text, rating)
VALUES
  ('Melissa Carter', 'Naperville', 'Our bathroom finally feels calm and finished. The crew was precise, clean, and the schedule stayed exactly where they said it would.', 5),
  ('Daniel Flores', 'Evanston', 'They took a cramped kitchen and made it work for how our family actually lives. Every trade showed up prepared and the final details were excellent.', 5),
  ('Priya Shah', 'Wilmette', 'Communication was direct, the workmanship was strong, and there were no surprises at the end. That is rare in renovation work.', 5),
  ('Robert Klein', 'Park Ridge', 'We hired them for a larger remodel and they kept the process organized from demolition through the finish list. We would use them again.', 5);

INSERT INTO public.faq_items (question, answer, sort_order)
VALUES
  ('How much does a bathroom renovation cost?', 'Bathroom renovation pricing depends on layout changes, tile selections, fixtures, and the condition behind the walls. After a walkthrough, we provide a clear scope and line-item estimate so you know exactly what drives the total.', 1),
  ('How long does a kitchen renovation take?', 'Most kitchen projects take several weeks once materials are on site. Final timing depends on custom cabinetry, inspection schedules, and whether structural or electrical updates are required.', 2),
  ('Do you provide a warranty on your work?', 'Yes. We stand behind our workmanship and review warranty coverage with you before the project starts so expectations are clear from day one.', 3),
  ('What areas do you serve?', 'We serve homeowners across the greater Chicago area, including nearby suburbs. If you are unsure whether your location is within range, send us the address and we will confirm quickly.', 4),
  ('Do I need to buy materials myself?', 'No. We can handle sourcing and coordination for the major finish selections, or work with materials you already want to use. The right split depends on your timeline and priorities.', 5),
  ('Can I see examples of your previous projects?', 'Yes. We can walk you through completed kitchens, bathrooms, and full remodels so you can compare layout ideas, finish combinations, and workmanship details.', 6),
  ('How do I get started?', 'Start with a quick call or the contact form. We will schedule a consultation, review the space, and outline the next steps for design, pricing, and construction timing.', 7);