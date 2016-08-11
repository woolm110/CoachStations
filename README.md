# Coach Stations

> find coach stations based on postcode and search area.

## Getting Started

- Install dependencies: `npm install && bower install`
- Run `gulp serve` to run locally
- Run `gulp build` to build for production

## Usage
- Call `CoachStations.app.init()` inside `app/scripts/init.js` to load app using default parameters. 
- Optionally you can also pass a postcode and search distance (KM) to override the default values e.g. `CoachStations.app.init('SW1A 1AA', 5)`.

## Tests
- Open `index.html` inside `test` to load the test scripts.
