const apiKey = "7aa81f3aabe0170687cfbaeceda19e89";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);
    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
    let weatherCondition = data.weather[0].main.toLowerCase();
    let weatherImage = {
      clouds: "images/clouds.png",
      clear: "images/clear.png",
      rain: "images/rain.png",
      drizzle: "images/drizzle.png",
      mist: "images/mist.png"
    };

    weatherIcon.src = weatherImage[weatherCondition] || "images/default.png";
    
    card.className = "card " + weatherCondition;

  } catch (error) {
    alert(error.message);
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name");
  }
});
