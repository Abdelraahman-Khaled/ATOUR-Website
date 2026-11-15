# Atour (جولة)

React 18 + Vite. Package manager: **npm** (Node 22, see `.nvmrc`).

## Setup

```bash
npm ci
```

Create a `.env` file with the API URL:

```
REACT_APP_API_BASE_URL=https://...
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` (or `npm start`) | Dev server on http://localhost:3000 |
| `npm run build` | Generates `public/sitemap.xml` from the API, then builds to `build/` |
| `npm run preview` | Serves the production build locally |
| `npm run generate-sitemap` | Regenerates the sitemap only |

## Notes

- Absolute imports (`Components/...`, `Pages/...`, `context/...`, `api/...`, `assets/...`, `hooks/...`, `utils/...`) are aliases defined in `vite.config.js`.
- Env vars must start with `REACT_APP_` or `VITE_` and are read with `import.meta.env.*`.
- Pages are lazy-loaded per route (`src/Routes/Routers.jsx`). Add new pages with the `page(() => import(...))` helper.
- `.npmrc` sets `legacy-peer-deps=true` because `react-intl-tel-input` declares React 16 as a peer dependency.
- Prefer `.webp` for new images and keep them close to the size they are displayed at.
