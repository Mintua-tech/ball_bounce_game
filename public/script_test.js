
const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        let ball = {
            x: 150,
            y: 150,
            radius: 20,
            dx: 2,
            dy: -2,
            color: 'blue'
        };

        let isGameRunning = false;
        let gravity = 0.1;
        let friction = 0.98;

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            drawBall();
        }

        function drawBall() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.closePath();
        }

        function updateBall() {
            if (!isGameRunning) return;

            ball.x += ball.dx;
            ball.y += ball.dy;

            // Ball collision with the walls
            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                ball.dx = -ball.dx;
            }
            if (ball.y + ball.radius > canvas.height) {
                ball.dy = -ball.dy * friction;
                ball.y = canvas.height - ball.radius;
            }

            // Gravity effect
            if (ball.y + ball.radius < canvas.height) {
                ball.dy += gravity;
            }

            drawBall();
        }

        function gameLoop() {
            updateBall();
            requestAnimationFrame(gameLoop);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        document.getElementById('start').addEventListener('click', () => {
            if (!isGameRunning) {
                isGameRunning = true;
                gameLoop();
            }
        });
        document.getElementById('stop').addEventListener('click', () => { isGameRunning = false; });
        document.getElementById('speedUp').addEventListener('click', () => {
            ball.dx *= 1.1;
            ball.dy *= 1.1;
        });
        document.getElementById('slowDown').addEventListener('click', () => {
            ball.dx *= 0.9;
            ball.dy *= 0.9;
        });
        document.getElementById('reverse').addEventListener('click', () => {
            ball.dx = -ball.dx;
            ball.dy = -ball.dy;
        });

// WebSocket connection
const ws = new WebSocket('wss://bouncing-ball-pro.glitch.me/');
ws.onmessage = (event) => {
    const { command } = JSON.parse(event.data);
    if (command === 'start') {if (!isGameRunning) {
        isGameRunning = true;
        gameLoop();
    }}
    else if (command === 'stop') isGameRunning = false;
    else if (command === 'speed_up') {
        ball.dx *= 1.1;
        ball.dy *= 1.1;
    }
    else if (command === 'slow_down') {
        ball.dx *= 1.1;
        ball.dy *= 1.1;
    }
    else if (command === 'reverse') {
        ball.dx = -ball.dx;
        ball.dy = -ball.dy;
    }
};

drawBall();