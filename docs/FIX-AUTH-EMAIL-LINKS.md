# Fix: Auth emails still showing localhost

Password reset and signup confirmation emails are built by **Supabase** using the **Site URL** set in your project. If that is `http://localhost:3000`, every link in those emails will point to localhost.

## Fix in Supabase (required)

1. Open **[Supabase Dashboard](https://supabase.com/dashboard)** and select your project.
2. Go to **Authentication** → **URL Configuration**  
   (or: https://supabase.com/dashboard/project/YOUR_PROJECT_REF/auth/url-configuration)
3. Set **Site URL** to:
   ```text
   https://astarus.ai
   ```
4. Under **Redirect URLs**, add (if not already there):
   ```text
   https://astarus.ai/**
   ```
   and/or:
   ```text
   https://astarus.ai/auth/callback
   ```
5. Save.

After this, new password reset and signup emails will use `https://astarus.ai` in the links instead of localhost. No code or deploy change is required for this; it’s a one-time dashboard change.
