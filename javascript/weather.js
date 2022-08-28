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

//getting current information
function currentTemp(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity-input");
  let wind = document.querySelector("#wind-input");

  fahrenheitTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(fahrenheitTemp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
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

//clicking submit button
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearchButton);
//defaulting NY
search("New York");
