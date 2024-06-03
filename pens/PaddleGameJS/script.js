const gameContainer = document.getElementById('game-container');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const startButton = document.getElementById('start-button');
const gameOverMessage = document.getElementById('game-over-message');
const finalScoreDisplay = document.getElementById('final-score');

let paddleX = (gameContainer.clientWidth - paddle.clientWidth) / 15;
let ballX = Math.random() * (gameContainer.clientWidth - ball.clientWidth);
let ballY = 0;
let ballSpeedY = 2;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

highScoreDisplay.textContent = `High Score: ${highScore}`;

document.addEventListener('mousemove', (e) => {
    movePaddle(e.clientX - gameContainer.getBoundingClientRect().left);
});

document.addEventListener('touchmove', (e) => {
    movePaddle(e.touches[0].clientX - gameContainer.getBoundingClientRect().left);
});

function movePaddle(x) {
    paddleX = x - paddle.clientWidth / 15;
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddle.clientWidth > gameContainer.clientWidth + 150) {
        paddleX = gameContainer.clientWidth + 150 - paddle.clientWidth;
    }
    paddle.style.left = `${paddleX}px`;
}

function updateBall() {
    ballY += ballSpeedY;
    if (ballY + ball.clientHeight > gameContainer.clientHeight) {
        if (ballX + ball.clientWidth + 45 > paddleX && ballX < paddleX + paddle.clientWidth - 50) {
            paddle.style.backgroundColor = '#bbff00';
            ballY = 0;
            ballX = Math.random() * (gameContainer.clientWidth - ball.clientWidth);
            score++;
            ballSpeedY += 0.5;
            scoreDisplay.textContent = `Score: ${score}`;
            if (score > highScore) {
                localStorage.setItem('highScore', score);
            }
            setTimeout(() => { paddle.style.backgroundColor = '#ff6347'; }, 100);
        } else {
            gameOver();
        }
    }
    ball.style.top = `${ballY}px`;
    ball.style.left = `${ballX}px`;
}

function gameOver() {
    gameRunning = false;
    gameContainer.style.cursor = 'default';
    gameOverMessage.style.display = 'block';
    finalScoreDisplay.textContent = score > highScore ? ` Congratulations You Beat The High Score Of ${highScore} by ${score - highScore} Points Your Final Score: ${score}` : `Your Final Score: ${score}`;
    if (score > highScore) {
        highScore = score;
    }
    highScoreDisplay.textContent = `High Score: ${highScore}`;
    startButton.style.display = 'block';
    startButton.innerHTML = 'Restart Game';
    resetGame();
}

function resetGame() {
    ballY = 0;
    ballX = Math.random() * (gameContainer.clientWidth - ball.clientWidth);
    ballSpeedY = 2;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
}

function gameLoop() {
    updateBall();
    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

let gameRunning = false;

startButton.addEventListener('click', () => {
    if (!gameRunning) {
        highScore = localStorage.getItem('highScore') || 0;
        gameRunning = true;
        gameContainer.style.cursor = 'none';
        gameOverMessage.style.display = 'none';
        startButton.style.display = 'none';
        gameLoop();
    }
});
