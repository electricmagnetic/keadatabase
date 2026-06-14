# survey-next - Kea Survey Tool (Next.js)

## Overview

This is the Next.js 16 replacement for the original Kea Survey Tool (first built in 2019 with Create React App). It's part of the Kea Database's migration strategy from legacy CRA apps to modern Next.js architecture.

**Status**: Active development — core feature parity largely reached
**Production URL**: survey.keadatabase.nz (currently serves the legacy `apps/survey`)
**Tech Stack**: Next.js 16, React 19 (React Compiler), TypeScript, Zod

## Purpose

The Kea Survey Tool enables researchers and citizen scientists to conduct structured population surveys of kea across New Zealand. It uses a grid-based methodology where observers record kea sightings (and non-sightings) within specific geographic tiles, helping identify population hotspots and trends.

## Current Implementation Status

The major workflows from the legacy app are now implemented. Earlier versions of this document described these as stubs — that is no longer accurate.

### ✅ Implemented

- **Home** (`/`) — WordPress intro content + recent grid tiles
- **Surveys** (`/surveys`, `/surveys/[id]`) — list and detail views with per-survey analysis and hour-by-hour observations
- **Grid** (`/grid`, `/grid/[id]`) — interactive grid tool (map + typeahead tile selection + print), and per-tile detail pages with survey hours and analysis graphs
- **Analysis** (`/analysis`) — colour-coded map of grid tile analyses (orange = surveyed with kea, grey = surveyed without), with click-through popups
- **Submit** (`/submit`, `/submit/details`, `/submit/success/[id]`) — full two-step survey submission form
- **CMS pages** (`/about`, `/instructions`, `/legal`) — pulled from WordPress
- **Layout** — Header, Footer, mobile menu, home-page banner, custom CSS architecture
- **Shared UI** — Page composition system, Error, Spinner, Toast, MapLayerToggle

### Not yet implemented / known gaps

- **Authentication** — no JWT/login flow yet (submit is currently public, matching the legacy report endpoint)
- **Photo upload** — not implemented
- **Survey editing / CSV export** — not implemented
- **Pagination UI** — list endpoints fetch a fixed `page_size` rather than paging
- **Tests** — no unit/e2e tests yet

## Dependencies

**Core**
- `next` 16.2.6 (React Compiler enabled in `next.config.ts`)
- `react` / `react-dom` 19.2.7
- `zod` ^4.4.3 — schema validation
- `react-hook-form` ^7.62 + `@hookform/resolvers` — form state/validation
- `swr` ^2.4 — client data fetching (24h cache)
- `date-fns` ^4 — date formatting

**Mapping**
- `maplibre-gl` ^5 + `react-map-gl` ^8
- `@turf/turf` ^7 — geospatial calculations
- `geospatial` (workspace) — shared `Map`, `GeoJSONLayer`, `XYZRasterLayer`

**UI**
- `recharts` ^3 — analysis graphs
- `react-bootstrap-typeahead` ^6 — grid tile typeahead
- `@fortawesome/fontawesome-free` ^5 — icons (CSS imported in `layout.tsx`)

**Workspace**
- `shared` — `fetcher`, `DateTime`, WordPress CMS components, Next types
- `geospatial` — map primitives

**Dev**
- `typescript` ^5, `eslint` ^9, `eslint-config-next`, `babel-plugin-react-compiler`
- `postcss` + `postcss-nested` + `postcss-discard-comments` (CSS build pipeline)

## Architecture

### File Structure

