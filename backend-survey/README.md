# keasurvey-back

## Setup

This guide assumes that `python3`, `pip`, `postgres` (with postgis) and virtual
environments are installed.

`./manage.py` commands should be run from the `src/` directory.

For instructions on setting up PostGIS:
<https://docs.djangoproject.com/en/2.2/ref/contrib/gis/install/postgis/>

Required packages: `binutils`, `libproj-dev`, `gdal-bin`, `postgresql-x.x`, `postgresql-x.x-postgis`, `postgresql-x.x-postgis-x.x-scripts`, `postgresql-server-dev-x.x`, `python3-psycopg2`

1. Setup `python3` virtual environment
2. Copy the contents of `.env.example` to `.env` and adjust as appropriate
3. Create a new database 'keasurvey' with username 'postgres' and no password
4. `pip install -r requirements.txt`
5. `cd src`
6. `./manage.py migrate`
7. `./manage.py createsuperuser`

NB: To create database, login as postgres user then run `createdb keasurvey` in bash shell and `grant all privileges on database keasurvey to postgres;` in the psql shell. You may need to adjust your pg_hba.conf settings for no password access.

## Running

`src/manage.py runserver`

## Testing

Ensure that the `keasurvey_test` db is able to be created before running.

`src/manage.py test`

You can get code coverage reports:

1. Installed `coverage` with pip
2. `coverage run src/manage.py test src`
3. `coverage report`

## Data synchronisation: GridTile

1. Obtain three datasets for GridTile (polygons as EPSG:4326, min/max points as EPSG:2193) as shapefiles
2. Temporarily modify the GridTile model on a local version of kea survey to enable `null=True` on min/max fields (discard migrations afterwards)
3. Import datasets into the local version of the kea database using `./manage.py loadgridtiles`
4. Remove temporary `null=True`from models
5. Dump data using `./manage.py dumpdata locations.gridtile`
6. Upload data to the keasurvey S3 bucket
7. `heroku run bash` then wget the data and run `./manage.py loaddata <filename>`

## Layout

- `src/keasurvey/` - Project settings
- `src/locations/` - GridTile models and helpers
- `src/report/` - The only non-read-only API endpoint, used for POSTing observations
- `src/theme/` - Django REST Framework customisations
- `src/geojson/` - Provides a GeoJSON endpoint of filterable observations
- `src/surveys/` - Provides the kea survey tool functionality
- `src/analysis/` - Provides an endpoint for analysis of observation data

## Code formatting

- Code formatting is handled by `ruff`: `uv run ruff format src/`
