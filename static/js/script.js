document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

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
            // Here, extract and format the data you want from the response
            // For example, displaying the current temperature:
            weatherDisplay.innerHTML = `Current Temperature: ${data.current_weather.temperature}°C`;
            weatherDisplay.style.display = 'block'; // Show the weather data
        })
        .catch(error => console.error('Error fetching weather data:', error));
}