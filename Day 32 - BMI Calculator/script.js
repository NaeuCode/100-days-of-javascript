let heightInput = document.querySelector(".height input");
let weightInput = document.querySelector(".weight input");
let calculateBtn = document.querySelector(".calculate-btn");
let bmiTxt = document.querySelector(".result-box .bmi h3");
let resultBox = document.querySelector(".result-box");
let healthStatus = document.querySelector(".result-box .result");

//When the button is clicked, it will trigger the function defined inside the event listener
calculateBtn.addEventListener("click", () => {
    if (heightInput.value != "" && weightInput.value != "") {
        calculateBmi();
    }
});

let calculateBmi = () => {
    //Get the values of weight and height form the respective input elements
    let weightValue = weightInput.value;
    let heightValue = heightInput.value;

    //Calculate the BMI using the formula
    let bmi = (weightValue / Math.pow(heightValue / 100, 2)).toFixed(1);

    //Check the calculated BMI and update the text and color of the health status accordingly
    if (bmi < 18.5) {
        healthStatus.innerHTML = "You Are Underweight";
        healthStatus.style.color = "#ffc44d";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        healthStatus.innerHTML = "You Are Normal Weight";
        healthStatus.style.color = "#4ac38d";
    } else if (bmi >= 25 && bmi <= 29.9) {
        healthStatus.innerHTML = "You Are Over Weight";
        healthStatus.style.color = "#ff884d";
    } else {
        healthStatus.innerHTML = "You are in the obese range";
        healthStatus.style.color = "#ff5e57";
    }

    bmiTxt.innerHTML = bmi;
    resultBox.style.display = "block";
}