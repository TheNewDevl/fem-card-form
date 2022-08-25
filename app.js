const validator = new Validator();
const cvcInput = document.querySelector("#cvc-input");
const nameInput = document.querySelector("#name");
const numbersInput = document.querySelector("#number");
const mounthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const form = document.querySelector("form");

/** Will update the height of the card depending on the width */
const updateCardHeight = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const width = card.offsetWidth;
    const height = width * 0.55;
    card.style.setProperty("height", height + "px");
  });
};

window.addEventListener("resize", updateCardHeight);
window.addEventListener("load", updateCardHeight);

/** display the default value or the input value */
const handleName = () => {
  const nameDisplay = document.querySelector(".name");
  nameDisplay.textContent = nameInput.value
    ? nameInput.value
    : "jane appleseed";

  nameInput.addEventListener("change", validateInput);
};

const handleNumbers = (e) => {
  //let user delete white spaces
  if (e.inputType !== "deleteContentBackward") {
    handleInputSpaces(numbersInput);
  }
  updateDisplayNumber(numbersInput.value);

  numbersInput.addEventListener("change", validateInput);
};

const handleCVC = () => {
  const cvcDisplay = document.querySelector(".card__cvc");
  cvcDisplay.textContent = cvcInput.value ? cvcInput.value : "000";
  cvcInput.addEventListener("change", validateInput);
};

const handleExp = (e) => {
  const display = document.querySelector(
    e.target.name === "month" ? "#mm" : "#yy"
  );
  const length = e.target.value.length;
  if (length === 1) {
    display.textContent = "0" + e.target.value;
  } else {
    display.textContent = e.target.value ? e.target.value : "00";
  }
  e.target.addEventListener("change", validateInput);
};

cvcInput.addEventListener("input", handleCVC);
nameInput.addEventListener("input", handleName);
numbersInput.addEventListener("input", handleNumbers);
mounthInput.addEventListener("input", handleExp);
yearInput.addEventListener("input", handleExp);

const handleSubmit = (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll("input");
  let formValidity = true;

  for (let input of inputs) {
    if (!validateInput(null, input)) {
      formValidity = false;
    }
  }

  if (formValidity) {
    const textBtn = document.querySelector("#setting");
    const labels = document.querySelectorAll("label");
    labels.forEach((label) => {
      label.style.display = "none";
      textBtn.style.display = "none";
    });
  } else {
    console.log("le formulaire n'a pas été correctement rempli");
  }
};

form.addEventListener("submit", handleSubmit);
