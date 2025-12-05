# Troubleshooting Guide

## Can't Create a Space?

If you're unable to create a space, check the following:

### 1. ✅ Environment Variables Setup

Make sure you have a `.env` file in the project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_BASE_URL=https://your-api-url.com
VITE_API_MODEL=mistral
```

**How to get Supabase credentials:**
1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public key**

**Important:** After adding/updating `.env` file, **restart your development server** (`npm run dev`)

### 2. ✅ Database Schema Setup

The `spaces` and `space_members` tables must be created in your Supabase database.

**Steps:**
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Open the `supabase-schema.sql` file from this project
5. Copy the **entire contents** and paste into the SQL Editor
6. Click **Run** (or press Ctrl+Enter / Cmd+Enter)
7. You should see "Success" message

**Verify tables exist:**
- Go to **Table Editor** in Supabase
- You should see these tables:
  - `spaces`
  - `space_members`
  - `chats`
  - `messages`
  - `user_memory`

### 3. ✅ Authentication

You must be **signed in** to create spaces.

**Check if you're authenticated:**
- Look at the header - if you see "Get Started" button, you're NOT signed in
- If you see your email/name, you ARE signed in
- Go to `/login` or `/signup` to authenticate

### 4. ✅ Check Browser Console

Open browser Developer Tools (F12) and check the Console tab for errors:

**Common errors:**
- `Failed to create space: relation "spaces" does not exist`
  - **Fix:** Run the `supabase-schema.sql` file (see step 2)
  
- `Failed to create space: new row violates row-level security policy`
  - **Fix:** Make sure you ran the complete SQL schema including RLS policies
  
- `Failed to create space: invalid input syntax for type uuid`
  - **Fix:** Check that you're properly authenticated (user.id should be a valid UUID)
  
- `Failed to fetch: Network error` or `Failed to fetch: 401 Unauthorized`
  - **Fix:** Check your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` file

### 5. ✅ Verify Supabase Project Status

- Make sure your Supabase project is **active** (not paused)
- Check that your project hasn't exceeded free tier limits
- Verify the project URL is correct

### 6. ✅ Clear Browser Cache

Sometimes cached data can cause issues:
1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or clear browser cache manually

## Quick Checklist

Before reporting an issue, verify:

- [ ] `.env` file exists with correct Supabase credentials
- [ ] Development server was restarted after adding `.env` file
- [ ] `supabase-schema.sql` has been run in Supabase SQL Editor
- [ ] You are signed in (check header for your email/name)
- [ ] Browser console shows no errors
- [ ] Supabase project is active and not paused

## Still Having Issues?

1. **Check the exact error message** in browser console
2. **Verify your setup** matches the steps above
3. **Test in a different browser** or incognito mode
4. **Check Supabase logs:**
   - Go to Supabase dashboard → **Logs** → **API Logs**
   - Look for any error messages related to your requests

## Common Error Messages

| Error | Solution |
|-------|----------|
| `relation "spaces" does not exist` | Run `supabase-schema.sql` in SQL Editor |
| `permission denied for table spaces` | Run complete SQL schema including RLS policies |
| `invalid input syntax for type uuid` | Make sure you're authenticated |
| `Failed to fetch` | Check `.env` file and restart dev server |
| `401 Unauthorized` | Verify Supabase credentials are correct |

