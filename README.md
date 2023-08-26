# Fullstack Monorepo: React + Nestjs, IntentIq project

# Instructions to run the project

1. Clone the repo
2. Run `nom i` in the root folder to install dependencies
3. Run `docker-compose up` to deploy the docker container with local DynamoDB
4. Run `npm run start` to start both nest-backend and react-frontend apps

project structure:
/packages/nest-backend - React app
/packages/react-frontend - Nestjs app
/packages/shared - shared interfaces

# Swagger API

http://localhost:4000/api/

http://localhost:4000/api/reports - GET all reports from DB
http://localhost:4000/api/reports/{:id} - PUT report by id
http://localhost:4000/api/reports/seed?count=${n} - seed DB with n random reports

# React app

http://localhost:4200/

- The dashboard page displays cards according to the specs. With the "Fetch Reports" button you could seed DB with random reports and get them to the UI. Also, you could set the Start Date and End Date to filter reports by date range.
- The table List page displays all fetched reports. You could select a column to order by and a direction of ordering.
- Designs are implemented with MUI library, state management - by MobX
