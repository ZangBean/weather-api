//Update time
let timer;
export function updateTime(localTime) {
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
