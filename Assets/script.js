localStorage.clear()


const searchInput = document.getElementById('search')
const searchList = document.getElementById('searchList')
const ul = document.getElementById('searchList')
const firstSearch = document.getElementById('firstSearch')
const secondSearch = document.getElementById('secondSearch')
const thirdSearch = document.getElementById('thirdSearch')
const fourthSearch = document.getElementById('fourthSearch')
const fifthSearch = document.getElementById('fifthSearch')
const sixthSearch = document.getElementById('sixthSearch')
const clearSearch = document.getElementById('clear')

const searchHistory = [];
const addSearchHistory = (citySearches) => { };

// const createRecentSearchElement = () => {
//   const firstSearch = document.getElementById('firstSearch')
//   // const secondSearch = document.getElementById('secondSearch')
//   // const thirdSearch = document.getElementById('thirdSearch')
//   // const fourthSearch = document.getElementById('fourthSearch')
//   // const fifthSearch = document.getElementById('fifthSearch')
//   // const sixthSearch = document.getElementById('sixthSearch')

//   cityName.innerText = city
//   firstSearch.append(cityName);
// }



let weather = {
  "apiKey": "f433c1e7958c1d2db885ae8ccc58b643",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.getElementById('firstSearch').innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};


document
  .querySelector(".search button")
  .addEventListener("click", function () {
    weather.search();
  });




