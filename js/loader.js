//Loading screen
export function loader() {
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
    }, 1500);
  });
}
