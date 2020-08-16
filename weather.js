const clouds = document.querySelector(".js-clouds"),
  clear = document.querySelector(".js-clear"),
  fog = document.querySelector(".js-fog"),
  snow = document.querySelector(".js-snow"),
  rain = document.querySelector(".js-rain"),
  thunder = document.querySelector(".js-thunder"),
  weatherText = document.querySelector(".js-weatherText");

const temp = document.querySelector(".js-temp");
const position = document.querySelector(".js-position");

const API_KEY = "22b2f37b24cdea80744e71eac949169d";
const COORDS = "coords";
const PLACE = "place";

function getWeather(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      temp.innerText = `${temperature}°`;
      position.innerText = `${place}`;
      localStorage.setItem(PLACE, place);

      const weatherInfo = json.weather[0]["main"];

      if (weatherInfo === "Clouds") {
        clouds.classList.add("showing");
        weatherText.innerText = "Clouds";
      } else if (weatherInfo === "Clear") {
        clear.classList.add("showing");
        weatherText.innerText = "Sunny";
      } else if (
        (weatherInfo === "Mist") |
        (weatherInfo === "Smoke") |
        (weatherInfo === "Haze") |
        (weatherInfo === "Dust") |
        (weatherInfo === "Fog") |
        (weatherInfo === "Sand") |
        (weatherInfo === "Dust") |
        (weatherInfo === "Ash")
      ) {
        fog.classList.add("showing");
        weatherText.innerText = "Fog";
      } else if (weatherInfo === "Snow") {
        snow.classList.add("showing");
        weatherText.innerText = "Snow";
      } else if ((weatherInfo === "Rain") | (weatherInfo === "Drizzle")) {
        rain.classList.add("showing");
        weatherText.innerText = "Rain";
      } else if (weatherInfo === "Thunderstorm") {
        thunder.classList.add("showing");
        weatherText.innerText = "Thunder";
      }
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
