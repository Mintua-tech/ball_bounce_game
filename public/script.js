const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ball = {
  x: 300,
  y: 200,
  radius: 20,
  dx: 2,  // Horizontal velocity
  dy: -2, // Vertical velocity
  color: 'blue'
};

// Game state
let isGameRunning = false;
let gravity = 0.1;
let friction = 0.98;

// Control buttons
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const speedUpBtn = document.getElementById('speedUpBtn');
const slowDownBtn = document.getElementById('slowDownBtn');
const reverseBtn = document.getElementById('reverseBtn');

// Draw ball on the canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Update ball position and physics
function updateBall() {
  if (!isGameRunning) return;

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball collision with the walls
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.radius > canvas.height) {
    ball.dy = -ball.dy * friction; // Bounce with friction
    ball.y = canvas.height - ball.radius; // Ensure it stays within bounds
  }

  // Gravity effect
  if (ball.y + ball.radius < canvas.height) {
    ball.dy += gravity;
  }

  // Redraw the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
}

// Game loop
function gameLoop() {
  updateBall();
  requestAnimationFrame(gameLoop);
}

// Start Game
startBtn.addEventListener('click', () => {
  if (!isGameRunning) {
    isGameRunning = true;
    gameLoop();
  }
});

// Stop Game
stopBtn.addEventListener('click', () => {
  isGameRunning = false;
});

// Speed Up
speedUpBtn.addEventListener('click', () => {
  ball.dx *= 1.1;  // Increase horizontal speed by 10%
  ball.dy *= 1.1;  // Increase vertical speed by 10%
});

// Slow Down
slowDownBtn.addEventListener('click', () => {
  ball.dx *= 0.9;  // Decrease horizontal speed by 10%
  ball.dy *= 0.9;  // Decrease vertical speed by 10%
});

// Reverse
reverseBtn.addEventListener('click', () => {
  ball.dx = -ball.dx; // Reverse horizontal direction
  ball.dy = -ball.dy; // Reverse vertical direction
});
