# InfiniSprint

Takes your google calendar all day events and allows you to make a mini sprint, with a backlog, done collumn, and sprint countdown

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

