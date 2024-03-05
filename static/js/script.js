document.getElementById('autoLocationBtn').addEventListener('click', function() {
    fetch('https://ipapi.co/json/')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("Latitude is :", data.latitude);
            console.log("Longitude is :", data.longitude);
            // Fetch and display weather using the obtained latitude and longitude
            fetchWeather(data.latitude, data.longitude);
        })
        .catch(function(error) {
            console.log("Error: ", error);
        });
});

document.getElementById('manualLocationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    fetchWeather(latitude, longitude); // Fetch weather using the provided coordinates
});

function fetchWeather(latitude, longitude) {
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDisplay = document.getElementById('weatherDisplay');
            // Extract and display weather information
            weatherDisplay.innerHTML = `Current Temperature: ${data.current_weather.temperature}°C`;
            weatherDisplay.style.display = 'block';
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
