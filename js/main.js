import { updateMap } from "./map.js";
import { updateWeatherUI } from "./background.js";
import { loader } from "./loader.js";
import { updateTime } from "./time.js";
import { Events } from "./events.js";
import { renderWeatherUI, renderErrorUI } from "./weatherUI.js";
import { saveSearchHistory, renderHistory } from "./history.js";

//Loading screen
loader();

//Event listeners
Events.init();

//Weather API
export function getWeather() {
  const apiKey = "2e88e4d878504ff6fb17d0de34ec9a3c";
  const city = document.getElementById("cityInput").value.trim();
  const button = document.querySelector(".form-box button");

  button.innerText = "Đang tải...";
  button.disabled = true;

  setTimeout(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Không tìm thấy thành phố!");
        return response.json();
      })
      .then((data) => {
        const temp = data.main.temp;
        const lon = data.coord.lon;
        const lat = data.coord.lat;
        const timezone = data.timezone;

        //Render and save search history
        saveSearchHistory(city);
        renderHistory();

        //Update time
        const utc =
          new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const localTime = new Date(utc + timezone * 1000);
        updateTime(localTime);

        //Update background
        updateWeatherUI(temp);

        //Update map
        updateMap(lat, lon);

        //Render data
        renderWeatherUI(data);
      })
      .catch((error) => {
        renderErrorUI(error);
      })
      .finally(() => {
        button.innerText = "Xem thời tiết";
        button.disabled = false;
      });
  }, 1000);
}
