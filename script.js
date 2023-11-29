const body = document.querySelector('body');
const img = document.querySelector('img');
const weatherDataContainer = document.querySelector('.weather-data-container');
const form = document.querySelector('form');
const input = document.querySelector('input');
const submitButton = document.querySelector('button');


const weatherURL = 'http://api.weatherapi.com/v1/current.json?key=ba1921a2d40344aeaf951928232311&q=';

// Async-based implementation
async function getWeather(city) {
    const request = weatherURL + city;
    const response = await fetch(request, {mode: 'cors'});
    const weatherData = await response.json();
    return weatherData;
}

async function printWeatherData(city) {
    weatherDataContainer.innerHTML = '';
    const weatherObject = await getWeather(city);
    console.log(weatherObject);
    // weatherDataContainer.innerHTML = weatherObject.location.name;
    for (let key of Object.keys(weatherObject)) {
        console.log(key);
        for (let [innerkey, value] of Object.entries(weatherObject[key])) {
            if (innerkey === 'condition') {
                console.log('WTF');
                img.src = 'https://' + weatherObject[key][innerkey]['icon'].slice(2);
                // console.log(weatherObject[key][innerkey]['icon']);
            }
            console.log(`${innerkey}: ${value}`);
            const div = document.createElement('div');
            div.innerHTML = `${innerkey}: ${value}`;
            weatherDataContainer.appendChild(div);
        }
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
});

submitButton.addEventListener('click', () => {
    console.log(input.value);
    printWeatherData(input.value);
});