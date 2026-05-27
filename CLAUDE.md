# Kea Database - Project Context

## Project Overview

The **Kea Database** is a citizen science platform dedicated to the conservation of the **kea (Nestor notabilis)**, New Zealand's endemic alpine parrot. Launched in 2016 by Mark Brabyn, Dr. Laura Young, and George Moon, this platform enables researchers, conservationists, and the public to collaborate on understanding kea populations, behaviors, and movements across Aotearoa/New Zealand.

**Website**: https://keadatabase.nz

### Core Mission

- Track and monitor kea populations through citizen science observations
- Record individual banded birds with unique band combinations
- Conduct structured population surveys using grid-based methodology
- Provide data analysis tools for conservation research
- Collaborate with Arthur's Pass Wildlife Trust and Department of Conservation

## Architecture

### Monorepo Structure

This is a **Turborepo monorepo** managed with **pnpm workspaces**:

- **Backend**: Django REST Framework API (Python 3.10+)
- **Frontends**: Multiple React applications (CRA and Next.js)
- **Shared Packages**: Reusable geospatial and utility packages
- **Scripts**: R scripts for telemetry data processing

### Technology Stack

**Backend:**
- Django 3.2.20 + Django REST Framework 3.12.2
- PostgreSQL with PostGIS (geospatial extension)
- JWT authentication (djangorestframework-simplejwt)
- Gunicorn + Whitenoise for serving
- Python package manager: **uv**
- Linting/formatting: **ruff**

**Frontend Stack:**
- **Legacy Apps**: Create React App with React 16-18
- **Modern Apps**: Next.js 16 with React 19 and TypeScript
- Mapping: Leaflet, MapLibre GL, React Leaflet, React Map GL
- Forms: Formik + Yup (legacy), React Hook Form + Zod (modern)
- Data Fetching: React Query, SWR, Axios
- Styling: Bootstrap (4 & 5), Sass

**DevOps:**
- Docker + Docker Compose for development
- GitHub Actions for CI/CD
- GitHub Container Registry (ghcr.io) for images
- Sentry for error monitoring

## Directory Structure

```
/
├── apps/                       # Frontend applications
│   ├── about/                 # Info/summary site (CRA, React 18)
│   ├── frontend/              # Main citizen science app (CRA, React 17) - keadatabase.nz
│   ├── frontend-next/         # Next.js v3 replacement (Next.js 16, React 19)
│   ├── map/                   # Mapping utility (Next.js 16) - map.keadatabase.nz
│   ├── survey/                # Survey tool (CRA, React 16) - survey.keadatabase.nz
│   └── survey-next/           # Next.js survey (Next.js 16, React 19)
│
├── backend/                   # Django REST API
│   └── src/
│       ├── analysis/          # Data analysis endpoints
│       ├── bands/             # Band combination models/API
│       ├── birds/             # Bird models and management
│       ├── geojson/           # GeoJSON endpoints for maps
│       ├── keadatabase/       # Django project settings
│       ├── locations/         # Study areas, regions, grid tiles
│       ├── report/            # Public observation submission
│       ├── sightings/         # Core observation/sighting models
│       ├── surveys/           # Survey functionality
│       ├── synchronise/       # Data import from legacy Access DB
│       └── theme/             # DRF customizations
│
├── packages/                  # Shared workspace packages
│   ├── geospatial/           # MapLibre, Turf.js utilities
│   └── shared/               # Zod schemas, date-fns utilities
│
├── scripts/                   # Data processing scripts
│   └── telemetry/            # R scripts for telemetry imports
│
└── .github/workflows/         # CI/CD pipelines
```

## Applications

### Production Applications

1. **apps/frontend** → keadatabase.nz
   - Primary citizen science portal
   - Browse banded birds and their sightings
   - Search by band combinations
   - Submit kea observations with photos
   - View observation maps
   - Browse recent sightings

2. **apps/about** → about.keadatabase.nz
   - Project information and statistics
   - Database overview
   - Contact information

3. **apps/map** → map.keadatabase.nz
   - Embeddable map widgets
   - Filtered observation queries
   - Interactive geospatial visualization

4. **apps/survey** → survey.keadatabase.nz
   - Population and distribution studies
   - Grid-based survey methodology (e.g., 10km x 10km tiles)
   - Survey submission and analysis
   - Observer management

### Next-Generation Apps (In Development)

5. **apps/frontend-next**
   - Modern Next.js replacement for main frontend
   - React 19 + TypeScript
   - Improved performance and SEO

6. **apps/survey-next**
   - Next.js version of survey tool
   - Modern architecture with React Compiler

## Backend API

**Base URL**: Varies by environment (see .env files)

### Key Endpoints

- `/api/birds/` - Banded bird records
- `/api/observations/` - Kea sighting observations
- `/api/band_combos/` - Band combination data
- `/api/surveys/` - Survey data and submissions
- `/api/geojson/` - GeoJSON data for mapping
- `/api/analysis/` - Data analysis endpoints
- `/api/auth/` - JWT authentication

### Authentication

- Uses JWT tokens (djangorestframework-simplejwt)
- Admin interface for data moderation
- Public submission endpoints (no auth required)

## Domain-Specific Context

### Kea Conservation

The **kea** is a Threatened-Nationally Endangered species:
- Alpine parrot endemic to New Zealand's South Island
- Highly intelligent, curious, and playful
- Faces threats from predators, habitat loss, and human interaction

### Banded Birds

