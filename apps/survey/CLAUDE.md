# Kea Survey Tool - Application Context

## Overview

The **Kea Survey Tool** is a React-based web application for conducting and analyzing population distribution surveys of kea (New Zealand's alpine parrot). Deployed at **survey.keadatabase.nz**, it enables observers to submit structured survey data using a grid-based methodology and provides analytical tools for researchers.

This is a **legacy Create React App (CRA)** application running **React 16**. A modern Next.js replacement (`apps/survey-next`) is in development.

## Purpose & Conservation Impact

### Survey Methodology

The app supports the Department of Conservation-backed kea population trends study using a **grid-based approach**:

- **Grid System**: New Zealand divided into 10km × 10km grid tiles
- **Structured Observations**: Observers record kea presence/absence within tiles
- **Seasonal Surveys**: Different survey hours for summer (6am-8pm) and winter (7am-6pm)
- **Multi-Tile Surveys**: Observers can survey up to 15 grid tiles in a single trip
- **Time-Based Data**: Hour-by-hour observations within each tile

### Key Capabilities

1. **Survey Submission**: Two-step form process for entering survey data
2. **Grid Tile Browsing**: Explore survey coverage across NZ
3. **Data Analysis**: Statistical analysis of survey results by tile or survey
4. **Map Visualization**: Interactive maps showing grid tiles and survey coverage
5. **Survey History**: Browse all submitted surveys with detailed views

## Technology Stack

### Core Framework
- **React**: 16.14.0 (class components, hooks)
- **Create React App**: 5.0.1 (legacy build system)
- **React Router DOM**: 5.3.4 (client-side routing)

### Key Dependencies

**Forms & Validation:**
- **Formik**: 1.5.8 (form state management)
- **Yup**: 0.27.0 (validation schemas)
- Validation schemas in `src/components/submit/schema/`

**Data Fetching:**
- **SWR**: 0.5.7 (data fetching with 24-hour cache)
- **react-refetch**: 3.0.1 (OPTIONS requests for form metadata)
- Custom fetcher with error handling

**Mapping:**
- **Leaflet**: 1.9.4 (mapping library)
- **react-leaflet**: 2.8.0 (React bindings)
- **@turf/turf**: 7.3.5 (geospatial calculations)
- Pre-loaded grid tile GeoJSON data (7MB `tiles.json`)

**UI Framework:**
- **Bootstrap**: 4.6.2 (styling framework)
- **Sass**: 1.66.1 (CSS preprocessing)
- **FontAwesome**: 5.15.4 (icons)
- **classnames**: 2.3.2 (conditional CSS classes)

**Data Visualization:**
- **Recharts**: 1.8.6 (charts for analysis)
- Custom graphs for survey hour analysis

**Date/Time:**
- **Moment.js**: 2.29.4 + **react-moment**: 0.9.7
- Locale: en-nz (New Zealand formatting)

**Developer Tools:**
- **Sentry**: 5.30.0 (error monitoring & tracing)
- **React Helmet**: 5.2.1 (document head management)

### Polyfills
- **core-js**: 3.32.2
- **react-app-polyfill**: IE support

## Architecture

### Directory Structure

```
src/
├── App.js                      # Main app component with routing
├── index.js                    # Entry point with Sentry init
├── serviceWorker.js            # PWA service worker (unregistered)
│
├── assets/
│   ├── css/                   # SCSS stylesheets
│   ├── geo/                   # GeoJSON files
│   │   ├── tiles.json         # All NZ grid tiles (7MB)
│   │   ├── tilesAtlas.json    # Atlas region tiles subset
│   │   └── tilesOutline.json  # Tile boundaries
│   └── img/                   # Images and banners
│
├── components/                # React components (~74 JS files)
│   ├── analysis/             # Analysis & statistics components
│   │   ├── GridTileAnalysis/ # Per-tile analysis with graphs
│   │   └── SurveyAnalysis/   # Per-survey analysis
│   │
│   ├── form/                 # Form field components
│   │   ├── RenderField.js    # Formik field renderer
│   │   └── GridTileSelectTypeahead.js  # Tile picker
│   │
│   ├── grid/                 # Grid tile components
│   │   ├── GridTile/         # Individual tile display
│   │   └── GridTilesFromSurveyHours.js  # Recent tiles
│   │
│   ├── helpers/              # Utility components
│   │   ├── Loader.js         # Loading spinners
│   │   ├── Error.js          # Error messages
│   │   └── Date formatting helpers
│   │
│   ├── map/                  # Leaflet map components
│   │   └── Various map layers and controls
│   │
│   ├── presentation/         # Layout components
│   │   ├── Header.js         # Site header
│   │   ├── Footer.js         # Site footer
│   │   ├── Banner.js         # Hero banners
│   │   └── Page.js           # WordPress content fetcher
│   │
│   ├── submit/               # Survey submission workflow
│   │   ├── SubmissionForm.js # Main form container
│   │   ├── initialDetails/   # Step 1: Trip & observer info
│   │   │   ├── InitialDetailsForm.js
│   │   │   └── fieldsets/    # Observer, grid tile selection
│   │   ├── surveyDetails/    # Step 2: Hour-by-hour data
│   │   │   ├── SurveyDetailsForm.js
│   │   │   └── fieldsets/    # Survey hour, trip details
│   │   └── schema/           # Form configuration
│   │       ├── surveyParameters.js  # Seasons, hours, limits
│   │       ├── validationSchemas.js # Yup schemas
│   │       └── initialValues.js     # Default values
│   │
│   └── surveys/              # Survey display components
│       ├── Survey/           # Individual survey view
│       └── SurveyHour/       # Hour-specific data
│
└── views/                    # Page-level components (routes)
    ├── index.js              # Home page
    ├── about.js              # About page
    ├── instructions.js       # Survey instructions
    ├── legal.js              # Legal info
    ├── nomatch.js            # 404 page
    ├── analysis/             # Analysis pages
    ├── grid/                 # Grid browsing pages
    │   ├── index.js          # Grid tile list/map
    │   └── detail.js         # Individual tile details
    ├── submit/               # Submission pages
    │   ├── index.js          # Form container
    │   └── success.js        # Success confirmation
    └── surveys/              # Survey browsing pages
        ├── index.js          # Survey list
        └── detail.js         # Survey details
```

### Routing Structure

```javascript
/ (HomePage)
  - Hero banner with submit/instructions buttons
  - Recent grid tiles display
  - WordPress content integration

/submit (SubmissionPage)
  - Two-step form process:
    1. Initial details (observer, date, grid tiles)
    2. Survey details (hour-by-hour observations)
  - Query string drives form state

/submit/success[/:slug] (SubmissionSuccessPage)
  - Confirmation page after successful submission

/grid (GridPage)
  - Browse all grid tiles
  - Map view of tile coverage

/grid/:slug (GridDetailPage)
  - Individual tile details
  - Survey history for tile

/analysis (AnalysisPage)
  - Survey and grid tile analysis tools

/surveys (SurveyPage)
  - List of all submitted surveys

/surveys/:slug (SurveyDetailPage)
  - Individual survey details
  - Observer info, tiles surveyed, observations

/instructions (InstructionsPage)
  - How to conduct surveys

/about (AboutPage)
  - Project information (WordPress content)

/legal (LegalPage)
  - Legal information (WordPress content)
```

## Key Features & Workflows

### 1. Survey Submission (Two-Step Process)

**Step 1: Initial Details** (`/submit`)
- Observer information (name, email, experience level)
- Date of survey trip
- Grid tile selection (up to 15 tiles)
  - Typeahead search by tile name/code
  - Visual confirmation of selected tiles
- Submits via query string to Step 2

**Step 2: Survey Details** (`/submit?gridTiles=...`)
- Query string contains selected tiles from Step 1
- For each grid tile:
  - Hour-by-hour observations (season-dependent hours)
  - Kea count per hour (or "Not surveyed")
  - Weather conditions
  - Habitat notes
- Trip-level information:
  - Start/end dates
  - Survey method
  - Additional observations
- Submit to backend API: `POST /report/survey/`

**Form Technology:**
- Formik for form state management
- Yup for validation (custom schemas)
- react-refetch for form field OPTIONS (metadata)
- Query string state persistence using `qs` library

### 2. Grid Tile System

**Grid Definition:**
- New Zealand divided into 10km × 10km tiles
- Each tile has:
  - Unique identifier (slug)
  - Name (geographic reference)
  - Coordinates (lat/lng bounds)
  - GeoJSON polygon

**Data Sources:**
- `assets/geo/tiles.json` - All tiles (~7MB, 2000+ tiles)
- `assets/geo/tilesAtlas.json` - Atlas region subset
- `assets/geo/tilesOutline.json` - Boundary outlines

**Tile Components:**
- `GridTile` - Display tile info with map
- `GridTileSelectTypeahead` - Searchable tile picker
- `GridTilesFromSurveyHours` - Recent surveyed tiles

### 3. Survey Analysis

**Grid Tile Analysis** (`/grid/:slug`)
- Survey count and coverage for specific tile
- Hour distribution graphs (Recharts)
- Kea observation statistics
- Seasonal breakdown
- Observer statistics
- Calculations in `GridTileAnalysis/calculations/gridTileCalculations.js`

**Survey Analysis** (`/surveys/:slug`)
- Individual survey statistics
- Grid tiles covered
- Total survey hours
- Kea observations summary
- Calculations in `SurveyAnalysis/calculations/surveyCalculations.js`

**Visualizations:**
- `HoursPerQuarterGraph` - Survey effort over time
- Recharts bar/line charts
- Leaflet maps with tile overlays

### 4. Map Integration

**Mapping Technology:**
- Leaflet 1.9.4 with react-leaflet 2.8.0
- LINZ and Mapbox base layers (API keys required)
- Custom GeoJSON layers for grid tiles
- Interactive tile selection

**Map Components:**
- `GridTileAnalysesMap` - Analysis map view
- Various Leaflet controls and layers
- Turf.js for spatial calculations

## Survey Parameters

### Seasons & Survey Hours

Defined in `src/components/submit/schema/surveyParameters.js`:

**Summer Season:**
- Months: Oct, Nov, Dec, Jan, Feb, Mar (10-3)
- Survey Hours: 6am - 8pm (6-20)
- Total: 15 possible hours per day

**Winter Season:**
- Months: Apr, May, Jun, Jul, Aug, Sep (4-9)
- Survey Hours: 7am - 6pm (7-18)
- Total: 12 possible hours per day

**Constraints:**
- Maximum 15 grid tiles per survey
- Each hour per tile requires kea count or "Not surveyed" status

### Form Validation

Yup validation schemas in `src/components/submit/schema/validationSchemas.js`:
- Observer contact validation
- Date range validation
- Grid tile selection (1-15 tiles)
- Survey hour data completeness
- Conditional field validation

## API Integration

### Backend Endpoints

Base URL: `https://data.keadatabase.nz` (configurable via `.env`)

**Survey Submission:**
- `POST /report/survey/` - Submit survey data
- `OPTIONS /report/survey/` - Get form field metadata

**Grid Tiles:**
- `GET /api/grid-tiles/` - Grid tile data
- `GET /api/grid-tiles/:slug/` - Individual tile

**Surveys:**
- `GET /api/surveys/` - Survey list
- `GET /api/surveys/:slug/` - Survey details

**Survey Hours:**
- `GET /api/survey-hours/` - Survey hour observations
- Filtered by grid tile or survey

**Analysis:**
- Various analysis endpoints for statistics

### WordPress Integration

**Content Management:**
- Base URL: `https://public-api.wordpress.com/wp/v2/sites/blog.keadatabase.nz`
- `Page` component fetches WordPress pages by ID
- Used for About, Legal, and home page content
- Renders HTML content from WordPress

### Data Caching

**SWR Configuration:**
```javascript
{
  dedupingInterval: 24 * 60 * 60 * 1000, // 24 hours
  revalidateOnFocus: false,
  fetcher: custom error-handling fetcher
}
```

## Configuration

### Environment Variables

File: `.env` + `.env.local`

**Required for production:**
```bash
REACT_APP_MAPBOX_API_KEY=<mapbox_token>
REACT_APP_LINZ_API_KEY=<linz_token>
REACT_APP_SENTRY_DSN=<sentry_dsn>
```

**API Endpoints:**
```bash
REACT_APP_API_BASE=https://data.keadatabase.nz
REACT_APP_WORDPRESS_API=https://public-api.wordpress.com/wp/v2/sites/blog.keadatabase.nz
```

**Auto-populated:**
```bash
REACT_APP_VERSION=$npm_package_version  # From package.json
REACT_APP_NAME=$npm_package_name
```

### Sentry Configuration

**Error Monitoring:**
- Initialized in `src/index.js`
- Browser tracing integration
- 100% trace sample rate (development)
- Release tracking with version from package.json

## Development

### Prerequisites
- Node.js >= 18 (see `.nvmrc`)
- pnpm (monorepo package manager)

### Setup
```bash
# From monorepo root
pnpm install

# From survey app directory
cd apps/survey
pnpm install
```

### Running Locally
```bash
pnpm start
# Opens http://localhost:3000
```

### Building
```bash
pnpm build
# Output to build/ directory
```

### Testing
```bash
pnpm test
# Launches Jest test runner
```

### Linting
```bash
# Inherited from react-scripts
# ESLint config: react-app preset
```

### Documentation
```bash
jsdoc src/**/*.js
# Generates JSDoc documentation
```

## Deployment

### Firebase Hosting

**Configuration:** `firebase.json`
- Target: `survey-keadatabase-nz`
- Public dir: `build/`
- SPA rewrite: all routes → `index.html`

**Deploy Command:**
```bash
pnpm run deploy
# Runs: build + firebase deploy
```

**Production URL:** https://survey.keadatabase.nz

### CI/CD

**GitHub Actions:** `.github/workflows/survey.yml`
- Triggered on: push to main branch
- Build survey app
- Push to GitHub Container Registry (ghcr.io)
- Deploy to production environment

## Code Patterns & Conventions

### Component Types

**Class Components:**
- Used for stateful logic (pre-hooks era)
- `SubmissionForm`, form fieldsets
- Lifecycle methods: `componentDidMount`, `componentDidUpdate`

**Functional Components:**
- Used for presentation and newer components
- Some use hooks (`useState`, `useEffect`)
- View components are primarily functional

**Higher-Order Components:**
- `withRouter` from react-router-dom
- `connect` from react-refetch

### Form Patterns

**Formik Pattern:**
```javascript
<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {(formikProps) => (
    <Form>
      <RenderField name="field" {...formikProps} />
    </Form>
  )}
</Formik>
```

**Custom Field Rendering:**
- `RenderField` component handles all field types
- Error display with Bootstrap styling
- Conditional rendering based on field type

### Data Fetching Patterns

**SWR for GET requests:**
```javascript
const { data, error } = useSWR('/api/endpoint', fetcher);
```

**react-refetch for OPTIONS/metadata:**
```javascript
connect((props) => ({
  submissionOptions: {
    url: API_URL,
    method: 'OPTIONS',
  }
}))(Component)
```

**Error Handling:**
- Custom fetcher throws with error info
- `Error` component displays user-friendly messages
- `Loader` component for loading states

### Styling Approach

**Bootstrap 4:**
- Grid system for layouts
- Utility classes for spacing
- Component classes for cards, buttons, forms

**Custom SCSS:**
- `assets/css/custom.scss` - Global styles
- Component-specific `.scss` files
- BEM-like naming conventions

**Conditional Classes:**
- `classnames` library for dynamic classes
- Example: `classnames('btn', { 'btn-primary': isPrimary })`

## Known Limitations

### Technical Debt

1. **React 16**: Outdated version, missing modern features
2. **CRA**: No longer maintained, slow builds
3. **Moment.js**: Large bundle size, deprecated
4. **react-refetch**: Unmaintained, could use SWR
5. **Old Formik**: Version 1.x, missing newer features
6. **Class Components**: Could be refactored to hooks
7. **jQuery**: Only used for Bootstrap JS, could be removed
8. **Large GeoJSON Files**: 7MB tiles.json loaded upfront

### Browser Support

**Browserslist Production:**
- > 0.2% market share
- Not dead
- Not IE < 10
- Not Opera Mini

**Polyfills:** IE11 support via react-app-polyfill

### Performance Considerations

- Initial bundle includes 7MB grid tile GeoJSON
- No code splitting for routes (could use lazy loading)
- SWR has 24-hour cache (good for static data)
- Service worker disabled (could enable for offline support)

## Migration Path

### Next.js Version (apps/survey-next)

**Why Migrate:**
- Modern React 19 features (React Compiler)
- TypeScript for type safety
- Faster builds with Turbopack
- Better SEO with SSR/SSG
- Automatic code splitting
- Improved developer experience

**What to Migrate:**
- Replace CRA → Next.js
- Replace Formik + Yup → React Hook Form + Zod
- Replace Moment.js → date-fns
- Replace react-leaflet 2.x → react-map-gl + MapLibre
- Refactor class components → functional components
- Move shared code to workspace packages

**Current Status:**
- `apps/survey-next` exists but in development
- Not yet deployed to production
- Can run both apps in parallel during transition

## Troubleshooting

### Common Issues

**Build Failures:**
- Check Node version (should be >= 18)
- Clear `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
- Clear CRA cache: `rm -rf node_modules/.cache`

**Map Not Loading:**
- Verify `REACT_APP_MAPBOX_API_KEY` in `.env.local`
- Verify `REACT_APP_LINZ_API_KEY` in `.env.local`
- Check browser console for API errors

**Form Submission Failing:**
- Check `REACT_APP_API_BASE` points to correct backend
- Verify backend is running and accessible
- Check network tab for API errors
- Ensure validation passes (check form errors)

**Sentry Not Working:**
- Verify `REACT_APP_SENTRY_DSN` in `.env.local`
- Check Sentry dashboard for project configuration
- Ensure release name matches package version

### Development Tips

1. **Hot Reload Issues**: Restart dev server if changes don't reflect
2. **Memory Issues**: Increase Node memory: `NODE_OPTIONS="--max-old-space-size=4096"`
3. **Slow Builds**: Consider migrating to Next.js (survey-next)
4. **Debugging Forms**: Install React DevTools, Redux DevTools for Formik
5. **Testing API**: Use browser DevTools Network tab or Postman

## Resources & Documentation

### Internal Documentation
- Root `CLAUDE.md` - Monorepo overview
- `README.md` - Basic setup instructions
- JSDoc comments in code (generate with `jsdoc`)

### External Resources
- **React 16 Docs**: https://16.reactjs.org/
- **Create React App**: https://create-react-app.dev/
- **Formik**: https://formik.org/docs/overview
- **Yup**: https://github.com/jquense/yup
- **SWR**: https://swr.vercel.app/
- **Leaflet**: https://leafletjs.com/
- **React Leaflet 2.x**: https://github.com/PaulLeCam/react-leaflet/tree/v2.8.0
- **Bootstrap 4**: https://getbootstrap.com/docs/4.6/
- **Recharts**: https://recharts.org/

### Related Apps
- **apps/survey-next** - Next.js replacement (in development)
- **apps/frontend** - Main Kea Database app (citizen science observations)
- **apps/map** - Embeddable map widgets
- **backend** - Django REST API

## Support & Maintenance

**Issue Tracking:**
- GitHub Issues (kea repository)
- Trello board (internal, not public)

**Key Contacts:**
- Project leads (see root CLAUDE.md)
- Arthur's Pass Wildlife Trust
- Department of Conservation

**Monitoring:**
- Sentry for error tracking
- Firebase Hosting metrics

## Future Improvements

### Short Term
1. Complete migration to `survey-next`
2. Reduce bundle size (lazy load GeoJSON)
3. Add TypeScript gradually
4. Improve test coverage
5. Update dependencies (where possible without breaking changes)

### Long Term
1. Mobile-responsive improvements for field use
2. Offline support with service workers
3. Real-time collaboration features
4. Integration with telemetry data
5. Advanced statistical analysis tools
6. Export functionality (CSV, GeoJSON)
7. Bulk import of paper form data
8. Integration with mobile apps (future)

## Conservation Context

This tool directly supports kea conservation by:

- **Standardizing Data Collection**: Grid-based methodology ensures consistent coverage
- **Engaging Volunteers**: Accessible web interface enables citizen science participation
- **Population Monitoring**: Long-term data tracks kea distribution and trends
- **Research Support**: Analysis tools help researchers identify patterns
- **Informed Management**: Data informs DOC conservation strategies

Every survey submitted contributes to understanding and protecting this threatened endemic species.
