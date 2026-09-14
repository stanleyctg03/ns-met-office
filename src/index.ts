import * as process from "node:process";
import readline from "readline";
import { getDataWithLatitudeAndLongitude, getDataForNextThreeHours } from "./weather-api.ts";
import { getTemperature, isRaining } from "./weather-utils.ts";
import { getNextThreeHours } from "./time-utils.ts";
import { askQuestion, closeReadLine } from "./input.ts";


async function main() {
    try {
        const latitude: number = Number(await askQuestion("Latitude: "));
        const longitude: number = Number(await askQuestion("Longitude: "));
        const data = await getDataWithLatitudeAndLongitude(latitude,longitude);
        const nextThreeHours = getNextThreeHours();
        const filteredData = getDataForNextThreeHours(data, nextThreeHours);

        let willRain = false;
        for (let i = 0; i < filteredData.length; i++) {
            let temperature = getTemperature(filteredData[i]);
            console.log(`Temperature for Next ${i + 1} Hour: ${temperature.toFixed(2)}°C`);
            if (isRaining(filteredData[i])) {
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
