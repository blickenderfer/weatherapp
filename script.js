//placeholder for the blank space the search is entered and the data comes up
//use local storage to create a city search history that be visible as buttons in the header or footer
//responsive css
//


var searchButton = document.querySelector(".searchbutton");


var key = `d683b62b0b9c10152093f231d0b476d6`

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            getForecast(lat, lon);
            document.querySelector(".city-name").textContent = data.name;
            document.querySelector(".temp").textContent = "Temp: " + data.main.temp + "F";
            document.querySelector(".wind").textContent = "Wind: " + data.wind.speed + "MPH"; 
            document.querySelector(".humidity").textContent = "Humidity: " + data.main.humidity + "%";
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
                    date.textContent = element.dt_txt.split(" ")[0]
                    cardBody.append(date); //add weather conditions to this 
                    forecastCard.append(cardBody);
                    document.querySelector(".forecast-grid").append(forecastCard); //data.list[0].main.temp
                    console.log(data.list[0].main.temp);
                    var temp = document.createElement("p");
                    temp.textContent = data.list[i].main.temp;
                    cardBody.append(temp);
                }
            }

        })

}

//when creating search history, create new button with previously searched city

//event listener for search button
//take value from input 
//call first function for fetching weather
//get localstorage item and push the item from the input 

//event listener, target will match class of city, 
//call first function to pass the city name 
searchButton.addEventListener("click", function (event) {
    event.preventDefault()
    // if (event.target && event.target.matches(".city")){
    //     //call function for fetching weather
    // }
    document.querySelector(".local-forecast").classList.remove("hidden");
    document.querySelector(".forecast-grid").classList.remove("hidden");
    //use above line to hide introduction message 
    var cityName = document.querySelector(".search").value
    getWeather(cityName);

    //                          ["Boston"]
    const array = JSON.parse(localStorage.getItem("searchHistory")) || [];
    
    array.push(cityName);
    // array: ["Boston", "Chicago"]

    localStorage.setItem("searchHistory", JSON.stringify(array));

});

var searchBar = document.querySelector(".searchbar");

function renderCityHistory(){
    var cityHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    // cityHistory: ["Boston", "Chicago"]
    for (i = 0; i < cityHistory.length; i++){
        var cityButton = document.createElement("button");
        cityButton.setAttribute("class", "city-btn"); 
        cityButton.textContent(cityHistory[i]);
        searchBar.appendChild(cityButton);
        //add event listener within loop for each button
    }
}
