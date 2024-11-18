# Inclus

Places without barriers – easily accessible for everyone.

<hr></hr>

Inclus wants to be a modern mobility platform for people with disabilities. To begin, we're starting with helping people in Munich find accessible toilets near them. Later we want to expand to other regions, other types of places and other mobility features.

## Technical setup

At the moment, only the `/frontend` folder is deployed for the working application. Everything else is legacy code from the original DPS team and other contributers (see list below).

The frontend is written as a React application and deployed on Vercel. We use Leaflet for the map interactions, Mapbox as the provider for the basemap and Open Street Maps as a location provider (all of these can still change).

## Inclus frontend development set-up

To develop for Inclus, first clone the repository and then change into the `/frontend` folder.

- run `npm install` to install the dependencies
- run `npm run prepare-eslint` to configure the static code analysis and code formatter pre-commit action
- run `npm start` to run a local development server for react (port 3000)

When new commits are deployed, Vercel will take care of building the production version of the frontend. In order to create and deploy preview releases you need to be a team member in our Vercel team.

## Inclus frontend editor development set-up

Change into the `/frontend-editor` folder. This project is bootstrapped with vite. 

- run `npm install` to install the dependencies
- run `npm run dev` to run locally on http://localhost:5173/

Currently, is also deployed via vercel on https://inclus-editor.vercel.app/.

## History

Inclus started as part of Batch#14 at the Digital Product School with Team Amazingo and the City of Munich (LHM) with Oswald Utz as the problem space provider.

The original team was David Rehm (PM), Grace Chuang (IxD), Payel Banerjee (SE), Yashaswi Pupneja (SE) and Ahmed Abouslima (AI). Akerke Tleugazy (SE) also contributed code as part of a follow-up effort.

As of March 2023 the DPS Core Team is continuing the development together with the City of Munich and the CBF Munich.