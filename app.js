const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const resetButton = document.getElementById("resetButton");
let isOturn;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
startGame();
function startGame() {
  isOturn = false;
  cells.forEach((cell) => {
    cell.classList.remove("X");
    cell.classList.remove("O");
    cell.innerHTML = "";
    cell.removeEventListener("click", handleClick);
    showTurns("X's turn.");
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentPlayer = isOturn ? "O" : "X";
  markCell(cell, currentPlayer);

  if (checkWin(currentPlayer)) {
    showTurns(`${currentPlayer} wins the game.`);
  } else if (isDraw()) {
    showTurns("It's a draw! No one wins the game!");
  } else {
    swapTurns();
    showTurns(isOturn ? "O's turn." : "X's turn.");
  }
}

function markCell(cell, currentPlayer) {
  cell.classList.add(currentPlayer);
  cell.innerHTML = currentPlayer;
}

function showTurns(currentPlayer) {
  document.getElementById("turn").innerHTML = currentPlayer;
}

function swapTurns() {
  isOturn = !isOturn;
}
function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
}

function checkWin(currentPlayer) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

resetButton.addEventListener("click", startGame);
