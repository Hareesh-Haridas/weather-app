const API_KEY = "48b1e5f9bf3a4992f7791b61592c2e02";

document.getElementById("weatherForm").addEventListener("submit", function (e) {
    e.preventDefault();
    getWeather();
})

async function getWeather() {
    console.log("entered function");
    const city = document.getElementById("search-city").value;
    console.log(city);
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log(data);
        updateUI(data);
    } catch (error) {
        alert(error.message);
    }
}
function updateUI(data) {
    const cityName = data.city.name;
    const weatherData = data.list[0];
    const temp = Math.round(weatherData.main.temp);
    const condition = weatherData.weather[0].main;
    const icon = weatherData.weather[0].icon;
    const windspeed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const visibility = weatherData.visibility / 1000;

    document.getElementById("weather-image").style.display = "block";
    document.getElementById("city").innerText = cityName;
    document.getElementById("celcious").innerText = `${temp}°C`;
    document.getElementById("weather").innerText = condition;
    document.getElementById("wind").innerText = `${windspeed} km/h`;
    document.getElementById("humid").innerText = `${humidity}%`;
    document.getElementById("prsre").innerText = `${pressure} hpa`;
    document.getElementById("visible").innerText = `${visibility} km`;
    document.getElementById("weather-image").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const weatherType = weatherData.weather[0].main;
    const img = document.getElementById("weather-image");
    if (weatherType === "Clear") {
        img.src = "images/sun.png";
    } else if (weatherType === "Rain") {
        img.src = "images/rain.png";
    } else if (weatherType === "Clouds") {
        img.src = "images/clouds.png";
    } else if (weatherType==="Snow") {
        img.src="images/snow.png";
    }
    else {
        img.src = "images/clouds.png";
    }


}