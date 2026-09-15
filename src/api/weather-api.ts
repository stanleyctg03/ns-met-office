import 'dotenv/config';
import type { TimeSeries } from "../types.ts";

export async function getDataWithLatitudeAndLongitude(latitude: number, longitude: number): Promise<TimeSeries[]> {
    const apiKey = process.env.METOFFICE_API_KEY;
    if (!apiKey) {
        throw new Error("Missing API key!");
    }
    try {
        const response = await fetch(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${latitude}&longitude=${longitude}`, {
            headers: {
                "apikey": apiKey,
            }
        });
        const responseJson = await response.json();
        return responseJson.features[0].properties.timeSeries;
    } catch (error: any) {
        console.error(error)
        throw error;
    }
}

export function getDataForNextThreeHours(timeSeries, nextThreeHours: String[]): TimeSeries[] {
    const filteredData = timeSeries.filter((entry: any) =>
        nextThreeHours.includes(entry.time)
    );
    return filteredData;
}
