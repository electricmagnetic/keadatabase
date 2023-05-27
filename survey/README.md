# keadatabase-survey

A React-based survey tool for the Department of Conservation-backed kea population trends study.

## Setup

You will need to have Node >= 18 installed (and pnpm). Then run: `pnpm install`

## Running

To run on your local machine at <http://localhost:3000/> run: `pnpm start`

## Building

To build the app for production use, run: `npm run build`

## Documentation

Some basic documentation can be generated using: `jsdoc src/**/*.js`

## Layout

- `public/` Static HTML files included in build
- `src/` Main source code
  - `assets/` Static assets, including SCSS, grid tiles JSON and logos/banners
  - `components/` View and form components
    - `analysis/` Components for various analysis statistics
    - `form/` Form fields and helper components
    - `grid/` Grid components for fetching and displaying tiles and tile maps
    - `helpers/` Various helper components, including loading spinners, date formatting and field rendering
    - `map/` Various map components using Leaflet
    - `presentation/` Presentational components, including WordPress fetching
    - `submit/` Survey entry form fieldsets and logic
      - `initialDetails/` First form (trip and observer data) and fieldsets
      - `schema/` Initial values, survey parameters and form validation schemas
      - `surveyDetails/` Second form (survey hours) and fieldsets
    - `surveys/` Survey components for fetching and displaying surveys and survey hours
  - `views/` Layouts constructed from components

## Deploying

Ensure you have the following:

- `REACT_APP_MAPBOX_API_KEY`, `REACT_APP_LINZ_API_KEY` and `REACT_APP_SENTRY_DSN`, defined in `.env.local`

To deploy to Firebase run: `npm run deploy`

## Bug reports

Should be filed on the Kea Database Trello board (not presently public)
