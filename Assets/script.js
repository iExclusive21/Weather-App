// localStorage.clear()

const searchForm = document.querySelector("#search-form")
const searchInput = document.querySelector('search-text')
const recentSearches = document.querySelector("#recentSearches")
const searchCountSpan = document.querySelector("#searchCount")

const searchHistory = [];

// Renders items in a list as <li> elements
function renderSearchesFunction() {
  //Clears list
  recentSearches.innerHTML = "";
  searchCountSpan.textContent = searchHistory.length;

  for (let i = 0; i < searchHistory.length; i++) {
    let searchHistories = searchHistory[i];

    let li = document.createElement("li")
    li.textContent = searchHistories;
    li.setAttribute("data-index", i)

    let button = document.createElement("button");
    button.textContent = "Complete"

    li.appendChild(button);
    recentSearches.appendChild(li);
  }
}

function init() {
  let storedSearches = JSON.parse(localStorage.getItem("searchHistory"))

  if (storedSearches !== null) {
    searchHistory = storedSearches;
  }
  renderSearchesFunction();
}

function storedSearches() {
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

searchForm.addEventListener("submit", function(event){
  event.preventDefault();

  let searchText = searchInput.value.trim();

  if (searchText === "") {
    return;
  }
    searchHistory.push(searchText);
    searchInput.value = "";
  
    storedSearches();
    renderSearchesFunction();

});


recentSearches.addEventListener('click', function(event){
  let element = event.target;

  if(element.matches("button") === true) {
    let index = element.parentElement.getAttribute("data-index");
    searchHistory.splice(index, 1);

    storedSearches();
    renderSearchesFunction(); 
  }
});


init()



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
  .addEventListener("click", function () {
    weather.search();
    storedSearches()
    renderSearchesFunction()
  });

