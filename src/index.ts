import { getDataWithLatitudeAndLongitude, getDataForNextThreeHours } from "./weather-api.ts";
import { getTemperature, getWeatherCode, isRaining } from "./weather-utils.ts";
import { getNextThreeHours } from "./time-utils.ts";
import { askQuestion, closeReadLine } from "./input.ts";

import {weatherCodeMap} from "./constants.ts";


async function main() {
    try {
        const latitude: number = Number(await askQuestion("Latitude: "));
        const longitude: number = Number(await askQuestion("Longitude: "));
        const fullTimeSeriesData = await getDataWithLatitudeAndLongitude(latitude, longitude);
        const nextThreeHours = getNextThreeHours();
        const filteredTimeSeriesData = getDataForNextThreeHours(fullTimeSeriesData, nextThreeHours);

        let willRain = false;
        for (let i = 0; i < filteredTimeSeriesData.length; i++) {
            let timeSeriesEntry = filteredTimeSeriesData[i];
            let temperature = getTemperature(timeSeriesEntry);
            let weatherCode = getWeatherCode(timeSeriesEntry);
            let description = weatherCodeMap[weatherCode];

            console.log(`Temperature and Weather Type for Next ${i + 1} Hour: ${temperature.toFixed(2)}°C, ${description}`);

            if (isRaining(timeSeriesEntry)) {
                willRain = true;
            }
        }

        if (willRain) {
            console.log(`You will need an umbrella!`);
        } else {
            console.log(`You wont need an umbrella!`);
        }

    } catch (error) {
        console.error(`An error occurred: ${error}`);
    } finally {
        closeReadLine();
    }
}


main();
