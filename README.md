# ns-met-office
This project allows user to enter postcode to determine the temperature and weather type for the next three hours.

## Project Structure
```
project/
├── metoffice/
│   ├── src/
    │   ├── Api.ts
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
├── src/
│   ├── index.ts
│   ├── input.ts
│   ├── weather-Api.ts
│   ├── time-utils.ts
│   └── weather-utils.ts
│   └── types.ts
│   └── constants.ts
│   └── server.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
└── README.md
```

## Set Up
To run, clone this repository via ```git clone```.

First, get api key from [Met Office DataHub](https://datahub.metoffice.gov.uk/) and create a .env file (refer to .env.example).


Then from root directory of this repository, run ```npm install``` to install dependencies needed for the program

From root, power the back end with ```npm start```, server is listening on port 8080.

From metoffice/ run ```npm run dev```, frontend is now running on port 5173.