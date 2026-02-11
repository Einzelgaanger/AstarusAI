# Fix: Email buttons not clickable (Confirm email / Forgot password)

If the **Confirm your email** or **Reset password** button in the email doesn’t work when clicked, but the link works when you copy-paste it, the email template is using a non-link element (e.g. `<button>`) or the link isn’t on the button. Email clients don’t run JavaScript, so the clickable part **must** be a real link: `<a href="...">`.

## Fix in Supabase Dashboard

1. Open **[Supabase Dashboard](https://supabase.com/dashboard)** → your project.
2. Go to **Authentication** → **Email Templates**  
   (direct: `https://supabase.com/dashboard/project/YOUR_PROJECT_REF/auth/templates`).
3. For each template below, make sure the main CTA is an **anchor tag** with `href` set to the correct variable, not a `<button>` or a `<div>`.

---

### Confirm signup

- Open the **Confirm signup** template.
- The “Confirm your email” (or similar) CTA must be a link. Use one of these patterns.

**Option A – Link styled as a button (recommended):**

```html
<a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Confirm your email</a>
```

**Option B – Plain link:**

```html
<a href="{{ .ConfirmationURL }}">Confirm your email</a>
```

- Do **not** use `<button>` or `onclick`; email clients will not run JS, so the button won’t be clickable.
- Keep the “Copy and paste this link” line as a normal `<a href="{{ .ConfirmationURL }}">` so the fallback link works too.

---

### Reset password

- Open the **Reset password** (or “Magic Link” / “Recovery”) template.
- The “Reset password” (or “Reset My Password”) CTA must be a link.

**Option A – Link styled as a button (recommended):**

```html
<a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Reset My Password</a>
```

**Option B – Plain link:**

```html
<a href="{{ .ConfirmationURL }}">Reset My Password</a>
```

- Again: no `<button>`, no `onclick`. Only `<a href="{{ .ConfirmationURL }}">` will be clickable in all clients.
- The “Copy and paste this link” line should also be `<a href="{{ .ConfirmationURL }}">...</a>`.

---

## Template variables (Supabase)

- `{{ .ConfirmationURL }}` – Full URL for the action (confirm email or reset password). Use this in the **href** of your link/button.
- `{{ .SiteURL }}` – Your project’s Site URL (e.g. `https://astarus.ai`).
- `{{ .Token }}` – 6-digit OTP (if you want an alternative to the link).
- `{{ .TokenHash }}` – Token hash if you build the link yourself (e.g. `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery`).

After saving the templates, send a new signup confirmation and a new reset password email and test again; the buttons should be clickable.
