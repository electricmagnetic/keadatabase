# survey-next - Kea Survey Tool (Next.js)

## Overview

This is the Next.js 16 replacement for the original Kea Survey Tool (first built in 2019 with Create React App). It's part of the Kea Database's migration strategy from legacy CRA apps to modern Next.js architecture.

**Status**: Early development / Foundation phase
**Production URL**: survey.keadatabase.nz (currently serves legacy app)
**Tech Stack**: Next.js 16, React 19, TypeScript, Zod
**Started**: May 2024

> **Important**: This is just the starting point for the survey-next application. Significant additional work will be required to reach feature parity with the legacy app and implement new functionality. This document captures the current foundation and serves as a roadmap for future development.

## Purpose

The Kea Survey Tool enables researchers and citizen scientists to conduct structured population surveys of kea across New Zealand. It uses a grid-based methodology where observers record kea sightings (and non-sightings) within specific geographic tiles, helping identify population hotspots and trends.

## Current Implementation Status

### ✅ Completed

**Foundation & Configuration**
- Next.js 16 setup with React Compiler enabled
- TypeScript configuration with strict mode
- Path aliases configured (`@/*` → `src/*`)
- IBM Plex Sans font integration
- Environment variable setup (.env.example)
- ESLint configuration (Next.js defaults)
- Integration with shared workspace package

**Layout & Navigation**
- Root layout with Header and Footer (layout.tsx:1)
- Header navigation with links to all main sections (Header.tsx:1)
- Footer with secondary navigation (Footer.tsx:1)
- Global CSS with CSS custom properties (globals.css:1)
- Responsive flexbox layout structure

**API Integration**
- Generic `fetcher` utility from shared package with Zod validation (shared/api/fetcher.ts:29)
- Type-safe API responses with discriminated unions (success/error states)
- Django REST Framework integration
- Standardized error handling (NOT_FOUND, FETCH, SCHEMA error types)

**Survey Features**
- Browse surveys list with pagination support (surveys/page.tsx:14)
- Individual survey detail view (surveys/[id]/page.tsx:11)
- Survey schema with Zod validation (surveys/schema.ts:18)
- Server actions for data fetching (surveys/actions.ts:7)
- Display of survey metadata (date, observer, max flock size, comments)
- Integration with backend `/surveys/surveys/` API endpoint

**WordPress CMS Integration**
- Reusable WordPress page component from shared package (shared/cms/wordpress.tsx:58)
- Environment-configured WordPress base URL
- About page pulling from WordPress (about/page.tsx:10)
- Instructions page pulling from WordPress (instructions/page.tsx:10)
- Legal page pulling from WordPress (legal/page.tsx:10)

**UI Components**
- Page component system (Heading, Section, Container) (ui/Page.tsx:1)
- Error component for error states (ui/Error.tsx:1)
- DateTime formatter using date-fns (shared/ui/DateTime.tsx:9)

### 🚧 Stub Pages (TODO Implementation)

These pages exist with basic structure but need implementation:

1. **Submit Survey** (submit/page.tsx:9)
   - Main survey submission form
   - Grid tile selection
   - Hour-by-hour kea observations
   - Activity tracking per hour
   - Max flock size recording

2. **Analysis** (analysis/page.tsx:9)
   - Survey data visualization
   - Population trend analysis
   - Geographic distribution maps

3. **Grid Map** (grid/page.tsx:9)
   - Interactive map of survey grid tiles
   - Visual indication of surveyed vs. unsurveyed areas
   - Tile selection for surveys

### 📦 Dependencies

**Core**
- `next`: 16.2.6 (with React Compiler)
- `react`: 19.2.6
- `react-dom`: 19.2.6
- `zod`: ^4.4.3 (schema validation)

**Workspace**
- `shared`: workspace:* (common utilities)

**Dev**
- `typescript`: ^5
- `eslint`: ^9
- `eslint-config-next`: 16.2.6
- `babel-plugin-react-compiler`: 1.0.0

## Architecture

### File Structure

```
src/
├── app/
│   ├── _components/           # Shared components (underscore = not a route)
│   │   ├── api/              # API utilities
│   │   │   ├── helpers.ts    # Param parsing helpers
│   │   │   └── schema.ts     # Common API schemas
│   │   ├── cms/              # CMS integration
│   │   │   └── wordpress.tsx # Pre-configured WordPress components
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/               # UI components
│   │       ├── Error.tsx
│   │       └── Page.tsx
│   │
│   ├── about/                # Route: /about
│   ├── analysis/             # Route: /analysis (TODO)
│   ├── grid/                 # Route: /grid (TODO)
│   ├── instructions/         # Route: /instructions
│   ├── legal/                # Route: /legal
│   ├── submit/               # Route: /submit (TODO)
│   ├── surveys/              # Route: /surveys
│   │   ├── [id]/            # Route: /surveys/:id
│   │   │   └── page.tsx     # Survey detail view
│   │   ├── actions.ts       # Server actions
│   │   ├── schema.ts        # Zod schemas
│   │   └── page.tsx         # Survey list view
│   │
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── globals.css           # Global styles
│   └── favicon.ico
│
└── public/
    └── images/
        └── logo.svg
```

