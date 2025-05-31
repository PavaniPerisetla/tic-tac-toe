const welcomePage = document.getElementById('welcome-page');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');

startBtn.addEventListener('click', () => {
  welcomePage.style.display = 'none';
  gameContainer.style.display = 'flex';
  initializeGameStatus();
});

const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let board = Array(9).fill('');
let isGameOver = false;

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'draw';
}

function handleClick(e) {
  const idx = +e.target.dataset.index;
  if (board[idx] || isGameOver) return;
  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  const winner = checkWinner();
  if (winner) {
    isGameOver = true;
    if (winner === 'draw') {
      statusDiv.textContent = "It's a draw!";
    } else {
      statusDiv.textContent = `Player ${winner} wins!`;
    }
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function restartGame() {
  board = Array(9).fill('');
  isGameOver = false;
  currentPlayer = 'X';
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

function initializeGameStatus() {
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}