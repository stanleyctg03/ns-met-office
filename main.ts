import 'dotenv/config';
import * as process from "node:process";
import readline from "readline";

const apiKey = process.env.METOFFICE_API_KEY;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    const latitude: number = Number(await askQuestion("Latitude: "));
    const longitude: number = Number(await askQuestion("Longitude: "));

    if (isNaN(latitude) || isNaN(longitude)) {
        console.error("Please enter a valid latitude and longitude");
    }
    rl.close();

    const data = await callWeatherForecastAPI(latitude,longitude);
    const nextThreeHours = getNextThreeHours();
    const filteredData = getDataForNextThreeHours(data, nextThreeHours);

    if (!filteredData) {
        console.error("No data for the next time");
    }
    console.log(filteredData);
}

function askQuestion(question: String): Promise<String> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function callWeatherForecastAPI(latitude: number, longitude: number): Promise<Response> {
    try {
        const response = await fetch(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=51.5539&longitude=-0.1446`, {
            headers: {
                "apikey": apiKey,
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch weather");
        }
        const responseJson = await response.json();
        return responseJson;
    } catch (error: any) {
        console.error(error)
    } finally {
        console.log("Request complete")
    }
}

function getDataForNextThreeHours(fullData, nextThreeHours) {
    const timeSeries = fullData.features[0].properties.timeSeries;
    const filteredData = timeSeries.filter((entry: any) =>
        nextThreeHours.includes(entry.time)
    );
    return filteredData;
}

function formatDateTime(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}T${hh}:${min}Z`;
}

function getNextThreeHours(): string[] {
    const now = new Date();
    const nextHour = new Date(now);

    nextHour.setMinutes(0, 0, 0);
    nextHour.setHours(nextHour.getHours() + 1);

    return [0, 1, 2].map((offset) => {
       const future = new Date(nextHour.getTime() + offset * 60 * 60 * 1000);
       return formatDateTime(future);
    });

}

main();
