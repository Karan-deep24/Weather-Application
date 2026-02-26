const apikey="184c5ed57663a2b6281d4c3ec435544e";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox=document.querySelector(".search input");                                  //used for getting value from input box
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather img"); // image inside .weather

async function CheckWeather(city) { // async function showing loading to user until data is fetched from api
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none"; // hide previous data
        return;
    }

    const data = await response.json(); // convert json to object

    document.querySelector(".error").style.display = "none";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    // set weather icon based on the returned condition
    const condition = data.weather[0].main;
    if (condition == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (condition == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition == "Mist") {
        weatherIcon.src = "images/mist.png";
    } else {
        weatherIcon.src = ""; // fallback or hide
    }

    document.querySelector(".weather").style.display = "block"; // show weather block
}

searchBtn.addEventListener("click", () => {
    CheckWeather(searchBox.value);
});
