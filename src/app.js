let now = new Date();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let currentDay = days[now.getDay()];
let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
let minutes = now. getMinutes();
 if (minutes < 10) {
    minutes = `0${minutes}`;
  }
let today = now.getUTCDate ();
let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Set","Oct","Nov","Dec"];
let currentMonth = months[now.getMonth()];


let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${currentDay}, ${today} ${currentMonth} ${hours}:${minutes}`;

let apiKey = "05f78a209463d416f8843b75229cbdc0";

function searchCity (event) {
  event.preventDefault();
  
  let chosenCity = document.querySelector(".insert-city").value;
  
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${apiKey}&units=metric`;
  
  axios.get(apiURL).then(displayData);
}

function searchCurrent (position) {
  
  
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

   axios.get(apiURL).then(displayData);
   
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrent);
}

let searchButton = document.querySelector("button#search");
searchButton.addEventListener("click", searchCity);

let currentButton = document.querySelector("button#current");
currentButton.addEventListener("click", getCurrent);

  function displayData (response){
  displayTemperature(response.data.main.temp);
  displayCity(response.data.name);
  displayWind(response.data.wind.speed);
  displayHumidity(response.data.main.humidity);
  displayDescription(response.data.weather[0].description);
  displayIcon (response.data.weather[0].icon);
  
}

  function displayCity(city){
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
  }

  function displayTemperature (temperature){ 
  let temperatureElement= document.querySelector("#daily-temperature");
  temperatureElement.innerHTML = Math.round(temperature);
  }

  function displayWind(windSpeed){
  let windElement = document.querySelector("#wind-element");
  windElement.innerHTML = `${windSpeed} km/h`;
  }

  function displayHumidity(humidity){
  let humidityElement = document.querySelector("#humidity-element");
  humidityElement.innerHTML = `${humidity} %`;
  }

  function displayDescription(description){
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
  }

  function displayIcon(iconId){
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`
  );
  iconElement.setAttribute ("alt", response.data.weather[0].description);
  }
  

 