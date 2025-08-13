//Loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.classList.add("hidden");
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.classList.add("visible");
    }
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 2000);
});

//Handle Enter key for input
document.getElementById("cityInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    getWeather();
  }
});

// Create Snow flake
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.innerHTML = "❄";

  const startX = Math.random() * 100;
  const wind = Math.random() * 10 - 5;
  const endX = Math.min(100, Math.max(0, startX + wind));

  snowflake.style.setProperty("--startX", startX + "vw");
  snowflake.style.setProperty("--endX", endX + "vw");
  snowflake.style.animationDuration = Math.random() * 4 + 4 + "s";
  snowflake.style.opacity = Math.random() * 0.5 + 0.5;
  snowflake.style.fontSize = Math.random() * 10 + 8 + "px";

  const snow = document.querySelector(".snow");
  snow.appendChild(snowflake);

  snowflake.addEventListener("animationend", () => {
    snowflake.remove();
  });
}

//Update background
let snowInterval;
function updateWeatherUI(temp) {
  const container = document.querySelector(".container");

  if (snowInterval) {
    clearInterval(snowInterval);
    snowInterval = null;
    document.querySelectorAll(".snowflake").forEach((flake) => flake.remove());
  }

  if (temp > 27) {
    container.style.background =
      "linear-gradient(to bottom, #ff5353ff, #f0f8ff)";
  } else if (temp > 10) {
    container.style.background = "linear-gradient(to bottom, #87ceeb, #f0f8ff)";
  } else {
    container.style.background =
      "linear-gradient(to bottom, #371b99ff, #f0f8ff)";
    snowInterval = setInterval(createSnowflake, 200);
  }
}

//Update time
let localTime;
let timer;
function updateTime(localTime) {
  clearInterval(timer);
  timer = setInterval(() => {
    localTime.setSeconds(localTime.getSeconds() + 1);

    const dateStr = localTime.toLocaleDateString("vi-VN");
    const timeStr = localTime.toLocaleTimeString("vi-VN", {
      hour12: false,
    });

    document.getElementById("date").innerText = "Ngày:" + dateStr + " - ";
    document.getElementById("time").innerText = timeStr;
  }, 1000);
}

//Update map
function updateMap(lat, lon) {
  const iframe = document.querySelector(".map iframe");
  iframe.src = `https://www.google.com/maps?q=${lat},${lon}&z=7&output=embed`;
}

//Weather API
function getWeather() {
  const apiKey = "2e88e4d878504ff6fb17d0de34ec9a3c";
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("result");
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
        const humidity = data.main.humidity;
        const desc = data.weather[0].description;
        const img = data.weather[0].icon;
        const name = data.name;
        const lon = data.coord.lon;
        const lat = data.coord.lat;
        const speed = data.wind.speed;
        const deg = data.wind.deg;
        const gust = data.wind.gust;
        const visibility = data.visibility;

        //Update time
        const utc =
          new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        localTime = new Date(utc + data.timezone * 1000);

        updateTime(localTime);

        //Update background
        updateWeatherUI(temp);

        //Update map
        updateMap(lat, lon);

        //Update data
        resultDiv.innerHTML = `
        <h3>Thời tiết tại ${name}</h3>
        <img src="http://openweathermap.org/img/wn/${img}@2x.png" alt="icon thời tiết">
        <table class="weather-table" border="1">
          <tr>
            <th>Thông tin</th>
            <th>Giá trị</th>
          </tr>
          <tr>
            <td><strong>Mô tả</strong></td>
            <td>${desc}</td>
          </tr>
          <tr>
            <td><strong>Nhiệt độ</strong></td>
            <td>${temp}°C</td>
          </tr>
          <tr>
            <td><strong>Độ ẩm</strong></td>
            <td>${humidity}%</td>
          </tr>
          <tr>
            <td><strong>Tốc độ gió</strong></td>
            <td>${speed} m/s</td>
          </tr>
          <tr>
            <td><strong>Hướng gió</strong></td>
            <td>${deg}°</td>
          </tr>
          <tr>
            <td><strong>Gió giật</strong></td>
            <td>${gust} m/s</td>
          </tr>
          <tr>
            <td><strong>Tầm nhìn xa</strong></td>
            <td>${visibility} m</td>
          </tr>
        </table>
      `;
      })
      .catch((error) => {
        resultDiv.innerHTML = `<p style="color:red">${error.message}</p>`;
      })
      .finally(() => {
        button.innerText = "Xem thời tiết";
        button.disabled = false;
      });
  }, 1000);
}
