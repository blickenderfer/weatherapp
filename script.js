var searchButton = document.querySelector(".searchbutton");


var key = `d683b62b0b9c10152093f231d0b476d6`

function getWeather(city) {
    document.querySelector(".local-forecast").classList.remove("hidden");
    document.querySelector(".forecast-grid").classList.remove("hidden");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var pic = data.weather[0].icon;
            getForecast(lat, lon);
            document.querySelector(".city-name").textContent = data.name;
            document.querySelector(".temp").textContent = "Temp: " + data.main.temp + "F";
            document.querySelector(".wind").textContent = "Wind: " + data.wind.speed + "MPH";
            document.querySelector(".humidity").textContent = "Humidity: " + data.main.humidity + "%";
            document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${pic}@2x.png`);

        })
}


function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            document.querySelector(".forecast-grid").innerHTML = ""
            for (let i = 0; i < data.list.length; i++) {
                const element = data.list[i];
                if (element.dt_txt.includes("12:00:00")) {
                    var forecastCard = document.createElement("div")
                    forecastCard.setAttribute("class", "forecast-card")
                    var cardBody = document.createElement("div")
                    var date = document.createElement("h5")
                    var pic = data.list[i].weather[0].icon;
                    date.textContent = element.dt_txt.split(" ")[0]
                    cardBody.append(date);
                    forecastCard.append(cardBody);

                    document.querySelector(".forecast-grid").append(forecastCard);
                    console.log(data.list[0].main.temp);

                    var temp = document.createElement("p");
                    temp.textContent = data.list[i].main.temp;
                    cardBody.append(temp);

                    var wind = document.createElement("p");
                    wind.textContent = data.list[i].wind.speed;
                    cardBody.append(wind);

                    var humidity = document.createElement("p");
                    humidity.textContent = data.list[i].main.humidity;
                    cardBody.append(humidity);

                    var icon = document.createElement("img");
                    icon.setAttribute("src", `http://openweathermap.org/img/wn/${pic}@2x.png`);
                    cardBody.append(icon);
                }
            }

        })

}


searchButton.addEventListener("click", function () {
    var cityName = document.querySelector(".search").value
    getWeather(cityName);
    const array = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!array.includes(cityName)) {
        array.push(cityName);
    }
    localStorage.setItem("searchHistory", JSON.stringify(array));
});

var searchBar = document.querySelector(".searchbar");

function renderCityHistory() {
    var cityHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    console.log(cityHistory);
    for (i = 0; i < cityHistory.length; i++) {
        var cityButton = document.createElement("button");
        cityButton.setAttribute("class", "city-btn");
        cityButton.textContent = cityHistory[i];
        cityButton.setAttribute("onclick", `getWeather('${cityHistory[i]}')`);
        searchBar.appendChild(cityButton);
    }
}
renderCityHistory();