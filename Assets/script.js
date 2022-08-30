// localStorage.clear()

let searchBtn = document.querySelector(".search button");
let searchForm = document.querySelector("#search-form")
let searchInput = document.getElementById("search-text")
let recentSearches = document.getElementById("recentSearches")
let searchCountSpan = document.querySelector("#searchCount")
let clearBtn = document.getElementById("clear")
let searchHistory = [];



let weather = {
  "apiKey": "f433c1e7958c1d2db885ae8ccc58b643",
  fetchWeather: function () {
    // is location "event"?
    const city = typeof location === 'object' ? document.querySelector(".search-bar").value : location;

    // let city;
    // if (typeof location === 'object') {
    //   city = document.querySelector(".search-bar").value
    // } else {
    //   city = location;
    // }

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      weather.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => weather.displayWeather(data));
  },

//https://api.openweathermap.org/data/2.5/weather?q=atlanta&units=imperial&appid=


  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    handleSetSavedSearches();
    renderSavedSearches();
  } 
};

//forecast function

let weatherForecast = {
  "apiKey": "f433c1e7958c1d2db885ae8ccc58b643",
  fetchWeatherForecast: function () {
    const city = typeof location === 'object' ? document.querySelector(".search-bar").value : location;

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city + 
      "&exclude=current,minutely,hourly,alerts&units=imperial&appid=" +
      weather.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => weather.displayWeatherForecast(data));
  },

  displayWeatherForecast: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".forecastDate").innerText = name;
    document.querySelector(".forecastIcon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".forecastDescription").innerText = description;
    document.querySelector(".forecastTemp").innerText = temp + "°F";
    document.querySelector(".forecastHumidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".forecastWind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".forecastWeather").classList.remove("loading");
    handleSetSavedSearches();
    renderSavedSearches();
  } 
};



//5 Day Forecast api call 
//https://api.openweathermap.org/data/2.5/forecast?q=denver&units=imperial&appid=f433c1e7958c1d2db885ae8ccc58b643




function renderSavedSearches() {
  let storedSearches = JSON.parse(localStorage.getItem("searchHistory"))

  if (storedSearches !== null) {
    searchHistory = storedSearches;
  }

  //Clears list
  recentSearches.innerHTML = "";
  searchCountSpan.textContent = searchHistory.length;

  for (let i = 0; i < searchHistory.length; i++) {
    let searchHistories = searchHistory[i];

    let li = document.createElement("button")
    li.textContent = searchHistories;
    li.setAttribute("data-index", i)
    li.addEventListener('click', function () {
      weather.fetchWeather(searchHistories);
    })
    recentSearches.appendChild(li);
  }
}

function handleSetSavedSearches() {
  let searchText = searchInput.value.trim();

  if (searchText === "") {
    return;
  }

  searchHistory.push(searchText);
  searchInput.value = "";

  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}



searchBtn.addEventListener("click", weather.fetchWeather, weatherForecast.fetchWeatherForecast);




renderSavedSearches();

