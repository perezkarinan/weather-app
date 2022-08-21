function currentDate() {
  return new Date();
}
let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();
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

let h2 = document.querySelector("#date");
h2.innerHTML = `${day}`;

let h3 = document.querySelector("#time");
h3.innerHTML = `${hour}:${minutes}`;
//current temp

function currentTemp(response) {
  let showTemp = Math.round(response.data.main.temp);
  let h4 = document.querySelector("#temperature");
  h4.innerHTML = showTemp;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  //changing temp
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4bc3938ce8d1f5e4234ae8d08954dd0d&units=imperial`;
  axios.get(apiUrl).then(currentTemp);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function convertFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = 63;
}

function convertCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = 17;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);
