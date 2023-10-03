const preview = document.getElementById("preview"),
  styles = document.getElementById("styles"),
  ranges = document.querySelectorAll(".settings input"),
  copyButton = document.getElementById("copy-styles");

ranges.forEach((slider) => {
  slider.addEventListener("input", generateStyles);
});

function generateStyles() {
  const xShadow = document.getElementById("x-shadow").value;
  const yShadow = document.getElementById("y-shadow").value;
  const blurRadius = document.getElementById("blur-r").value;
  const spreadRadius = document.getElementById("spread-r").value;
  const shadowColor = document.getElementById("shadow-color").value;
  const shadowOpacity = document.getElementById("shadow-opacity").value;
  const shadowInset = document.getElementById("inset-shadow").checked;
  const borderRadius = document.getElementById("border-r").value;

  const boxShadow = `${
    shadowInset ? "inset" : ""
  } ${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(
    shadowColor,
    shadowOpacity
  )}`;

  preview.style.boxShadow = boxShadow;
  preview.style.borderRadius = `${borderRadius}px`;

  styles.textContent = `box-shadow: ${boxShadow}; \nborder-radius: ${borderRadius}px;`;
}

function hexToRgba(shadowColor, shadowOpacity) {
  const r = parseInt(shadowColor.substr(1, 2), 16);
  const g = parseInt(shadowColor.substr(3, 2), 16);
  const b = parseInt(shadowColor.substr(5, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
}

function copyStyles() {
  styles.select();
  document.execCommand("copy");
  copyButton.innerText = "Copied !";
  copyButton.style.background = "#03c03c";

  setTimeout(() => {
    copyButton.innerText = "Copied !";
  }, 500);
}

generateStyles();
