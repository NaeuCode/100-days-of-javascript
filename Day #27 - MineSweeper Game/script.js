/** @format */

const grid = document.getElementById("grid");
let lockGame = false;
const testMode = false;

generateGrid();

// Generate the Game grid
function generateGrid() {
  lockGame = false;
  grid.innerHTML = "";

  // Create a 10x10 grid
  for (let i = 0; i < 10; i++) {
    const row = grid.insertRow(i);
    for (let j = 0; j < 10; j++) {
      const cell = row.insertCell(j);
      cell.addEventListener("click", () => init(cell)); // Add click event listener to each cell
      cell.dataset.mine = "false"; // set Custom data attribute "mine" to false (no mine)
    }
  }
  generateMines(); //Call Function to randomly generate mines
}

// Generate Random mines
function generateMines() {
  for (let i = 0; i < 20; i++) {
    const row = Math.floor(Math.random() * 10); // Generate a random row index (0-9)
    const col = Math.floor(Math.random() * 10); // Generate a random column index (0-9)
    const cell = grid.rows[row].cells[col];
    cell.dataset.mine = "true";
    if (testMode) {
      cell.innerHTML = "X";
    }
  }
}

// Reveal all mines on the Grid
function revealMines() {
  grid.querySelectorAll("[data-mine='true']").forEach((cell) => {
    cell.classList.add("mine");
  });
}

// Check if the game is complete (all non-mine cells revealed)
function checkGameComplete() {
  const cells = grid.querySelectorAll("td");
  const gameComplete = [...cells].every((cell) => {
    return (
      (cell.dataset.mine === "true" && cell.classList.contains("mine")) ||
      (cell.dataset.mine === "false" && cell.innerHTML !== "")
    );
  });

  if (gameComplete) {
    alert("You Found All Mines!");
    revealMines();
  }
}

function init(cell) {
  if (lockGame) {
    return;
  }

  if (cell.dataset.mine === "true") {
    revealMines();
    lockGame = true;
  } else {
    cell.classList.add("active");

    const mineCount = getMineCount(cell);
    cell.innerHTML = mineCount || "0"; //Display mine count or empty string if zero

    if (mineCount === 0) {
      const cellRow = cell.parentNode.rowIndex;
      const cellCol = cell.cellIndex;

      // loop through neighboring cells and recursively reveal them
      for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1,9); i++){
        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol +1, 9); j++){
          if(neighborCell.innerHTML === "");
        }
      }
    }

    checkGameComplete(); //Check if the Game is complete
  }
}

// Calculate the number of adjacent mines for given cell
function getMineCount(cell) {
  const cellRow = cell.parentNode.rowIndex;
  const cellCol = cell.cellIndex;
  let mineCount = 0;

  for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++){
    for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol +1, 9); j++){
      const neighborCell = grid.rows[i].cells[j];
      if (neighborCell.dataset.mine === "true") {
        mineCount++;
      }
    }
  }
  return mineCount;
}