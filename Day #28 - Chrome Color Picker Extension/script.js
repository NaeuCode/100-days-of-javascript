const pickerBtn = document.querySelector("#picker-btn");
const clearBtn = document.querySelector("#clear-btn");
const colorList = document.querySelector(".all-colors");
const exportBtn = document.querySelector("#export-btn");

// Retrieving picked colors form localStorage or initializing an empty array
let pickedColors = JSON.parse(localStorage.getItem("colors-list")) || [];

// Variable to keep track of the current color popup
let currentPopup = null;

//Function to copy text to the clipboard
const copyToClipboard = async (text, element) => {
    try {
        await navigator.clipboard.writeText(text);
        element.innerText = "Copied!";
        //Resetting element text after 1 second
        setTimeout(() => {
            element.innerText = text;
            
        }, 1000);
    } catch (error) {
        alert("Filed to Copy text!");
    }
};

//Function to export colors as text file 
const exportColors = () => {
    const colorText = pickedColors.join("\n");
    const blob = new Blob([colorText], {type: "text/plain"}) ;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Colors.text";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

//Function to create the color popup
const createColorPopup = (color) => {
    const popup = document.createElement("div");
    popup.classList.add("color-popup");
    popup.innerHTML = `
        <div class="color-popup-content">
            <span class="close-popup">x</span>
            <div class="color-info">
                <div class="color-preview" style="background: ${color};"></div>
                <div class="color-details">
                    <div class="color-value">
                        <span class="label">Hex: </span>
                        <span class="value hex" data-color="${color}">${color}</span>
                    </div>
                    <div class="color-value">
                        <span class="label">RGB:</span>
                        <span class="value rgb" data-color="${color}">${hexToRgb(color)}</span>
                    </div>
                </div>
            </div>
        </div>

    `;

// Close button inside the popup 
const closePopup = popup.querySelector(".close-popup");
closePopup.addEventListener('click', () => {
    document.body.removeChild(popup);
    currentPopup = null;
});

//Event listeners to copy color value to clipboard 
const colorValues = popup.querySelectorAll(".value");
colorValues.forEach((value) => {
    value.addEventListener('click', (e) => {
        const text = e.currentTarget.innerText;
        copyToClipboard(text, e.currentTarget);
    });
});

return popup;

};
//Function to display the picked colors 
const showColors = () => {
    colorList.innerHTML = pickedColors.map((color) => 
    `
        <li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${color === "#ffffff" ? "#ccc" : color}"></span>
            <span class="value hex" data-color="${color}">${color}</span>
        </li>
    `
    ).join("");

    const colorElement = document.querySelectorAll(".color");
    colorElement.forEach((li) => {
        const colorHex = li.querySelector(".value.hex");
        colorHex.addEventListener('click', (e) => {
            const color = e.currentTarget.dataset.color;
            if(currentPopup) {
                document.body.removeChild(currentPopup);
            }
            const popup = createColorPopup(color);
            document.body.appendChild(popup);
            currentPopup = popup;
        });
    });

    const pickedColorsContainer = document.querySelector(".colors-list");
    pickedColorsContainer.classList.toggle("hide", pickedColors.length === 0);

};

// function to convert a hex color code to rgb format
const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;

};

// function to activate the eye dropper color picker 
const activateEyeDropper = async () => {
    document.body.style.display = "none";
    try {
        //Opening the eye dropper and retrieving the selected color
        const {sRGBHex} = await new EyeDropper().open();

        if (!pickedColors.includes(sRGBHex)) {
            pickedColors.push(sRGBHex);
            localStorage.setItem("colors-list", JSON.stringify(pickedColors));
        }

        showColors();
    } catch (error) {
        alert("Filed to Copy the color code!");
    } finally {
        document.body.style.display = "block";
    }
};

// function to clear all picked colors 
const clearAllColors = () => {
    pickedColors = [];
    localStorage.removeItem("colors-list");
    showColors();
};

// Event listeners for buttons 
clearBtn.addEventListener('click', clearAllColors);
pickerBtn.addEventListener('click', activateEyeDropper);
exportBtn.addEventListener('click',exportColors);

showColors();