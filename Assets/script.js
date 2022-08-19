localStorage.clear()

let searchHistory = document.getElementById('searchHistory')
let searchList = document.getElementById('searchList')
let ul = document.getElementById('searchList')
let first = document.getElementById('search1')
let second = document.getElementById('search2')
let third = document.getElementById('search3')
let fourth = document.getElementById('search4')
let fifth = document.getElementById('search5')
let sixth = document.getElementById('search6')
let clear = document.getElementById('clear')

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
        .addEventListener("click", function (){
           weather.search();
        });

        function storeSearch(){
            let allSearches = JSON.parse(localStorage.getItem('allSearches'));

            if (allSearches === null) allSearches = [];
            previousSearch = localStorage.getItem('search')
            let stored = {
                search: previousSearch
            }
            localStorage.setItem('stored', JSON.stringify(stored))
            allSearches.push(stored)
            localStorage.setItem('allSearches', JSON.stringify(allSearches))
        }

    

