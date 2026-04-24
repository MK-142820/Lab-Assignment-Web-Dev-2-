// 🔑 Replace with your OpenWeather API key
const API_KEY = "abcd1234yourapikey5678";

// Load history
let history = JSON.parse(localStorage.getItem("history")) || [];

// Run on load
window.onload = function () {
    displayHistory();
};

// ================= GET WEATHER =================
async function getWeather(cityName) {
    let cityInput = document.getElementById("city");
    let city = cityName || cityInput.value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        let data = await response.json();

        if (data.cod != 200) {
            document.getElementById("weather").innerHTML = "<p>❌ City not found</p>";
            return;
        }

        displayWeather(data);
        getForecast(city);
        saveHistory(city);

    } catch (error) {
        console.log(error);
        alert("Error fetching data");
    }
}

// ================= DISPLAY WEATHER =================
function displayWeather(data) {
    document.getElementById("weather").innerHTML = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <p>${data.weather[0].main}</p>
        <h3>${data.main.temp} °C</h3>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

