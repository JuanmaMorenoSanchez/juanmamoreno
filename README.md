# Structure

DDD project structure. Look at folders and/or tsconfig paths to see it clearly.

- Domain: Code that have all bussiness specific functionality. Isolated from any dependency including Angular
- Features: "Impure" code that touches Angular, http, dependencies, etc.., organized by feature
- Shared: Shared logic accross the app

## Run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run test:e2e` to execute the end-to-end Cypress tests
