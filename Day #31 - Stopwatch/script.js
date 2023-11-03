let hour = document.querySelector(".hour");
let minute = document.querySelector(".minute");
let second = document.querySelector(".sec");
let millisecond = document.querySelector(".ms");
let startBtn = document.querySelector(".start");
let stopBtn = document.querySelector(".stop");
let lapBtn = document.querySelector(".lap");
let resetBtn = document.querySelector(".reset");
let lapContainer = document.querySelector(".lap-container");
let container = document.querySelector(".container");

// Initializing variables
let hr = (min = sec = ms ="0" + 0);
let startTimer;
let lapNum = 0;

//Start Function , called when the start button is clicked
let start = () => {
    //set an interval to update the timer every 10 milliseconds
    startTimer = setInterval (() => {
        ms++;
        ms = ms < 10 ? "0" + ms : ms;
        if (ms == 100) {
            sec++;
            ms = "0" + 0;
            sec = sec < 10 ? "0" + sec : sec ;
        }
        if(sec == 60) {
            min++;
            sec = "0" + 0;
            min = min < 10 ? "0" + min : min;
        }
        if (min == 60) {
            hr++;
            min = "0" + 0;
            hr = hr < 10 ? "0" + hr : hr;
        }
        putValue(); //Update the displayed value
    }, 10);

    resetBtn.style.display = "none"; //Hide the rest button
    startBtn.style.display = "none"; //Hide the start button
    lapBtn.style.display = "block"; //Show the lap button
    stopBtn.style.display = "block"; //show the stop button
};

//Function to update the displayed timer value
let putValue = () => {
    millisecond.innerHTML = ms;
    second.innerHTML = sec;
    minute.innerHTML = min;
    hour.innerHTML = hr;
};

//Function to handle lap button click
let lap = () => {
    container.style.height = "450px"; //adjust container height for lap view
    lapContainer.style.display = "block"; //show the lap container
    lapNum++; //increment lap number
    let elem = document.createElement("li"); //create  a new List Item
    let lapText = `<span class="lap-num">Lap ${lapNum}</span>
                    <span class="lap-timer">${hr}:${min}:${sec}:${ms}</span>`;
    elem.innerHTML = lapText; //set the inner html of the list item
    lapContainer.appendChild(elem); // add the list item to the lap Container
};

//function to stop the timer
let stop = () => {
    clearInterval(startTimer); //Clear the timer Interval
    resetBtn.style.display = "block";
    startBtn.style.display = "block";
    lapBtn.style.display = "none";
    stopBtn.style.display = "none";
};

// Function to reset the timer
let reset = () => {
    hr = min = sec = ms = "0" + 0;
    container.style.height = "280px";
    lapContainer.style.display = "none";
    lapContainer.innerHTML = ""; //clear lap container contents
    lapNum = 0;
    putValue();
};