function getWeather() {
    var location = document.getElementById('locationInput').value;
    var apiKey = REACT_APP_API_KEY; 
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    showLoader();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function () {
        hideLoader();
        if (xhr.status === 200) {
            var weatherData = JSON.parse(xhr.responseText);
            displayWeather(weatherData);
        } else {
            handleErrors(xhr);
        }
    };
    xhr.send();
}


function displayWeather(data) {
    var resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = `
        <div class="card text-center">
            <div class="card-body">
                <h2 class="card-title mb-4">Weather in ${data.name}, ${data.sys.country}</h2>
                <p class="h3 mb-4">${data.main.temp} °C</p>
                <p class="weather-icons h5 mb-4">${data.weather[0].description} <i class="${getWeatherIcon(data.weather[0].icon)}"></i></p>
                <p class="mb-2">Humidity: ${data.main.humidity}%</p>
                <p class="mb-2">Wind Speed: ${data.wind.speed} m/s</p>
            </div>
        </div>
    `;

    resultDiv.style.display = 'block';
}

function getWeatherIcon(iconCode) {
    switch (iconCode) {
        case '01d':
            return 'fas fa-sun';
        case '01n':
            return 'fas fa-moon';
        case '02d':
        case '02n':
            return 'fas fa-cloud-sun';
        case '03d':
        case '03n':
            return 'fas fa-cloud';
        case '04d':
        case '04n':
            return 'fas fa-cloud-meatball';
        case '09d':
        case '09n':
            return 'fas fa-cloud-showers-heavy';
        case '10d':
        case '10n':
            return 'fas fa-cloud-sun-rain';
        case '11d':
        case '11n':
            return 'fas fa-bolt';
        case '13d':
        case '13n':
            return 'fas fa-snowflake';
        case '50d':
        case '50n':
            return 'fas fa-smog';
        default:
            return 'fas fa-question';
    }
}

function showLoader() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function handleErrors(xhr) {
    var errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<p>Error: ${xhr.status} - ${xhr.statusText}</p>`;
    setTimeout(() => {
        errorContainer.innerHTML = '';
    }, 5000);
}