### Key Patterns

**1. Server Actions for Data Fetching**
```typescript
// surveys/actions.ts
"use server";

export const getSurveys = async () =>
  await fetcher(
    `${process.env.NEXT_PUBLIC_API_BASE}/surveys/surveys/`,
    SurveyApiListResponseSchema,
  );
```

**2. Zod Schema Validation**
```typescript
// surveys/schema.ts
export const SurveySchema = z.object({
  id: z.number().int(),
  observer: z.string(),
  date: z.coerce.date(),
  // ... more fields
});
```

**3. Type-Safe Error Handling**
```typescript
const surveyFetch = await getSurvey(id);

if (!surveyFetch.success) {
  if (surveyFetch.errorType === "NOT_FOUND") return notFound();
  return <Error message="Error fetching surveys" />;
}

const survey = surveyFetch.data; // Type-safe!
```

**4. Component Composition**
```typescript
// Page component system
<Page.Container>
  <Page.Heading>Title</Page.Heading>
  <Page.Section>Content</Page.Section>
</Page.Container>
```

**5. WordPress CMS Pages**
```typescript
// Simple WordPress page rendering
<WordPressPage id={474} />  // Fetches and renders page from WP
```

## Environment Variables

```bash
# Backend API
NEXT_PUBLIC_API_BASE=https://dev.data.keadatabase.nz

# WordPress CMS
NEXT_PUBLIC_WORDPRESS_BASE=https://public-api.wordpress.com/wp/v2/sites/blog.keadatabase.nz
```

## Backend API Integration

**Base URL**: Configured via `NEXT_PUBLIC_API_BASE`
**Framework**: Django REST Framework
**Authentication**: JWT (not yet implemented in frontend)

### Current Endpoints Used

**Surveys**
- `GET /surveys/surveys/` - List all surveys (paginated)
- `GET /surveys/surveys/:id` - Get single survey detail

### API Response Format

All list endpoints follow Django REST Framework pagination:
```typescript
{
  count: number;
  next: string | null;      // URL to next page
  previous: string | null;  // URL to previous page
  results: T[];             // Array of results
}
```

### Survey Data Model

```typescript
type Survey = {
  id: number;
  observer: string;
  date: Date;
  purpose: string;
  comments: string;
  max_flock_size: number | null;
  status: string;
  get_status_display: string;
  date_created: Date;
  date_updated: Date;
  hours: SurveyHour[];
};

type SurveyHour = {
  id: number;
  hour: number;              // Hour of day (0-23)
  kea: boolean;              // Was a kea observed?
  activity: string;          // Activity code
  get_hour_display: string;  // Human-readable hour
  get_activity_display: string;  // Human-readable activity
  survey: number;            // Survey ID (foreign key)
  survey__date: Date;        // Denormalized survey date
  grid_tile: string | null;  // Grid tile reference
};
```

## Shared Package Utilities

The app leverages the `shared` workspace package for common functionality:

**API Utilities**
- `fetcher(url, schema, init?)` - Type-safe fetch with Zod validation (shared/api/fetcher.ts:29)
- Returns discriminated union: `{ success: true, data: T } | { success: false, errorType: ..., ... }`

**UI Components**
- `DateTime` - Formats dates with date-fns (shared/ui/DateTime.tsx:9)
- Supports formats: "date", "time", "dateTime"

**CMS Components**
- `WordPressPage` - Renders WordPress page by ID (shared/cms/wordpress.tsx:58)
- `WordPressPosts` - Renders WordPress posts (shared/cms/wordpress.tsx:125)

**Next.js Types**
- `PageWithParams` - Type for pages with route params (shared/next/types.d.ts:11)
- `PageWithSearchParams` - Type for pages with query params (shared/next/types.d.ts:14)

## Design Decisions

### Why Next.js 16?
- **React Compiler**: Automatic optimization of React components
- **Server Components**: Better performance and SEO
- **Type Safety**: Better TypeScript integration
- **App Router**: Modern routing with layouts
- **Future-proof**: Latest stable Next.js version

### Why Zod?
- **Runtime Validation**: Ensures API data matches expected types
- **TypeScript Integration**: Automatic type inference from schemas
- **Error Handling**: Detailed validation errors
- **Coercion**: `z.coerce.date()` handles date string conversion

### Why Server Actions?
- **Simplicity**: No need for separate API route files
- **Type Safety**: End-to-end type safety from server to client
- **Caching**: Built-in request deduplication
- **Progressive Enhancement**: Works without JavaScript

### Why Workspace Package?
- **Code Reuse**: Share utilities across multiple apps
- **Consistency**: Same patterns in frontend-next, survey-next, map
- **Maintenance**: Update in one place, benefits all apps

## CSS Architecture

