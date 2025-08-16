// Create Snow flake
let snowInterval;
const snowCanvas = document.getElementById("snowCanvas");
const snowCtx = snowCanvas.getContext("2d");

function resizeCanvas() {
  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Snowflake {
  constructor() {
    this.x = Math.random() * snowCanvas.width;
    this.y = 0;
    this.wind = (Math.random() * 10 - 5) * (snowCanvas.width / 100);
    this.speed = Math.random() * 4 + 4;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.size = Math.random() * 10 + 10;
  }

  update(deltaTime) {
    this.y += this.speed * deltaTime * 10;
    this.x += this.wind * deltaTime;
  }

  draw() {
    snowCtx.beginPath();
    snowCtx.globalAlpha = this.opacity;
    snowCtx.font = `${this.size}px serif`;
    snowCtx.fillText("❄", this.x, this.y);
    snowCtx.fillStyle = "white";
    snowCtx.closePath();
  }
}

const snowflakes = [];

function createSnowflake() {
  snowflakes.push(new Snowflake());
}

function animate() {
  snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  const deltaTime = 1 / 60;
  snowflakes.forEach((snowflake, index) => {
    snowflake.update(deltaTime);
    snowflake.draw();
    if (snowflake.y > snowCanvas.height) {
      snowflakes.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

export function startSnow() {
  if (!snowInterval) {
    snowInterval = setInterval(createSnowflake, 100);
    animate();
  }
}

export function stopSnow() {
  if (snowInterval) {
    clearInterval(snowInterval);
    snowInterval = null;
    snowflakes.length = 0;
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  }
}
