const API_KEY = '3KYA6M6XHDN67FSJLV9RNYD9Y';

// Forecast Days
let datetimes = [];
let temperatures = [];

// Forecast Today
let hoursToday = [];
let temperaturesToday = [];
let humiditiesToday = [];

async function init() {
    await loadWeatherDays();
    await loadWeatherToday()
    renderChartDays();
    renderChartToday();
    current_Temperature_Humidity();
}

async function loadWeatherDays() {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Neuwied?unitGroup=metric&key=${API_KEY}&contentType=json`
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let days = responseAsJson['days'];

    for (let i = 0; i < days.length; i++) {
        let day = days[i];

        let datetime = day['datetime'];
        let temperature = day['temp'];

        datetimes.push(datetime);
        temperatures.push(temperature);
    }
}

async function loadWeatherToday() {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Neuwied?unitGroup=metric&key=${API_KEY}&contentType=json`
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let today = responseAsJson['days'][0];       // erster Tag in Tabelle ist heute
    let hours = today['hours'];

    for (let h = 0; h < hours.length; h++) {
        timeWithSeconds = hours[h]['datetime'];
        let timeWithoutSeconds = timeWithSeconds.substring(0, timeWithSeconds.lastIndexOf(':'));
        let hourToday = timeWithoutSeconds;
        let hourlyTemperature = hours[h]['temp'];   //Temperatur
        let hourlyHumidity = hours[h]['humidity'];   //Temperatur


        hoursToday.push(hourToday);
        temperaturesToday.push(hourlyTemperature);
        humiditiesToday.push(hourlyHumidity);
    }
}

function current_Temperature_Humidity() {
    let now = new Date();
    let currentHour = now.getHours();

    for (let i = 0; i < hoursToday.length; i++) {
        let hour = hoursToday[i];
        let onlyHour = hour.substring(0, 2);

        if (onlyHour == currentHour) {
            document.getElementById('currentHour').innerHTML = temperaturesToday[i];
            document.getElementById('currentHumidity').innerHTML = humiditiesToday[i];
            break;
        }
    }
}