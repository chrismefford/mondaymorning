UPDATE auth.users
SET encrypted_password = crypt('AFisBest24!', gen_salt('bf')),
    updated_at = now()
WHERE email = 'zane@mondaymorning-af.com';