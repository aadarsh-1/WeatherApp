document.addEventListener('DOMContentLoaded', function() {
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const cityName = document.getElementById('city-name');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const weatherDisplay = document.getElementById('weather-display');

    const apiKey = "51b4b7cb106843f55f9d433db0c4e133"; // Replace with your OpenWeatherMap API key

    weatherForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const city = cityInput.value;
        getWeather(city);
    });

    async function getWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            alert(error.message);
        }
    }

    function displayWeather(data) {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        weatherDescription.textContent = data.weather[0].description;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        weatherDisplay.style.display = 'block';
    }
})