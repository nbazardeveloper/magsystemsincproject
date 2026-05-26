-- Add new project category values to the enum
ALTER TYPE public.project_category ADD VALUE IF NOT EXISTS 'handyman';
ALTER TYPE public.project_category ADD VALUE IF NOT EXISTS 'tile';
ALTER TYPE public.project_category ADD VALUE IF NOT EXISTS 'flooring';
