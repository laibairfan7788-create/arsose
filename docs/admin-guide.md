# Admin guide

## First-time setup

1. Choose the real admin email; do not use the placeholder address.
2. Generate a bcrypt password hash locally:

   ```bash
   npm run seed --workspace server -- --password "a unique password of at least 12 characters"
   ```

3. Put the generated hash—not the password—in `ADMIN_PASSWORD_HASH`.
4. Set `ADMIN_EMAIL` and a random `JWT_SECRET` of at least 32 characters in `.env` or the hosting secret manager.
5. Restart the API and open `/admin/login`.

## Managing enquiries

The dashboard lists newest enquiries first. Filter by New, In progress, or Resolved, and use the status selector on an enquiry to update it. The email link opens the configured mail application. Website administrators should define a real retention/deletion policy before launch; deletion is intentionally not exposed until that policy is approved.

## Security operations

- Give each deployed environment unique secrets and never commit `.env`.
- Rotate the admin password and `JWT_SECRET` if access may have been exposed. Rotating the JWT secret signs out current sessions.
- Admin cookies are HTTP-only, same-site, eight-hour sessions and become secure-only in production.
- Login attempts are rate-limited. Put the application behind HTTPS and a trusted reverse proxy.
- Restrict MongoDB access to the application and approved operators, enable backups, and review logs for failed authentication patterns.

The application does not ship with a working default password. Production startup fails when secure admin configuration or MongoDB is missing.
