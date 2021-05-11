let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let today = now.getUTCDate();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dec"];
let currentMonth = months[now.getMonth()];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${today} ${currentMonth} ${hours}:${minutes}`;

let apiKey = "05f78a209463d416f8843b75229cbdc0";


function searchCity(event) {
    event.preventDefault();

    let chosenCity = document.querySelector(".insert-city").value;

    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${apiKey}&units=metric`;

    axios.get(apiURL).then(displayData);
}

function searchCurrent(position) {


    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiURL).then(displayData);
}

function getCurrent(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchCurrent);
}

let searchButton = document.querySelector("button#btn-search");
searchButton.addEventListener("click", searchCity);

let currentButton = document.querySelector("button#btn-current");
currentButton.addEventListener("click", getCurrent);

let temperature = 45;

function displayData(response) {
    temperature = response.data.main.temp;
    displayTemperature(temperature);
    displayCity(response.data.name);
    displayWind(response.data.wind.speed);
    displayHumidity(response.data.main.humidity);
    displayDescription(response.data.weather[0].description);
    displayIcon(response.data.weather[0].icon);

    getForecast(response.data.coord);
}


function displayForecast(response){
  let forecast = response.data.daily;
    let forecastElement = document.querySelector ("#forecast");
  
    let forecastHTML = `<div class="row text-center">`;

    forecast.forEach(function (forecastDay,index) {
      
      let date = new Date(forecastDay.dt * 1000);

      console.log(date)
      
      if (index<6) {

        forecastHTML = forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${daysShort[date.getDay()]}</div>
          <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  }

  function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}




    
  


function displayCity(city) {
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = city;
}

function displayTemperature(temperature) {
    let temperatureElement = document.querySelector("#daily-temperature");
    temperatureElement.innerHTML = `${Math.round(temperature)}&deg;C`;
}

function displayWind(windSpeed) {
    let windElement = document.querySelector("#wind-element");
    windElement.innerHTML = `${windSpeed} km/h`;
}

function displayHumidity(humidity) {
    let humidityElement = document.querySelector("#humidity-element");
    humidityElement.innerHTML = `${humidity} %`;
}

function displayDescription(description) {
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = description;
}

function displayIcon(iconId) {
    let iconElement = document.querySelector("#weather-icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`
    );
}

function displayFahrenheitTemperature(event) {
    let fahrenheitTemperature = (temperature * 9 / 5) + 32;
    displayTemperature(Math.round(fahrenheitTemperature));

}

function displayCelsiusTemperature(event) {
    displayTemperature(temperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
 
 