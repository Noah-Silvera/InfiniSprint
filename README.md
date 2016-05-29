# InfiniSprint

Takes your google calendar all day events and allows you to make a mini sprint, with a backlog, done collumn, and sprint countdown

## Purpose

Other people have created similiar apps, and done it better. This app was started as a learning experience. I wanted to a.) Get experience working on a long and complex piece of software, b.) Learn the challenges of integrating and synchronizing with an external data source ( in this case, google calendar ), and c.) Learn about the architectural patterns that work, and the patterns that don't, and find out more about how to program well at every step.

I'm recording the challenges I've encountered and what I've learned in the wiki. 

I plan on keeping this project privately hosted for myself. Star the repo if you'd use it if it went public!

### Project Status

Currently under development, no feature is currently working

### Setup

create a client secret file as per these instructions from google
https://developers.google.com/google-apps/calendar/quickstart/nodejs#step_1_turn_on_the_api_name
download and place the client_secret_xxx_yyy.json file in user_data
rename the file client_secret.json 


### Usage

```
npm install
npm start
Open http://localhost:5000
Click the refresh data button to fetch data from your google calendar
Enter your credentials in the command line when prompteds
```
#### Trouble Shooting

I had an issue with invalid client_secret.json files that was solved by this stackoverflow
https://stackoverflow.com/questions/35201949/node-js-with-gmail-api-the-api-returned-an-error-error-unauthorized-client

### Linting

ESLint with React linting options have been enabled.

```
npm run lint
```

