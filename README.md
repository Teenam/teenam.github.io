# Portfolio Landing Page - React Three Fiber

A professional, interactive 3D landing page built with React Three Fiber, TypeScript, and Vite.

## Features

- 🎨 **3D Interactive Experience** - Projects displayed as 3D cards in a circular arrangement
- 🔄 **Smooth Animations** - Auto-rotating camera with interactive hover effects
- 🔗 **Easy Project Linking** - Click on 3D cards to visit project websites
- 📱 **Fully Responsive** - Works on all devices
- ⚙️ **Easy Configuration** - Edit `public/config.json` to customize everything
- 🌐 **Social Media Links** - Footer with social icons
- ✨ **Modern Tech Stack** - React Three Fiber, TypeScript (Strict Mode), Vite

## Tech Stack

- **React 18** - UI framework
- **TypeScript (Strict Mode)** - Type-safe development
- **React Three Fiber (R3F)** - 3D rendering
- **@react-three/drei** - Helper components (OrbitControls, Environment, Text, etc.)
- **Vite** - Fast build tool
- **Three.js** - 3D graphics library

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Edit `public/config.json`** to customize:
   - Page title and subtitle
   - Your projects (title, description, link, type)
   - Footer text and name
   - Social media links

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Configuration Guide

### Projects

Add your projects in the `projects` array in `public/config.json`:

```json
{
  "title": "Project Name",
  "description": "Project description",
  "link": "https://your-project-url.com",
  "type": "website"
}
```

- **title**: Project name (displayed on 3D card)
- **description**: Brief description of the project
- **link**: URL to your project (leave empty if no link)
- **type**: "website" or "project" (affects link text)

### Social Links

Add your social media profiles in the `footer.socials` array:

```json
{
  "name": "GitHub",
  "url": "https://github.com/yourusername",
  "icon": "github"
}
```

Supported icons: `github`, `linkedin`, `twitter`, `email`, `instagram`, `youtube`

## Deployment

### GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist` folder contains the production build

3. Configure GitHub Pages to serve from the `dist` folder, or use a GitHub Action to auto-deploy

### Other Platforms

The `dist` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront

## Project Structure

```
├── public/
│   └── config.json          # Configuration file (edit this!)
├── src/
│   ├── components/
│   │   ├── Scene.tsx        # 3D scene with project cards
│   │   ├── ProjectCard.tsx  # Individual 3D project card
│   │   ├── UI.tsx           # UI overlay component
│   │   ├── Header.tsx       # Header component
│   │   └── Footer.tsx       # Footer with social links
│   ├── types/
│   │   └── config.ts        # TypeScript types for config
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Controls

- **Mouse/Trackpad**: Click and drag to rotate the camera
- **Scroll**: Zoom in/out
- **Click on cards**: Open project links in new tab
- **Hover**: See interactive effects on cards

## License

MIT
