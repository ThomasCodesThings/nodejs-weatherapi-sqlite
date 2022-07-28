import { connection } from "./knex.js";

export function getAllWeatherData() {
    return connection('WeatherData').select('*');
}

export function getWeatherDataById(id) {
    return connection('WeatherData').select('*').where('id', id);
}

export function insertWeatherData(weatherData) {
    return connection('WeatherData').insert(weatherData);
}

