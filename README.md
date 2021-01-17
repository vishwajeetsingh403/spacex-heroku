# Spacex

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Detailed steps to run the app

Clone the app from the repository.
Run `npm install` to install dependencies.
Run `ng serve` to run the application on your local browser.

## App Architecture

This Application is made with Angular version 8.3.0.

CSS pre-processor SASS has been used

For testing Karma is associated but no test cases has been covered. Hence No pre-commit hooks has been implemented.

Since the Application is depployed on Heroku, Heroku need an Express server to run our production ready app, Hence server.js file has been created.

node_modules has been put into .gitignore in order to prevent it from getting pushed accidently.

In order to visit the deployed code on Heroku, Please visit - `https://spacexlaunch-angular-app.herokuapp.com/app/home`

## Coding Approach

The api endpoints provided does not give proper responses based on query params passed, the filtered result may differ and need some filters to be selected first.

For eg: Successful Launch api false or null gives empty response which can lead to a malfunction of all filters without passing proper success_launch value.

A better approach and filter can be achieved with just one common api endpoint by using array filters.
