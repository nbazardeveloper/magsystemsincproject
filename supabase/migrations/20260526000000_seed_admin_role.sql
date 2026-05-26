-- Seed admin role for the initial admin user
INSERT INTO public.user_roles (user_id, role)
VALUES ('e563c76f-f6f0-4a71-8889-258fc9a58678', 'admin')
ON CONFLICT DO NOTHING;
