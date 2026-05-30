# LifeLink System B

Human-centered explainable verification platform — frontend interactive prototype.

## Stack

- React 18
- Tailwind CSS
- React Router v6
- React Context API
- Lucide React (navigation icons)

All data is mock. No backend, database, or authentication.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run preview
```

## Routes

| Path | Page |
|------|------|
| `/dashboard` | Dashboard |
| `/vault` | Document vault |
| `/verify` | Verify document |
| `/verify/failed` | Verification failed |
| `/verify/result/:documentId` | Verification result |
| `/share` | Share records |
| `/profile` | Profile |

## Deploy to Vercel

This app is a static Vite build. `vercel.json` is included for React Router SPA redirects.

### Option 1: GitHub + Vercel Dashboard (recommended)

1. Create a repo on GitHub and push this project:

```bash
git add .
git commit -m "Initial LifeLink System B prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lifelink-system-b.git
git push -u origin main
```

2. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
3. **Import** your `lifelink-system-b` repository.
4. Vercel should auto-detect **Vite**. Confirm:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.

Your live URL will look like `https://lifelink-system-b.vercel.app`.

### Option 2: Vercel CLI

```bash
npm i -g vercel
cd lifelink-system-b
vercel login
vercel
```

Follow the prompts. For production:

```bash
vercel --prod
```

### After deploy

- `/dashboard`, `/vault`, `/verify`, etc. all work via SPA rewrites.
- No environment variables needed.
- Redeploys happen automatically on every push to `main` (GitHub method).
