const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreElement = document.getElementById('score');
let score = 0;
let isJumping = false;

document.addEventListener('keydown', jump);

function jump(e) {
  if (e.key === ' ' && !isJumping) {
    isJumping = true;
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
      const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
      if (playerBottom < 250 && jumpCount < 15) {
        player.style.bottom = (playerBottom + 15) + 'px';
      } else if (jumpCount >= 15 && playerBottom >= 10) {
        player.style.bottom = (playerBottom - 15) + 'px';
      } else {
        clearInterval(jumpInterval);
        isJumping = false;
      }
      jumpCount++;
    }, 20);
    increaseScore();
  }
}

function increaseScore() {
  score++;
  scoreElement.textContent = score;
}

setInterval(moveObstacle, 12);

function moveObstacle() {
  let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
  obstacle.style.right = (obstacleRight + 10) + 'px';

  if (obstacleRight > window.innerWidth) {
    obstacle.style.right = '10px';
  }

  checkCollision();
}

function checkCollision() {
  let playerRect = player.getBoundingClientRect();
  let obstacleRect = obstacle.getBoundingClientRect();

  if (
    playerRect.bottom >= obstacleRect.top &&
    playerRect.top <= obstacleRect.bottom &&
    playerRect.right >= obstacleRect.left &&
    playerRect.left <= obstacleRect.right
  ) {
    endGame();
  }
}

function endGame() {
  alert('Game Over! Score: ' + score);
  score = 0;
  scoreElement.textContent = score;
  player.style.bottom = '10px';
  obstacle.style.right = '10px';
}

function restartGame() {
  score = 0;
  scoreElement.textContent = score;
  player.style.bottom = '10px';
  obstacle.style.right = '0px';
}

window.addEventListener('DOMContentLoaded', () => {
  const okButton = document.querySelector('.swal-button--confirm');
  if (okButton) {
    okButton.addEventListener('click', restartGame);
  }
});