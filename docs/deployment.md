# Deployment guide

## Recommended architecture

Deploy the repository as one Node service. The production build compiles React into `client/dist`; Express serves those static files and the API from the same origin. Use a managed MongoDB deployment with backups, TLS, access controls, and a least-privilege database user.

## Production steps

1. Use Node.js 20 or newer and run `npm ci`.
2. Run `npm run lint`, `npm test`, and `npm run build`.
3. Configure every variable shown in `.env.example`. Use a strong random `JWT_SECRET` of at least 32 characters.
4. Generate the password hash locally with `npm run seed --workspace server -- --password "a unique long password"`; store only its output hash as `ADMIN_PASSWORD_HASH`.
5. Set `NODE_ENV=production`, `CLIENT_ORIGIN` to the HTTPS public origin, and `MONGODB_URI` to the production database connection string.
6. Start with `npm start`. Configure the platform health check to request `/api/health`.

The production server intentionally refuses to start without MongoDB and secure admin configuration. Terminate TLS at the hosting platform or reverse proxy, redirect HTTP to HTTPS, restrict secrets to the platform’s secret manager, and enable database backups and application logs. Update `client/public/robots.txt` and `sitemap.xml` with the real domain before building.

## Container/platform notes

The project is compatible with common Node hosting providers. Build command: `npm ci && npm run build`. Start command: `npm start`. Persistent enquiry data must live in MongoDB, never the application filesystem.
