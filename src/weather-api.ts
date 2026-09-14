import 'dotenv/config';


export async function getDataWithLatitudeAndLongitude(latitude: number, longitude: number) {
    try {
        const apiKey = process.env.METOFFICE_API_KEY;
        if (!apiKey) {
            throw new Error('Missing API Key');
        }
        const response = await fetch(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${latitude}&longitude=${longitude}`, {
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
        // console.log("Request complete")
    }
}

export function getDataForNextThreeHours(fullData, nextThreeHours) {
    const timeSeries = fullData.features[0].properties.timeSeries;
    const filteredData = timeSeries.filter((entry: any) =>
        nextThreeHours.includes(entry.time)
    );
    return filteredData;
}
