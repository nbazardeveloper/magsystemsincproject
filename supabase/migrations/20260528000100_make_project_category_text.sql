-- Allow arbitrary project categories from the admin UI instead of a fixed enum list.
ALTER TABLE public.projects
ALTER COLUMN category TYPE text
USING category::text;