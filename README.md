# ns-met-office
This project allows user to enter postcode to determine the temperature and weather type for the next three hours via the terminal.

## Project Structure
```
project/
├── src/
│   ├── index.ts
│   ├── input.ts
│   ├── weather-Api.ts
│   ├── time-utils.ts
│   └── weather-utils.ts
│   └── types.ts
│   └── constants.ts
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


Then from root directory of this repository, run ```npm install``` and ```node src/index.ts```. Simply enter a valid latitude and longitude to get a response.