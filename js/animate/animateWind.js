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

let animationFrame;
export function startWind() {
  const leavesArray = [];
  const numberOfLeaves = 20;

  for (let i = 0; i < numberOfLeaves; i++) {
    leavesArray.push(new Leaf());
  }

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

export function stopWind() {
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
