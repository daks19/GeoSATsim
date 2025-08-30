# GeoSATsim

Live demo: https://geosatsim.vercel.app/

A small educational satellite simulator built with React, React Three Fiber and Vite. Visualize orbits, control a satellite, and explore mission UI elements.

## Features
- 3D Earth (textured), orbit paths, satellites and ISS marker
- Star/galaxy background and customizable visuals
- Mission control UI and live ISS data integration

## Live Demo
Open the demo at: https://geosatsim.vercel.app/

## Getting started (local)

Prerequisites:
- Node.js (16+ recommended)
- npm

Install dependencies:

```powershell
npm install
```

Run the dev server (starts the server and client in this repo):

```powershell
npm run dev
```

Open http://localhost:5000 (or the address printed by the server).

## Build

There are two build targets in this repo:

- `build:client` — builds the static client into `dist/public` (used for Vercel static deploy)
- `build:server` — bundles the server (for a self-hosted Node deployment)

Build the client:

```powershell
npm run build:client
```

Build client + server locally (optional):

```powershell
npm run build
# or
npm run build:server
```

After `npm run build:client` the static site is available in `dist/public`.

## Deploying to Vercel (static site)

This project is configured to deploy the static client build to Vercel (see `vercel.json`). Steps:

1. Commit and push your repository to GitHub.
2. In Vercel, create a new project and link your repo.
3. Set the Build Command to:

```text
npm run build:client
```

4. Set the Output Directory to:

```text
dist/public
```

5. Deploy. The site will be available at the domain Vercel assigns (or your custom domain).

## Textures and assets

- Place Earth texture at `client/public/textures/earth.jpg` for best visuals.
- Optional cloud map: `client/public/textures/clouds.png` (if you add it the app will animate clouds).
- Background galaxy: `client/public/textures/8k_stars_milky_way.jpg` (used by `BackgroundSphere`).

If you don't add textures the app falls back to a basic material.

## Converting server routes to Vercel serverless functions

The `/server` APIs are not deployed by default in the static deployment. If you need server endpoints on Vercel, move the relevant code into the `api/` folder as Vercel Serverless Functions. I can help convert specific files on request.

## Troubleshooting
- If the site serves raw source instead of the app, ensure Vercel is configured to serve the static `dist/public` output (see Deploying to Vercel section).
- If `npm run build` fails on Vercel, make sure `build` runs only the client (this repo ships `build:client` and sets `build` to run it by default).

## License
MIT
