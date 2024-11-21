const apiKey = "36e1575e4dd4d02d3fee92c6c81679dc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".input-city");
const searchBtn = document.querySelector(".btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
    } else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp-heading").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".speed").innerHTML = "Wind Speed : " + data.wind.speed + " km/h";
        document.querySelector(".humidity").innerHTML = "Humidity : " + data.main.humidity + "%";
        document.querySelector(".fahrenheit").innerHTML = "Fahrenheit : " + Math.round(((data.main.temp) * 9 / 5) + 32) + "°F";
        document.querySelector(".weater-info").innerHTML = data.weather[0].main;

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "mist.png";
        }
    }


}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})










