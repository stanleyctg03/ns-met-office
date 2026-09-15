export async function callPostcodeApi(postCode: String): Promise<void> {
    try {
        const response = await fetch(`https://api.postcodes.io/postcodes/${postCode}`);
        const responseJson = await response.json();
        return responseJson;
    } catch (error: any) {
        console.error(error)
        throw error;
    }
}

export async function getLatitudeAndLongitude(postCodeData) {
    return {
        latitude: postCodeData.result.latitude,
        longitude: postCodeData.result.longitude,
    }
}