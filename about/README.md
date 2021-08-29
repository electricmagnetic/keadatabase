# about-keadatabase-nz

A simple explanatory website for the Kea Database project.

## Setup

You will need to have Node >= 16 installed (and npm). Then run `npm install`

## Running

To run on your local machine at <http://localhost:3000/> run `npm start`

## Building

To build the app for production use, run `npm run build`

## Deploying

Ensure you have the following:

- The `awscli` Python package installed and configured with id and secret key.
- All of the necessary environment variables defined in `.env.local`

To build and deploy to CloudFront/Amazon S3 (and hence make available at https://about.keadatabase.nz/): `npm run deploy`

## Bug reports

Should be filed on the Kea Database Trello board (not presently public)
