function fetchWeather(latitude, longitude, type) {
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            const displayElement = type === 'auto' ? document.getElementById('weatherDisplay') : document.getElementById('manualWeatherDisplay');
            displayElement.innerHTML = `Current Temperature: ${data.current_weather.temperature}°C`;
            displayElement.style.display = 'block';
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
// Assuming fetchWeather() and other necessary functions remain unchanged

// Function to initialize map automatically
function initializeAutoMap(lat, lon) {
    var autoMap = L.map('autoMap').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(autoMap);
    L.marker([lat, lon]).addTo(autoMap)
        .bindPopup('Your location').openPopup();
}

// Function to initialize map based on manual input
function initializeManualMap(lat, lon) {
    var manualMap = L.map('manualMap').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(manualMap);
    L.marker([lat, lon]).addTo(manualMap)
        .bindPopup('Selected location').openPopup();
}

// Adjusted DOMContentLoaded event listener to initialize the auto map
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            fetchWeather(data.latitude, data.longitude, 'auto');
            initializeAutoMap(data.latitude, data.longitude); // Use auto map init function
        })
        .catch(error => {
            console.log("Error: ", error);
        });
});

// Adjusted manual location form submission handler to use the manual map init function
document.getElementById('manualLocationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    fetchWeather(latitude, longitude, 'manual');
    initializeManualMap(latitude, longitude); // Use manual map init function
});
