# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

### Link to the website hosted on heroku: https://dashboard.heroku.com/apps/my-spendings-webtech, on first visit the server may take a few seconds to switch from idle to up state.

## Build

After download run `npm install` to get all dependencies.
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Production server

After running `ng build --prod`, start the command `node server.js` to provide the website from the production build.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## When using local REST service API

Set the `baseUrl` environmental variable called API in `src/environments/environment.ts` to connect to your local server
