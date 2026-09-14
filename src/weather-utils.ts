export function getTemperature(timeSeriesData) {
    return timeSeriesData.feelsLikeTemperature;
}

export function isRaining(timeSeriesData) {
    return timeSeriesData.precipitation > 0 ? true : false;
}