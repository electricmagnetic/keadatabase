Kea Database
============

Canonical monorepo for the [Kea Database](https://keadatabase.nz).

Structure
---------

* React (CRA)
  * `about/` Simple summary site
  * `frontend/` Main citizen science front-end
  * `survey/` Survey tool for population and distribution studies
* React (Next.js)
  * `map/` Mapping utility site (for embedding, specific queries etc)
  * `frontend-next` Version 3 of the front-end, to replace the CRA version
* Back-end
  * `backend/` Django-based back-end
* Other
  * `scripts/` Helper scripts in R for data management

Getting started
---------------
A docker-compose file is provided for development purposes that spins up containers for the frontend, backend and database. The contents of the database will be stored in `database/`.

To provision the whole stack run:
```
docker-compose up
```

To provision individual components run (examples):
```
docker-compose up frontend
docker-compose up about
```

Dependencies will be spun up as necessary.

Environment variables need to be set for the front-end and the back-end to make the API-dependent services work (e.g. map tile providers).

If you're using a fresh install, run the Django migrations and create a super user.
```
docker-compose run --rm backend python3 src/manage.py migrate
docker-compose run --rm backend python3 src/manage.py createsuperuser
```

Licence
-------
Kea Database  
Copyright (C) 2023 Electric Magnetic Limited  

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
