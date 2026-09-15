import { getDataWithLatitudeAndLongitude, getDataForNextThreeHours } from "./weather-api.ts";
import { getTemperature, getWeatherCode, isRaining } from "./weather-utils.ts";
import { getNextThreeHours } from "./time-utils.ts";
import { closeReadLine } from "./input.ts";
import { callPostcodeApi, getLatitudeAndLongitude } from "./postcode-api.ts";
import {weatherCodeMap} from "./constants.ts";


export async function getForecastForPostCode(postCode: String) {
    try {
        const result = {
            temperature: [],
            weatherType: [],
            willRain: false,
        };
        const postCodeApiData = await callPostcodeApi(postCode);
        const latitudeAndLongitude = await getLatitudeAndLongitude(postCodeApiData);

        const fullTimeSeriesData = await getDataWithLatitudeAndLongitude(latitudeAndLongitude.latitude, latitudeAndLongitude.longitude);
        const nextThreeHours = getNextThreeHours();
        const filteredTimeSeriesData = getDataForNextThreeHours(fullTimeSeriesData, nextThreeHours);

        for (let i = 0; i < filteredTimeSeriesData.length; i++) {
            let timeSeriesEntry = filteredTimeSeriesData[i];

            result.temperature.push(`${getTemperature(timeSeriesEntry).toFixed(2)}°C`);
            result.weatherType.push(weatherCodeMap[getWeatherCode(timeSeriesEntry)]);

            // console.log(`Temperature and Weather Type for Next ${i + 1} Hour: ${temperature.toFixed(2)}°C, ${description}`);

            if (isRaining(timeSeriesEntry)) {
                result.willRain = true;
            }
        }

        return {
            result
        }

    } catch (error) {
        console.error(`An error occurred: ${error}`);
    } finally {
        closeReadLine();
    }
}
