import { getWeather } from "./main.js";

// Save search history to localStorage
export function saveSearchHistory(city) {
  let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

  const normalizeString = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  history = history.filter(
    (item) => normalizeString(item) !== normalizeString(city)
  );
  history.unshift(city);

  if (history.length > 10) history.pop();

  localStorage.setItem("weatherHistory", JSON.stringify(history));
}

// Render search history from localStorage
export function renderHistory() {
  const historyContainer = document.getElementById("historyList");
  if (!historyContainer) return;

  const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
  historyContainer.innerHTML = "";

  history.forEach((city, index) => {
    const li = document.createElement("li");
    const spanCity = document.createElement("span");
    spanCity.textContent = city;
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      document.getElementById("cityInput").value = city;
      getWeather();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteHistory(index);
    });

    li.appendChild(spanCity);
    li.appendChild(deleteBtn);
    historyContainer.appendChild(li);
  });
}

// Clear search history
function deleteHistory(index) {
  let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
  history.splice(index, 1);
  localStorage.setItem("weatherHistory", JSON.stringify(history));
  renderHistory();
}
