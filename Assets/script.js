localStorage.clear()

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
    weatherForecast.fetchWeatherForecast();
  } 
};


//forecast function
//https://api.openweathermap.org/data/2.5/forecast?q=philadelphia&exclude=current,minutely,hourly,alerts&units=imperial&appid=

let weatherForecast = {
  "apiKey": "f433c1e7958c1d2db885ae8ccc58b643",
  fetchWeatherForecast: function () {
    const city = typeof location === 'object' ? document.querySelector(".search-bar").value : location;

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
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
      .then((data) => weatherForecast.displayWeatherForecast(data));
  },

  displayWeatherForecast: function (data) {
    let filteredData = data.list.filter((forecastItem)=>{
      return forecastItem.dt_txt.includes("12:00:00")
  })
  console.log(filteredData)
  // console.log(filteredData[1].dt_txt)
    const date = filteredData[0].dt_txt;
    const forecastTemp = filteredData[0].main.temp;
    const forecastHumidity = filteredData[0].main.humidity;
    const forecastIcon = filteredData[0].weather[0].icon;
    const forecastDescription = filteredData[0].weather[0].description;
    const forecastSpeed = filteredData[0].wind.speed
    document.querySelector(".forecastDate").innerText = date;
    document.querySelector(".forecastIcon").src =
      "https://openweathermap.org/img/wn/" + forecastIcon + ".png";
    // document.querySelector(".forecastDescription").innerText = description;
    document.querySelector(".forecastTemp").innerText = forecastTemp + "°F";
    document.querySelector(".forecastHumidity").innerText =
      "Humidity: " + forecastHumidity + "%";
    document.querySelector(".forecastWind").innerText =
      "Wind speed: " + forecastSpeed + " km/h";
    // document.querySelector(".forecastWeather").classList.remove("loading");
    
    const date1 = filteredData[1].dt_txt;
    const forecastTemp1 = filteredData[1].main.temp;
    const forecastHumidity1 = filteredData[1].main.humidity;
    const forecastIcon1 = filteredData[1].weather[0].icon;
    const forecastDescription1 = filteredData[1].weather[0].description;
    const forecastSpeed1 = filteredData[1].wind.speed
    document.querySelector(".forecastDate1").innerText = date1;
    document.querySelector(".forecastIcon1").src =
      "https://openweathermap.org/img/wn/" + forecastIcon1 + ".png";
    // document.querySelector(".forecastDescription").innerText = description;
    document.querySelector(".forecastTemp1").innerText = forecastTemp1 + "°F";
    document.querySelector(".forecastHumidity1").innerText =
      "Humidity: " + forecastHumidity1 + "%";
    document.querySelector(".forecastWind1").innerText =
      "Wind speed: " + forecastSpeed1 + " km/h";
    // document.querySelector(".forecastWeather1").classList.remove("loading");
    
    const date2 = filteredData[2].dt_txt;
    const forecastTemp2 = filteredData[2].main.temp;
    const forecastHumidity2 = filteredData[2].main.humidity;
    const forecastIcon2 = filteredData[2].weather[0].icon;
    const forecastDescription2 = filteredData[2].weather[0].description;
    const forecastSpeed2 = filteredData[2].wind.speed
    document.querySelector(".forecastDate2").innerText = date2;
    document.querySelector(".forecastIcon2").src =
      "https://openweathermap.org/img/wn/" + forecastIcon2 + ".png";
    // document.querySelector(".forecastDescription").innerText = description;
    document.querySelector(".forecastTemp2").innerText = forecastTemp2 + "°F";
    document.querySelector(".forecastHumidity2").innerText =
      "Humidity: " + forecastHumidity2 + "%";
    document.querySelector(".forecastWind2").innerText =
      "Wind speed: " + forecastSpeed2 + " km/h";
    // document.querySelector(".forecastWeather2").classList.remove("loading");
    
    const date3 = filteredData[3].dt_txt;
    const forecastTemp3 = filteredData[3].main.temp;
    const forecastHumidity3 = filteredData[3].main.humidity;
    const forecastIcon3 = filteredData[3].weather[0].icon;
    const forecastDescription3 = filteredData[3].weather[0].description;
    const forecastSpeed3 = filteredData[3].wind.speed
    document.querySelector(".forecastDate3").innerText = date3;
    document.querySelector(".forecastIcon3").src =
      "https://openweathermap.org/img/wn/" + forecastIcon3 + ".png";
    // document.querySelector(".forecastDescription").innerText = description;
    document.querySelector(".forecastTemp3").innerText = forecastTemp3 + "°F";
    document.querySelector(".forecastHumidity3").innerText =
      "Humidity: " + forecastHumidity3 + "%";
    document.querySelector(".forecastWind3").innerText =
      "Wind speed: " + forecastSpeed3 + " km/h";
    // document.querySelector(".forecastWeather3").classList.remove("loading");
    
    const date4 = filteredData[4].dt_txt;
    const forecastTemp4 = filteredData[4].main.temp;
    const forecastHumidity4 = filteredData[4].main.humidity;
    const forecastIcon4 = filteredData[4].weather[0].icon;
    const forecastDescription4 = filteredData[4].weather[0].description;
    const forecastSpeed4 = filteredData[4].wind.speed
    document.querySelector(".forecastDate4").innerText = date4;
    document.querySelector(".forecastIcon4").src =
      "https://openweathermap.org/img/wn/" + forecastIcon4 + ".png";
    // document.querySelector(".forecastDescription").innerText = description;
    document.querySelector(".forecastTemp4").innerText = forecastTemp4 + "°F";
    document.querySelector(".forecastHumidity4").innerText =
      "Humidity: " + forecastHumidity4 + "%";
    document.querySelector(".forecastWind4").innerText =
      "Wind speed: " + forecastSpeed4 + " km/h";
    // document.querySelector(".forecastWeather4").classList.remove("loading");

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
  // searchInput.value = "";

  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}



searchBtn.addEventListener("click", weather.fetchWeather, weatherForecast.fetchWeatherForecast);




renderSavedSearches();
clearBtn.addEventListener("click", )
