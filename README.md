# Project Name
pharmacist-backend

## Demo
in progress

## Table of Contents
- [Rationale](#rationale)
- [Approach](#approach)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Setup](#project-setup)
- [Usage](#usage)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

## Rationale
a checkout backend system for a pharmacy or chemist

## Approach
-There is a backend developed in node js. 
-The front-end link is: https://github.com/leonmuchoki/pharmacist-frontend
-The application uses a relation database, postgresql.
-Sequelize is used to simplify fetching and adding of data

## Technologies Used
- express.js
- postgresql

### Libraries Used
- `sequelize`
- `express`

## Features
- authentication and authorization
- inventory managment: add inventory, list inventory
- inventory sales
- customer management

## Project Setup
- Download or clone the repository
- Run `npm i`
- Update config/db.config.js file with your database credentials
- Then `npm start`

## Usage
- On npm start, it will seed initial data like roles and test users
- Currently runs on port 8081. This can be changed in index.js which is the entry of the application

## Status
This project is `in development`.

List of Contributors:
- [Leon Muchoki]()

## License
[MIT]() @ [Author]()