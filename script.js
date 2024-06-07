const apiKey = '2fd248bff1e6adc49dfe68f5852831c0';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationName = document.getElementById('locationName');
const temperature = document.getElementById('temperature');
const conditions = document.getElementById('conditions');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            changeBackgroundImage(data.weather[0].main);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherData(data) {
    locationName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    conditions.textContent = `Conditions: ${data.weather[0].description}`;
}

function changeBackgroundImage(weather) {
    let imageUrl;
    switch (weather) {
        case 'Clear':
            imageUrl = 'img/sky.jpg';
            break;
        case 'Clouds':
        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Dust':
        case 'Fog':
        case 'Sand':
        case 'Ash':
        case 'Squall':
            imageUrl = 'img/cloudy.jpg';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            imageUrl = 'img/rain.jpg';
            break;
        case 'Snow':
            imageUrl = 'img/snow.jpg';
            break;
        default:
            imageUrl = 'img/bg.jpg';
    }
    document.body.style.backgroundImage = `url('${imageUrl}')`;
}