**Approach**: Vanilla CSS with modern features
**Font**: IBM Plex Sans (loaded via next/font/google)
**Variables**: CSS custom properties for theming

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

body {
  font-family: var(--font-ibm-plex-sans), Arial, Helvetica, sans-serif;
}
```

**Layout**: Flexbox-based with semantic HTML
**Future Consideration**: May add Tailwind or CSS-in-JS if complexity grows

## Known Issues & Technical Debt

1. **Error Boundaries**: Need proper error boundary implementation (Error.tsx:1 is basic)
2. **Loading States**: No loading indicators for async operations
3. **Pagination**: Survey list shows all results, needs pagination UI
4. **Metadata**: Page metadata is basic, could be enhanced for SEO
5. **Authentication**: Not yet implemented (needed for submit functionality)
6. **TypeScript**: Some schemas marked as "TODO Provisional" (surveys/schema.ts:4)
7. **WordPress Caching**: WordPress pages fetch on every request (consider ISR)

## Development

### Running Locally

From repository root:
```bash
pnpm dev --filter=survey-next...
```

From app directory:
```bash
pnpm dev
```

Access at: http://localhost:3000

### Building

```bash
pnpm build
```

### Linting

```bash
pnpm lint
```

## Next Steps (Priority Order)

### High Priority
1. **Submit Survey Form** (submit/page.tsx)
   - Multi-step form with React Hook Form + Zod
   - Grid tile selection interface
   - Hour-by-hour observation entry
   - Photo upload support
   - Form submission to backend API

2. **Grid Map** (grid/page.tsx)
   - Integrate MapLibre GL from geospatial package
   - Display grid tiles over NZ
   - Show surveyed vs. unsurveyed tiles
   - Enable tile selection for surveys

3. **Authentication**
   - JWT token management
   - Login/logout flow
   - Protected routes (submit requires auth)
   - User profile display

### Medium Priority
4. **Analysis Page** (analysis/page.tsx)
   - Survey statistics dashboard
   - Charts/graphs (consider recharts or similar)
   - Export functionality

5. **Pagination**
   - Implement pagination UI for survey list
   - Use DRF pagination links (next/previous)

6. **Enhanced Survey Detail**
   - Display hour-by-hour observations
   - Show grid tile on map
   - Link to related surveys

### Low Priority
7. **Testing**
   - Add Vitest for unit tests
   - Add Playwright for e2e tests

8. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader optimization

9. **Performance**
   - Add loading states
   - Implement ISR for WordPress pages
   - Optimize images with next/image

## Migration from Legacy App

The original survey tool (apps/survey) has these features to migrate:

**Completed**:
- ✅ Basic navigation structure
- ✅ Survey browsing
- ✅ Survey detail view
- ✅ CMS integration (About, Instructions, Legal)

**TODO**:
- ❌ Survey submission form
- ❌ Grid map with tile selection
- ❌ Analysis/statistics
- ❌ User authentication
- ❌ Observer management
- ❌ Photo upload
- ❌ Survey editing
- ❌ CSV export

## Reference Links

- **Next.js Docs**: https://nextjs.org/docs
- **React Compiler**: https://react.dev/learn/react-compiler
- **Zod Docs**: https://zod.dev
- **Main Kea Database**: https://keadatabase.nz
- **Legacy Survey Tool**: https://survey.keadatabase.nz

## Notes

- React Compiler is enabled (next.config.ts:5) - avoid manual memoization
- All dates are coerced from strings using `z.coerce.date()`
- Server actions are marked with `"use server"` directive
- Component files under `_components` are not routes (Next.js convention)
- Public assets go in `/public` directory (currently just logo.svg)

## Questions to Resolve

1. **Form Library**: Should we use React Hook Form or Formik for submit form?
   - Recommendation: React Hook Form (modern, smaller, better TypeScript)

2. **Map Library**: MapLibre GL or Leaflet for grid map?
   - Recommendation: MapLibre GL (already in geospatial package, more modern)

3. **Charts**: Which charting library for analysis page?
   - Options: Recharts, Victory, D3
   - Need to evaluate based on requirements

4. **State Management**: Do we need a state management library?
   - Current: Using React Server Components + Server Actions
   - May need Zustand or Jotai for complex client state in submit form

5. **Testing**: What's the testing strategy?
   - Need to align with other Next.js apps in monorepo

---

## Development Roadmap

This application is in the **foundation phase**. The current implementation provides:
- ✅ Basic infrastructure and configuration
- ✅ API integration patterns
- ✅ Initial navigation and layout
- ✅ Read-only survey browsing

**Significant work remains**, including:
- Complex form submission with multi-step flows
- Interactive mapping with grid tile selection
- Authentication and user management
- Data analysis and visualization
- Photo upload and management
- Full feature parity with legacy survey.keadatabase.nz

This is intended as a modern, maintainable foundation upon which to build the complete survey tool functionality.

---

**Last Updated**: 2026-05-28
**Next Review**: After submit form implementation