```
src/app/
├── _components/                # Shared components (underscore = not a route)
│   ├── SurveyHourItem.tsx      # Shared row for a survey hour (used by surveys + grid)
│   ├── api/                    # fetcher (swr + server), schema, helpers, url
│   ├── cms/                    # (WordPress components live in shared package)
│   ├── grid/                   # Map + grid tile components and helpers
│   │   ├── BaseMap.tsx         # MapLibre base map (basemaps, grid overlay, outline)
│   │   ├── GridTileSelectMap.tsx
│   │   ├── SelectedGridTilesMap.tsx
│   │   ├── GridTileTypeahead.tsx
│   │   ├── GridTileCard(s).tsx
│   │   ├── RecentGridTiles.tsx
│   │   ├── helpers.ts          # getGridTileById, getUniqueGridTiles, getNeighbours, …
│   │   └── types.ts
│   ├── layout/                 # Header, Footer, MobileMenu, HomePageBanner, BodyWithClasses
│   ├── providers/SWRProvider.tsx
│   └── ui/                     # Page, Error, Spinner, Toast, MapLayerToggle
│
├── about|instructions|legal/   # WordPress-backed CMS pages
├── analysis/                   # Grid tile analysis map (+ actions, schema, styling)
├── grid/                       # Grid tool + per-tile detail
│   ├── _components/            # GridTool, GridTilePage, GridTileAnalysis, SurveyHours, graphs
│   └── [id]/page.tsx
├── submit/                     # Two-step submission flow
│   ├── _components/            # Step1Form, Step2Form, fieldsets, SubmitBar
│   ├── details/page.tsx        # Step 2 page
│   ├── success/[id]/page.tsx
│   ├── actions.ts              # getFieldOptions (OPTIONS), submitSurvey (POST)
│   ├── schema.ts               # Zod schemas for both steps + payload type
│   ├── constants.ts            # SEASONS, SURVEY_HOURS, MAX_GRID_TILES
│   └── utils.ts                # season/hours helpers, payload transform
├── surveys/                    # Survey list + detail (+ actions, schema)
│
├── css/                        # See "CSS Architecture" below
├── layout.tsx                  # Root layout (fonts, providers, header/footer)
└── page.tsx                    # Home

public/
├── geo/                        # tiles.json, tilesOutline.json (grid GeoJSON)
└── images/, favicons, manifest
```

### Key Patterns

**1. Server actions for data fetching** — each route owns an `actions.ts` (`"use server"`) that calls the shared `fetcher` with a Zod schema and `getApiUrl(path)`.

```typescript
export const getSurvey = async (id: number) =>
  await fetcher(getApiUrl(`/surveys/surveys/${id}/`), SurveySchema);
```

**2. Type-safe fetch results** — `fetcher` returns a discriminated union; pages branch on it:

```typescript
const fetch = await getSurvey(id);
if (!fetch.success) {
  if (fetch.errorType === "NOT_FOUND") return notFound();
  return <Error message="Error fetching survey" />;
}
const survey = fetch.data; // typed
```

**3. Client/server API base split** (`_components/api/url.ts`) — avoids CORS:
- **Client**: `NEXT_PUBLIC_API_BASE` = `/api`, proxied to the backend via `next.config.ts` `rewrites()` (dev only).
- **Server**: `BACKEND_API_BASE`, a direct backend URL.

**4. Two-step submit form** (React Hook Form + Zod):
- **Step 1** (`Step1Form`) collects observer + grid tiles, then navigates to `/submit/details` with data in URL params.
- **Step 2** page fetches field metadata via an `OPTIONS` request (`getFieldOptions`), renders `Step2Form` with hour-by-hour fieldsets, and POSTs through `submitSurvey`.
- Validation failures and submit errors both surface through a single `<Toast>`; `utils.transformFormDataToPayload` shapes the RHF state into the API payload.

**5. Maps** — `BaseMap` wraps the shared `geospatial` `Map` with Mapbox + LINZ raster basemaps, an XYZ grid overlay, and the South Island outline. Specific maps (`GridTileSelectMap`, `SelectedGridTilesMap`, `analysis/GridTileAnalysesMap`) compose `BaseMap` with their own sources/layers and pass a `height` prop.

**6. SWR provider** (`providers/SWRProvider.tsx`) — global `swrFetcher`, 24h `dedupingInterval`, `revalidateOnFocus: false`. Used by client components like `grid/_components/SurveyHours`.

**7. Page composition** — `<Page.Container>`, `<Page.Heading>`, `<Page.Section>` for consistent page scaffolding.

## CSS Architecture

Vanilla CSS with a PostCSS pipeline (`postcss-nested` for nesting, `postcss-discard-comments`). Entry point `css/main.css` imports, in order:

