async function getWeather() {
    const city = document.getElementById("city").value.trim();

    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const description = document.getElementById("description");
    const error = document.getElementById("error");

    cityName.textContent = "";
    temperature.textContent = "";
    humidity.textContent = "";
    wind.textContent = "";
    description.textContent = "";
    error.textContent = "";

    if (city === "") {
        error.textContent = "Please enter a city name.";
        return;
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    try {
        const geoResponse = await fetch(url);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found!");
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const cityDisplay = geoData.results[0].name;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        cityName.textContent = cityDisplay;
        temperature.textContent = `🌡 Temperature: ${weatherData.current.temperature_2m} °C`;
        humidity.textContent = `💧 Humidity: ${weatherData.current.relative_humidity_2m}%`;
        wind.textContent = `💨 Wind Speed: ${weatherData.current.wind_speed_10m} km/h`;
        description.textContent = "🌤 Live Weather Data";

    } catch (err) {
        error.textContent = err.message;
    }
}