import {
  updateDisplayNumber,
  alternanteViews,
  resetValues,
  validateInput,
  handleInputSpaces,
} from "./utils.js";

/** Will update the height of the card depending on the width */
export const updateCardHeight = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const width = card.offsetWidth;
    const height = width * 0.55;
    card.style.setProperty("height", height + "px");
  });
};

/** display the default value or the input value */
export const handleName = () => {
  const nameInput = document.querySelector("#name");
  const nameDisplay = document.querySelector(".name");
  nameDisplay.textContent = nameInput.value
    ? nameInput.value
    : "jane appleseed";

  nameInput.addEventListener("change", validateInput);
};

export const handleNumbers = (e) => {
  const numbersInput = document.querySelector("#number");
  //let user delete white spaces
  if (e.inputType !== "deleteContentBackward") {
    handleInputSpaces(numbersInput);
  }
  updateDisplayNumber(numbersInput.value);

  numbersInput.addEventListener("change", validateInput);
};

export const handleCVC = () => {
  const cvcInput = document.querySelector("#cvc-input");
  const cvcDisplay = document.querySelector(".card__cvc");
  cvcDisplay.textContent = cvcInput.value ? cvcInput.value : "000";
  cvcInput.addEventListener("change", validateInput);
};

export const handleExp = (e) => {
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

export const handleSubmit = (e, isSubmitting) => {
  e.preventDefault();
  if (isSubmitting === true) {
    const inputs = document.querySelectorAll("input");
    let formValidity = true;
    for (let input of inputs) {
      if (!validateInput(null, input)) {
        formValidity = false;
      }
    }
    if (formValidity) alternanteViews(e, true);
  } else {
    resetValues();
    alternanteViews(e, false);
  }
};
