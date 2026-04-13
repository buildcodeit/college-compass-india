# College Compass India

A Vite + React app for exploring Indian colleges, comparing options, and tracking application/test deadlines.

## Local development

```bash
npm install
npm run dev
```

The app runs on `http://localhost:8080` by default.

## Production build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

This project is configured for Vercel deployment (no Lovable-specific tooling required).

### Option 1: Vercel Dashboard (recommended)
1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel, click **Add New → Project**.
3. Import the repository.
4. Keep defaults (Vite detected automatically):
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add required environment variables (for example Supabase keys) in **Project Settings → Environment Variables**.
6. Deploy.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

## Routing note

`vercel.json` includes an SPA rewrite so client-side routes like `/deadlines/application` resolve to `index.html`.
