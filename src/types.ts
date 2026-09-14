export interface TimeSeries {
    time: string;
    screenTemperature: number;
    screenDewPointTemperature: number;
    feelsLikeTemperature: number;
    windSpeed10m: number;
    windDirectionFrom10m: number;
    windGustSpeed10m: number;
    visibility: number;
    screenRelativeHumidity: number;
    mslp: number;
    uvIndex: number;
    significantWeatherCode: number;
    precipitationRate: number;
    probOfPrecipitation: number;
}
