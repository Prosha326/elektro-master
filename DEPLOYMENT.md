# Deployment Guide

This project is built using [TanStack Start](https://tanstack.com/start) and packaged with [Nitro](https://nitro.unjs.io/) via the Lovable configuration.

Because TanStack Start relies on **Server-Side Rendering (SSR)** and API routing, it is **not** a standard static Single Page Application (SPA). As a result, you should **not** use static SPA redirect configurations (like `/* /index.html 200` in `netlify.toml` or rewrites in `vercel.json`), as they will break the serverless functions by bypassing the Nitro server.

Instead, use Nitro presets to generate the correct outputs for your hosting provider.

## Setup

First, install dependencies:
```sh
npm install
```

## Hosting Options

### 1. Vercel (Recommended)

Vercel provides native support for Nitro SSR.

1. Ensure your Vercel project environment settings are using Node.js 20.x or higher.
2. Under "Environment Variables", set the following:
   - `NITRO_PRESET` = `vercel`
3. Push to your repository. Nitro will automatically bundle the serverless functions into `.vercel/output/functions` and the static assets into `.vercel/output/static`. Vercel understands this structure natively.

Alternatively, running `NITRO_PRESET=vercel npm run build` locally will create the deployment bundle for Vercel.

### 2. Netlify

Netlify also provides strong support for Nitro SSR functions.

1. In your Netlify project settings, set the Environment Variable:
   - `NITRO_PRESET` = `netlify`
2. Push to deploy. Nitro will create `.netlify/functions-internal` and the appropriate static asset routes automatically.

Do not use a `netlify.toml` with `/* /index.html 200` as this will break API routes and SSR. The `netlify` preset handles routing appropriately.

### 3. GitHub Pages (Static Mode)

GitHub Pages only supports static hosting. If you must deploy to GitHub Pages, you can use the static preset. However, note that true SSR and API features will not function correctly on a static host.

1. Set the following environment variables during your GitHub Actions build step:
   - `NITRO_PRESET` = `github-pages`
   - `VITE_BASE_PATH` = `/your-repo-name/` (This sets the `base` in Vite, fixing 404s for assets on sub-paths)
2. Your build command should look like:
   ```sh
   VITE_BASE_PATH=/my-repo/ NITRO_PRESET=github-pages npm run build
   ```
3. Nitro will output the static assets into `.output/public`. Configure your GitHub Pages deployment to serve from this directory (or copy it to the root/`docs` folder if your action requires it).
