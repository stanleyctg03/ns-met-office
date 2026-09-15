import type {TimeSeries} from "../types.ts";

export function getTemperature(timeSeriesData: TimeSeries) {
    return timeSeriesData.feelsLikeTemperature;
}

export function getWeatherCode(timeSeriesData: TimeSeries) {
    return timeSeriesData.significantWeatherCode;
}

export function isRaining(timeSeriesData: TimeSeries) {
    return timeSeriesData.significantWeatherCode > 8 ? true : false;
}