// Selecting elements from the DOM
const sizes = document.querySelectorAll(".size");
const colors = document.querySelectorAll(".color");
const hoodies = document.querySelectorAll(".hoodie");
const gradients = document.querySelectorAll(".gradient");
const hoodieBg = document.querySelector(".hoodie-bg");
const incrementBtn = document.querySelector(".increment");
const decrementBtn = document.querySelector(".decrement");
const counterValue = document.querySelector(".counter-value");
const priceValue = document.getElementById("price-value");

// Initializing variables
let prevColor = "blue"; //variable to store the previous color
let animationEnd = true; //Flag to check if the gradient animation has ended

// Function to handle size selection
function changeSize() {
    sizes.forEach((size) => size.classList.remove("active"));
    this.classList.add("active");
}

sizes.forEach((size) => size.addEventListener("click", changeSize));

//Function to select an element by color and type
function selectElementByColor(color, elementType = "hoodie") {
    return document.querySelector(`.${elementType}[color="${color}"]`);
}

//Function to handle color change 
function changeColor() {
    if (!animationEnd) return;

    //Get color attributes from the clicked element
    const primary = this.getAttribute("primary");
    const color = this.getAttribute("color");

    //Select corresponding hoodie and gradients
    const hoodie = selectElementByColor(color);
    const gradient = selectElementByColor(color, "gradient");
    const prevGradient = selectElementByColor(prevColor, "gradient");

    //Check if the color is the same as the previous one 
    if (color == prevColor) return;

    //Update the active color in the UI
    colors.forEach((c) => c.classList.remove("active"));
    this.classList.add("active");

    //Update the global CSS variable for primary color
    document.documentElement.style.setProperty("--primary", primary);

    //Hide all hoodies and display the selected one
    hideAllHoodie();
    hoodie.classList.add("show");

    //Reset and animate gradients
    resetGradients();
    gradient.classList.add("first");
    prevGradient.classList.add("second");

    //Update the previous color and set animation flag
    prevColor = color;
    animationEnd = false;

    //Listen for the end of the gradient animation
    gradient.addEventListener("animationend", () => {
        animationEnd = true;
    });
}

//Function to hide all hoodies
function hideAllHoodie() {
    hoodies.forEach((h) => h.classList.remove("show"));
}

//Function to reset gradient animations 
function resetGradients() {
    gradients.forEach((g) => g.classList.remove("first", "second"));
}

//Event listeners for color selection
colors.forEach((c) => c.addEventListener("click", changeColor));

//Media query for responsive design
const x = window.matchMedia("(max-width: 1000px)");
const hoodieHeightMultiplier = 1.2;
//Function to set hoodie background height based on window size
function setHoodieBackgroundHeight() {
    if (x.matches) {
        const hoodieHeight = hoodies[0]?.offsetHeight || 0;
        hoodieBg.style.height = `${hoodieHeight * hoodieHeightMultiplier}px`;
    } else {
        hoodieBg.style.height = "468px";
    }
}

window.addEventListener("load", setHoodieBackgroundHeight);
window.addEventListener("resize", setHoodieBackgroundHeight);

// Variables for cart count item price
let count = Number(counterValue.textContent);
let price = Number(priceValue.textContent);
const firstPrice = 39.99;

// Function to update cart count and total price
function updateCounterAndPrice() {
    counterValue.textContent = count;
    price = count * firstPrice;
    priceValue.textContent = price.toFixed(2);
}

//Function to increment cart count
function increment() {
    count++;
    updateCounterAndPrice();
}

// Function to decrement cart count (with a minimum count of 1)
function decrement() {
    if (count > 1) {
        count--;
        updateCounterAndPrice();
    }
}

//Event listeners for increment and decrement buttons
incrementBtn.addEventListener("click", increment);
decrementBtn.addEventListener("click", decrement);