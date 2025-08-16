import { startWind, stopWind } from "./animateWind.js";
import { startSnow, stopSnow } from "./animateSnow.js";

// Update background
export function updateWeatherUI(temp) {
  const container = document.querySelector(".container");
  stopSnow();
  stopWind();

  if (temp > 30) {
    container.style.background = "linear-gradient(to bottom, #ff5353, #f0f8ff)";
  } else if (temp > 0) {
    container.style.background = "linear-gradient(to bottom, #87ceeb, #f0f8ff)";
    startWind();
  } else {
    container.style.background = "linear-gradient(to bottom, #371b99, #f0f8ff)";
    startSnow();
  }
}
