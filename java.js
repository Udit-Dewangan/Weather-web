document.getElementById("checkWeatherBtn").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "bdc85d17354ff968f3f58d9e098f8c24";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            
                throw new Error(response.status === 404 ? "not found" : "Failed to fetch data");
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const cityName = data.name;
            const iconCode = data.weather[0].icon; 

            displayWeather(temperature, cityName, humidity, windSpeed, iconCode, description);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayWeather(temp, city, humidity, windSpeed, iconCode, description) {
    document.getElementById("temperature").innerHTML = `${Math.round(temp)}°`;
    document.getElementById("cityName").innerHTML = city;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("windSpeed").innerHTML = (windSpeed * 3.6).toFixed(2); 

    // Update weather icon
    const weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}">`;
}

function displayError(message) {
    document.getElementById("temperature").innerHTML = "--°C";
    document.getElementById("cityName").innerHTML = message;
    document.getElementById("humidity").innerHTML = "--";
    document.getElementById("windSpeed").innerHTML = "--";
    document.getElementById("weatherIcon").innerHTML = ""; 
}
