# keadatabase-front

![Tests](https://github.com/electricmagnetic/keadatabase-front/actions/workflows/tests.yml/badge.svg)

The React-based front-end for the Kea Database <https://keadatabase.nz> citizen science project.
Sponsored by [Catalyst](https://catalyst.net.nz).

## Setup

You will need to have Node >= 16 installed with npm. Then run:  
`npm install`

## Running

To run on your local machine at <http://localhost:3000/> run `npm start`

## Building

To build the app for production use, run `npm run build`

## Testing

TODO: Setup tests

## Deploying

Ensure you have the following:

- The `awscli` Python package installed and configured with id and secret key.
- All of the necessary environment variables defined in `.env.local`

To build and deploy to CloudFront/Amazon S3 (and hence make available at https://keadatabase.nz/):  
`npm run deploy`

## Bug reports

Should be filed on the Kea Database Trello board (not presently public)

## Licence

Kea Database  
Copyright (C) 2021 Electric Magnetic Limited

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see http://www.gnu.org/licenses/.
