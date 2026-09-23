# Local setup guide

## Prerequisites

- Node.js 20 or newer
- npm
- Optional: a local or managed MongoDB database

## Install and run

```bash
npm install
copy .env.example .env
npm run dev
```

The website is available at `http://localhost:5173` and the API at `http://localhost:5000`. Leave `MONGODB_URI` blank to use the volatile development fallback. To use MongoDB, set a valid connection string and restart the API.

## Verify a change

```bash
npm run lint
npm test
npm run build
```

Use `npm run test:coverage` when a coverage report is required. The Vite development server proxies `/api` requests to Express, matching the same-origin URL structure used in production.

## Common setup issues

- If port 5173 or 5000 is occupied, stop the conflicting process or change the Vite/API port configuration together.
- If MongoDB cannot be reached in development, the API logs a warning and uses in-memory storage. Data in that mode is cleared on restart.
- If admin login says it is not configured, follow the admin guide and restart the API after changing `.env`.
