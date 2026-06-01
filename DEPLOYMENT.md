# Deployment Guide

This project is configured to build as a **Single Page Application (SPA)** using Vite and TanStack Start.

Because we have disabled the Nitro SSR engine (`nitro: false` in `vite.config.ts`), the application outputs purely static files. All routing is handled on the client side.

## Setup

First, install dependencies:
```sh
npm install
```

## How to Build

Run the standard build command:
```sh
npm run build
```

This will generate the static files in the `dist/client` directory.

## Hosting Options

To prevent 404 errors when a user refreshes a page on a specific route (e.g., `/about`), the hosting provider must redirect all unknown routes to `index.html`. We have pre-configured this for standard static hosts.

### 1. Vercel

The project includes a `vercel.json` file.

1. Push your code to GitHub and connect it to Vercel.
2. Vercel will automatically detect the Vite project.
3. Ensure the **Output Directory** is set to `dist/client`.
4. The `vercel.json` automatically rewrites all traffic to `/index.html`, fixing any 404s.

### 2. Netlify

The project includes a `public/_redirects` file (`/* /index.html 200`).

1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist/client`
4. Netlify will automatically apply the `_redirects` file (which is copied from `public/` into `dist/client/` during build) to fix SPA routing.

### 3. GitHub Pages

GitHub Pages does not support native SPA rewrites via files like `_redirects`.

To host on GitHub Pages:
1. When configuring your Vite build, you must set the base path in `vite.config.ts` if your repository is not a root domain:
   ```ts
   // vite.config.ts
   export default defineConfig({
     vite: {
       base: "/your-repo-name/",
     }
   })
   ```
2. A common workaround for the 404 issue on GitHub Pages is to duplicate `index.html` as `404.html` in your `public/` directory, or use a script like `spa-github-pages`.
