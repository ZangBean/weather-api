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

function startSnow() {
  if (!snowInterval) {
    snowInterval = setInterval(createSnowflake, 100);
    animate();
  }
}

function stopSnow() {
  if (snowInterval) {
    clearInterval(snowInterval);
    snowInterval = null;
    snowflakes.length = 0;
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  }
}

// Create wind
const canvas = document.getElementById("windCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Leaf {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 15 + 10; // Leaf size
    this.speedX = Math.random() * 3 + 1; // Wind speed
    this.speedY = Math.random() * 0.5 - 0.25; // Slight vertical variation
    this.opacity = Math.random() * 0.5 + 0.5;
    this.rotation = Math.random() * Math.PI * 2; // Random rotation
    this.rotationSpeed = Math.random() * 0.03 - 0.015; // Rotation speed
    this.flip = Math.random() < 0.5 ? 1 : -1; // Random flip for variety
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY + Math.sin(Date.now() * 0.001 + this.x) * 0.5; // Wavy motion
    this.rotation += this.rotationSpeed;
    // Reset leaf when it goes off screen
    if (this.x > canvas.width + this.size) {
      this.x = -this.size;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 15 + 10;
      this.speedX = Math.random() * 3 + 1;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.rotation = Math.random() * Math.PI * 2;
      this.flip = Math.random() < 0.5 ? 1 : -1;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.flip, 1); // Flip some leaves horizontally
    ctx.fillStyle = `rgba(34, 139, 34, ${this.opacity})`; // Green leaf color
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      this.size * 0.2,
      -this.size * 0.4, // Control point 1
      this.size * 0.8,
      -this.size * 0.4, // Control point 2
      this.size,
      0 // End point (tip of leaf)
    );
    ctx.bezierCurveTo(
      this.size * 0.8,
      this.size * 0.4, // Control point 3
      this.size * 0.2,
      this.size * 0.4, // Control point 4
      0,
      0 // Back to start
    );
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.size * 0.9, 0);
    ctx.strokeStyle = `rgba(0, 100, 0, ${this.opacity})`; // Darker green vein
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }
}

const leavesArray = [];
const numberOfLeaves = 20;
let animationFrame;

for (let i = 0; i < numberOfLeaves; i++) {
  leavesArray.push(new Leaf());
}

function startWind() {
  if (!animationFrame) {
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leavesArray.forEach((leaf) => {
        leaf.update();
        leaf.draw();
      });
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
  }
}

function stopWind() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

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