- `_variables.css` — CSS custom properties (colours, fonts, borders)
- `partials/*` — `_normalize`, `_utilities`, `_layout`, `_data-table`, `_cards`, `_submit`, `_form`, `_buttons`, `_toast`, `_mobile-menu`, `_grid`, `_print`
- `components/*` — per-component styles (`banner.css`, `survey.css`, `spinner.css`)

**Conventions**:
- `partials/` use a leading underscore (shared/base styles); `components/` do not (component-specific).
- Component CSS is imported via the `@/app/css/components/<name>.css` alias from the component that uses it (e.g. `HomePageBanner` → `banner.css`, `surveys/[id]/page.tsx` → `survey.css`).
- Fonts: **IBM Plex Sans** (body) and **Zilla Slab** (headings), loaded via `next/font/google` in `layout.tsx`.

## Environment Variables

```bash
# Client uses the /api proxy (avoids CORS); production uses a full URL
NEXT_PUBLIC_API_BASE=/api
# Backend the Next.js proxy forwards to (dev only)
BACKEND_API_BASE=https://dev.data.keadatabase.nz

NEXT_PUBLIC_WORDPRESS_BASE=https://public-api.wordpress.com/wp/v2/sites/blog.keadatabase.nz

NEXT_PUBLIC_MAPBOX_TOKEN=   # Mapbox basemap tiles
NEXT_PUBLIC_LINZ_API_KEY=   # LINZ topo layers (optional)
```

`next.config.ts` also sets `trailingSlash: true` (Django REST Framework expects trailing slashes).

## Backend API Integration

**Framework**: Django REST Framework. List endpoints use DRF pagination (`{ count, next, previous, results }`).

### Endpoints used

- `GET /surveys/surveys/` , `/surveys/surveys/:id/` — survey list / detail
- `GET /surveys/hours/` — survey hour observations
- `GET /analysis/grid_tiles/` — grid tile analyses (for the analysis map)
- `GET /analysis/surveys/:id/` — per-survey analysis
- `OPTIONS /report/survey/` — form field metadata (activity choices, etc.)
- `POST /report/survey/` — submit a survey

## Survey Domain Rules

Defined in `submit/constants.ts`:
- **Seasons**: summer = Oct–Mar, winter = Apr–Sep
- **Survey hours**: summer 6–20, winter 7–18
- **Max grid tiles per survey**: 15
- Activity codes map to FontAwesome icons in `SurveyHourItem` (`W` walking, `S` street-view, `C` campground, `H` home, `X` not surveying). `X` = "not surveying" and suppresses kea/tile fields.

## Development

From repo root:
```bash
pnpm dev --filter=survey-next...
```
From this directory:
```bash
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint     # eslint
npx tsc --noEmit   # typecheck
```

## Conventions & Notes

- **React Compiler is enabled** — avoid manual `useMemo`/`useCallback` for optimization (some are kept where lint/Compiler requires, e.g. RHF `watch()` interop).
- Server actions are marked `"use server"`; client components `"use client"`.
- Files under `_components` are not routes (Next.js convention).
- Comments use lowercase `//` single-line style; `// TODO` retained where present.
- Dates from `<input type="date">` are parsed/validated in Zod and emitted as ISO date strings in the payload.

## Known Issues & Technical Debt

1. **Auth** not implemented — needed before any non-public/editing features.
2. **No tests** — align strategy with other Next.js apps in the monorepo.
3. **Pagination** — list views fetch a fixed page size; no paging UI.
4. **WordPress pages** fetch per request (consider ISR).
5. A few `any` types remain in form/fieldset typings and the API field-options schema (DRF OPTIONS shape varies).
6. `MobileMenu` has an effect that calls `setState` synchronously (eslint flags it).

## Migration from Legacy App (`apps/survey`)

**Done**: navigation/layout, survey browse + detail, grid tool + tile detail, analysis map, two-step submission, CMS pages.
**TODO**: authentication, photo upload, survey editing, CSV export, observer management.

---

**Last Updated**: 2026-06-14
