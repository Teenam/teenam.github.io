# GitHub Pages Deployment Guide

## ✅ GitHub Pages DOES Support React/Vite Apps!

GitHub Pages can host your React + Vite application because:
- After building, Vite creates **static HTML/CSS/JS files**
- GitHub Pages serves static files perfectly
- No server-side rendering needed for this app

## Quick Deployment Steps

### 1. Update `package.json` with your repository URL

If your repository is `teenam.github.io` (user/organization page), the base is already correct.

If your repository is something like `teenam/portfolio`, you need to update `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/repository-name/',  // Change this to your repo name
})
```

### 2. Build your project

```bash
npm run build
```

This creates a `dist` folder with all the static files.

### 3. Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build your project
- Push the `dist` folder contents to the `gh-pages` branch
- Make your site live at `https://teenam.github.io/repository-name`

## Manual Deployment (Alternative)

If `gh-pages` doesn't work, you can manually:

1. Build: `npm run build`
2. Copy everything from `dist/` folder
3. Push to `gh-pages` branch or use GitHub Actions

## GitHub Actions (Recommended for Auto-Deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Enable GitHub Pages

1. Go to your repository Settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select:
   - **Branch: `gh-pages`** (if using gh-pages package)
   - **Folder: `/ (root)`**
4. Click Save

Your site will be live at: `https://teenam.github.io/repository-name`

## Troubleshooting

### 404 Errors on Refresh
- GitHub Pages doesn't support client-side routing by default
- Your app uses hash routing or all routes point to index.html
- The current setup should work fine since it's a single-page app

### Assets Not Loading
- Make sure `base: './'` is set in `vite.config.ts` for relative paths
- Or set it to your repository path: `base: '/repo-name/'`

### White Screen After Deploy
- Check browser console for errors
- Verify `config.json` is in the `public` folder (it will be copied to `dist`)
- Make sure all paths are relative

## Current Configuration

✅ `vite.config.ts` has `base: './'` - works for both root and subdirectory
✅ `gh-pages` package installed
✅ Deploy scripts added to `package.json`
✅ `config.json` in `public/` folder (will be copied during build)

You're all set! Just run `npm run deploy` when ready.

