import type {TimeSeries} from "./types.ts";

export function getTemperature(timeSeriesData: TimeSeries) {
    return timeSeriesData.feelsLikeTemperature;
}

export function isRaining(timeSeriesData: TimeSeries) {
    return timeSeriesData.precipitation > 0 ? true : false;
}