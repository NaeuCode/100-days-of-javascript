let btnRef = document.querySelectorAll(".box-option");
let restartBtn = document.getElementById("restart");
let popupRef = document.querySelector(".popup");
let msgRef = document.getElementById("message");
let newGameBtn = document.getElementById("new-game");

//Winning Pattern Array 
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

//Player "X" Plays first
let xTurn = true;
let count = 0;

//Disable All Buttons 
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//enable all buttons for new game and restart
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = " 'X' Wins .";
  } else {
    msgRef.innerHTML = " 'O' Wins .";
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = " Its a Draw .";
};

//new game
newGameBtn.addEventListener("click", () => {
  count = 0 ;
  enableButtons();
});
//Restart 
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//win logic 
const winChecker = () => {
  //loop through all win patterns
  for ( let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    //check if element are filled
    //if 3 empty element are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //if all 3 buttons have same value then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true ;
    } else {
      xTurn = true;
      //display O
      element.innerText = "O";
      element.disabled = true;
    }
    //increment count on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //check for win on every click
    winChecker();
  });
});

//enable buttons and disable popup pn page load
window.onload = enableButtons;