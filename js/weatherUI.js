export function renderWeatherUI(data) {
  const resultDiv = document.getElementById("result");
  const { main, weather, name, wind, visibility } = data;

  resultDiv.innerHTML = `
    <h3>Thời tiết tại ${name}</h3>
    <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="icon thời tiết">
    <table class="weather-table" border="1">
      <tr>
        <th>Thông tin</th>
        <th>Giá trị</th>
      </tr>
      <tr>
        <td><strong>Mô tả</strong></td>
        <td>${weather[0].description}</td>
      </tr>
      <tr>
        <td><strong>Nhiệt độ</strong></td>
        <td>${main.temp}°C</td>
      </tr>
      <tr>
        <td><strong>Độ ẩm</strong></td>
        <td>${main.humidity}%</td>
      </tr>
      <tr>
        <td><strong>Tốc độ gió</strong></td>
        <td>${wind.speed} m/s</td>
      </tr>
      <tr>
        <td><strong>Hướng gió</strong></td>
        <td>${wind.deg}°</td>
      </tr>
      <tr>
        <td><strong>Gió giật</strong></td>
        <td>${wind.gust} m/s</td>
      </tr>
      <tr>
        <td><strong>Tầm nhìn xa</strong></td>
        <td>${visibility} m</td>
      </tr>
    </table>
  `;
}

export function renderErrorUI(error) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p style="color:red; height:0;">${error.message}</p>`;
}
