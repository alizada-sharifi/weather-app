const weather = document.getElementById("weather");
const loader = document.getElementById("loader");
const card = document.getElementById("card");
const form = document.getElementById("form");
const search = document.querySelector("input");
const searchBtn = document.getElementById("btn");
const weatherStatus = document.getElementById("weather-status");
const weatherDegree = document.getElementById("weatehr-degree");
const cityName = document.getElementById("city");
const humidity = document.getElementById("humidity-percentage");
const wind = document.getElementById("wind-speed");
const errorMessage = document.getElementById("error");
// ===== global var and const
const apiKey = "4f0e9a2e0a3b0f51ad07bf2edee3aac5";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

async function checkWeather(city) {
  loader.classList.remove("d-none");
  errorMessage.classList.add("d-none");
  weather.classList.add("d-none");
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await response.json();
  if (response.status === 404) {
    weather.classList.add("d-none");
    errorMessage.classList.remove("d-none");
  } else {
    if (data.weather[0].main === "Clouds") {
      weatherStatus.src = `./img/clouds.png`;
    } else if (data.weather[0].main === "Clear") {
      weatherStatus.src = "./img/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherStatus.src = "./img/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherStatus.src = "./img/drizzle.png";
    } else if (data.weatehr[0].main === "Mist") {
      weatherStatus.src = "./img/mist.png";
    } else if (data.weatehr[0].main === "Snow") {
      weatherStatus.src = "./img/snow.png";
    }
    weatherDegree.textContent = Math.round(data.main.temp) + "°C";
    cityName.textContent = data.name;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed}km/h`;
    weather.classList.remove("d-none");
    errorMessage.classList.add("d-none");
  }
  loader.classList.add("d-none");
}
function showCity(e) {
  e.preventDefault();
  cityName.textContent = `${search.value}`;
  checkWeather(search.value);
  search.value = "";
}
// ======== eventListener ========
form.addEventListener("submit", showCity);
