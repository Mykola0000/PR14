const size = 5;
let board = [];
let timerInterval;
let seconds = 0;
let minutes = 0;
let gameStarted = false;

function initializeBoard() {
    board = [];
    for (let i = 0; i < size; i++) {
        board.push([]);
        for (let j = 0; j < size; j++) {
            board[i].push(Math.round(Math.random()));
        }
    }
}

function renderBoard() {
    const container = document.getElementById('container');
    container.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[i][j] === 1) {
                cell.classList.add('active');
            }
            cell.addEventListener('click', () => {
                if (!gameStarted) {
                    startTimer();
                    gameStarted = true;
                }
                toggleLights(i, j);
                renderBoard();
            });
            container.appendChild(cell);
        }
    }
}

function toggleLights(row, col) {
    board[row][col] = 1 - board[row][col];
    if (row > 0) board[row - 1][col] = 1 - board[row - 1][col];
    if (row < size - 1) board[row + 1][col] = 1 - board[row + 1][col];
    if (col > 0) board[row][col - 1] = 1 - board[row][col - 1];
    if (col < size - 1) board[row][col + 1] = 1 - board[row][col + 1];
}

function startNewGame() {
    clearInterval(timerInterval);
    initializeBoard();
    renderBoard();
    seconds = 0;
    minutes = 0;
    updateTimer();
    gameStarted = false;
}

function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    const timeDisplay = document.getElementById('time');
    timeDisplay.textContent = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

initializeBoard();
renderBoard();