Researchers band kea with unique color combinations for individual identification:
- Multiple bands on different positions (left/right leg, upper/lower position)
- Band colors: Orange, Yellow, Green, Blue, Red, White, Black, Metal
- Each bird has a unique combination pattern
- Critical for tracking movement, behavior, and longevity

### Survey Methodology

Grid-based surveys help track population distribution:
- New Zealand divided into grid tiles (typically 10km x 10km)
- Observers record kea sightings (and non-sightings) within tiles
- Data includes count, time, location, behavior, observer details
- Helps identify population hotspots and trends

### Observation Types

1. **General Sightings**: Public reports of kea observations
2. **Banded Bird Sightings**: Reports of individually identifiable kea
3. **Survey Data**: Structured survey observations
4. **Telemetry Data**: GPS tracking data (imported via R scripts)

## Development Workflow

### Setup

```bash
# Install dependencies
pnpm install

# Start development environment (Docker)
docker-compose up

# Backend only
cd backend
uv sync
python src/manage.py runserver

# Frontend only
cd apps/frontend
pnpm dev
```

### Build Commands

```bash
# Build all apps
pnpm turbo build

# Build specific app
pnpm turbo build --filter=frontend

# Run tests
pnpm turbo test
```

### Key Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all apps for production
- `pnpm lint` - Run linters
- `pnpm format` - Format code

## Important Configuration Files

### Root
- `turbo.json` - Turborepo task orchestration
- `pnpm-workspace.yaml` - Workspace package definitions
- `docker-compose.yml` - Development environment setup

### Backend
- `backend/pyproject.toml` - Python dependencies (uv format)
- `backend/src/keadatabase/settings.py` - Django settings
- `backend/Dockerfile` - Backend container configuration

### CI/CD
- `.github/workflows/backend.yml` - Backend build/deploy
- `.github/workflows/frontend.yml` - Frontend builds
- `.github/workflows/map.yml` - Map app build
- `.github/workflows/survey.yml` - Survey app build

## Migration Strategy

The project is actively transitioning from Create React App to Next.js:

- **Old**: `apps/frontend` (CRA, React 17)
- **New**: `apps/frontend-next` (Next.js 16, React 19)

- **Old**: `apps/survey` (CRA, React 16)
- **New**: `apps/survey-next` (Next.js 16, React 19)

Next.js apps leverage:
- TypeScript for type safety
- Zod for validation
- React 19 features (React Compiler)
- Shared workspace packages for code reuse

## Data Management

### Legacy Integration
- Original data in Microsoft Access database
- Synchronization scripts in `backend/src/synchronise/`
- mdbtools for Access DB extraction

### Data Imports
- CSV import functionality for bulk observations
- R scripts for telemetry data processing
- GeoJSON exports for mapping applications

## Deployment

- **Container Registry**: GitHub Container Registry (ghcr.io)
- **Build**: GitHub Actions on push to main
- **Images**: Built per application (frontend, backend, map, survey)
- **Environment**: Production environment variables in .env files

## Key Dependencies to Know

### Backend
- `djangorestframework-gis` - Geospatial REST API
- `django-versatileimagefield` - Image processing
- `django-storages` - S3/Swift storage backends
- `sentry-sdk` - Error monitoring

### Frontend
- `leaflet` / `react-leaflet` - Legacy mapping
- `maplibre-gl-js` / `react-map-gl` - Modern mapping (Next.js apps)
- `@turf/turf` - Geospatial calculations
- `zod` - Schema validation (Next.js apps)
- `react-hook-form` - Form handling (Next.js apps)

## Common Tasks

### Adding a new observation field
1. Update Django model in `backend/src/sightings/models.py`
2. Create migration: `python manage.py makemigrations`
3. Update serializer in `backend/src/sightings/serializers.py`
4. Update frontend form in relevant app
5. Update validation schema (Yup or Zod)

### Creating a new map layer
1. Add GeoJSON endpoint in `backend/src/geojson/`
2. Create layer component in `packages/geospatial/` (for Next.js)
3. Or use Leaflet in legacy apps

### Adding a new survey type
1. Update models in `backend/src/surveys/models.py`
2. Create admin interface
3. Update frontend survey forms
4. Add analysis endpoints if needed

## Environment Variables

Each app has its own `.env` file with:
- `REACT_APP_API_URL` / `NEXT_PUBLIC_API_URL` - Backend API URL
- `REACT_APP_MAPBOX_TOKEN` - Mapbox API key (if used)
- `SENTRY_DSN` - Sentry error tracking
- `GOOGLE_ANALYTICS_ID` - Analytics tracking

## Testing Strategy

- Backend: Django test suite
- Frontend: Limited testing in legacy apps
- Focus on manual testing for citizen science workflows

## Support & Documentation

- **Issue Tracker**: Likely GitHub Issues (check repository)
- **Partners**: Arthur's Pass Wildlife Trust, Department of Conservation
- **Contact**: Via about.keadatabase.nz

## Notes for Future Development

1. **Next.js Migration**: Continue migrating CRA apps to Next.js for better performance
2. **TypeScript**: Increase TypeScript coverage across codebase
3. **Shared Components**: Extract more reusable components to workspace packages
4. **API Versioning**: Consider API versioning as platform evolves
5. **Mobile**: Consider native mobile app for field observations
6. **Real-time**: Consider WebSocket updates for live sighting feeds

## Conservation Impact

Every observation submitted helps researchers:
- Track individual kea lifespans and movements
- Understand habitat preferences
- Monitor population trends
- Inform conservation strategies
- Engage the public in kea protection

The platform demonstrates how technology can support wildlife conservation through community engagement and data-driven research.
