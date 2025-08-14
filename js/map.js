//Update map
export function updateMap(lat, lon) {
  const iframe = document.querySelector(".map iframe");
  iframe.src = `https://www.google.com/maps?q=${lat},${lon}&z=7&output=embed`;
}
