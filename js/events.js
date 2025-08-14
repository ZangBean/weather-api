import { getWeather } from "./main.js";

export const Events = {
  init() {
    // Handle click event for button
    document.querySelector(".form-box button").addEventListener("click", () => {
      getWeather();
    });

    // Handle Enter key for input
    document
      .getElementById("cityInput")
      .addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          getWeather();
        }
      });
  },
};
