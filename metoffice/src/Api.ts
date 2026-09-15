export async function getForecastForPostcode(postcode: string) {
    try {
        const response = await fetch(`http://localhost:8080/forecast/${postcode}`);
        return response.json();
    } catch (e) {
        throw new Error(`Failed to get Forecast for postcode: ${postcode}`);
    }
}
