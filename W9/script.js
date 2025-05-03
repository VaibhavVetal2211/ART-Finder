function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    // Simulate AJAX call with setTimeout
    setTimeout(() => {
        const cityData = weatherData[city];
        
        if (cityData) {
            displayWeather(city, cityData);
        } else {
            alert('City not found in our database. Please try another city.');
        }
    }, 500); // Simulate network delay
}

function displayWeather(city, data) {
    document.getElementById('cityName').textContent = city;
    document.getElementById('temperature').textContent = `${data.temperature}°C`;
    document.getElementById('weatherCondition').textContent = data.condition;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
}

// Add event listener for Enter key
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
}); 