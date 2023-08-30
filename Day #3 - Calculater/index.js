
let runningTotal = 0;
let buffer = "0";
let perviousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handelNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (perviousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      perviousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = 0;
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handelMath(symbol);
      break;
  }
}

function handelMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  perviousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (perviousOperator === "+") {
    runningTotal += intBuffer;
  } else if (perviousOperator === "−") {
    runningTotal -= intBuffer;
  } else if (perviousOperator === "×") {
    runningTotal *= intBuffer;
  } else if (perviousOperator === "÷") {
    runningTotal /= intBuffer;
  }
}

function handelNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
