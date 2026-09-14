# ns-met-office
This project allows user to enter longitude and latitude to determine the temperature for the next three hours via the terminal.

## Project Structure
```
project/
├── src/
│   ├── index.ts
│   ├── input.ts
│   ├── weather-api.ts
│   ├── time-utils.ts
│   └── weather-utils.ts
│   └── types.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
└── README.md
```

## Set Up
To run, clone this repository via ```git clone```.

Then from root directory of this repository, run ```npm install``` and ```node src/index.ts```. Simply enter a valid latitude and longitude to get a response.