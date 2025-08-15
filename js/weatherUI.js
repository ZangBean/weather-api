export function renderWeatherUI(data) {
  const resultDiv = document.getElementById("result");
  const { main, weather, name, wind, visibility } = data;

  let km;
  if (visibility % 1000 === 0) {
    km = visibility / 1000 + " km";
  } else {
    km = visibility + " m";
  }

  resultDiv.innerHTML = `
    <h3>Thời tiết tại ${name}</h3>
    <div><img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="icon thời tiết"></div>
    <table class="weather-table" border="1">
      <tr>
        <th>Thông tin</th>
        <th>Giá trị</th>
      </tr>
      <tr>
        <td>
          <i class="fa-solid fa-book"></i>
          <strong>Mô tả</strong>
        </td>
        <td>${weather[0].description}</td>
      </tr>
      <tr>
        <td>
          <i class="fa-solid fa-temperature-high"></i>
          <strong>Nhiệt độ</strong>
        </td>
        <td>${main.temp}°C</td>
      </tr>
      <tr>
        <td>
          <i class="fa-solid fa-droplet"></i>
          <strong>Độ ẩm</strong>
        </td>
        <td>${main.humidity}%</td>
      </tr>
      <tr>
        <td>
          <i class="fa-solid fa-wind"></i>
          <strong>Tốc độ gió</strong>
        </td>
        <td>${wind.speed} m/s</td>
      </tr>
      <tr>
        <td>
          <i class="fa-regular fa-eye"></i>
          <strong>Tầm nhìn xa</strong>
        </td>
        <td>${km}</td>
      </tr>
    </table>
  `;
}

export function renderErrorUI(error) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p class="err">${error.message}</p>`;
}
