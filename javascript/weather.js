function currentDate() {
  return new Date();
}
let now = new Date();
//getting current date and time // hours and minutes
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
// adding date into HTML
let h2 = document.querySelector("#date");
h2.innerHTML = `${day}`;
//adding time to html
let h3 = document.querySelector("#time");
h3.innerHTML = `${hour}:${minutes}`;

//forecast day
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
//forecast
function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="weather-forecast-date"><small>${formatDay(
                forecastDay.dt
              )}</small></div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
            />
              <div class="forecast-temperature"> ${Math.round(
                forecastDay.temp.max
              )}℉</div>
            </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

//getting current information
function currentTemp(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity-input");
  let wind = document.querySelector("#wind-input");
  let mainIcon = document.querySelector("#main-icon");

  fahrenheitTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(fahrenheitTemp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  mainIcon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

//getting current city
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4bc3938ce8d1f5e4234ae8d08954dd0d&units=imperial`;
  axios.get(apiUrl).then(currentTemp);
}
//inserting city into heading
function handleSearchButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

// fahrenheit conversion
function displayFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

// celsius conversion
function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let celsiusTemp = (fahrenheitTemp - 32) / 1.8;
  tempElement.innerHTML = Math.round(celsiusTemp);
}
let fahrenheitTemp = null;
//clicking submit button
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearchButton);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

//defaulting NY
search("New York");
displayForecast();
