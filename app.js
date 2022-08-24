const validator = new Validator();
const cvcInput = document.querySelector("#cvc-input");
const nameInput = document.querySelector("#name");
const numbersInput = document.querySelector("#number");
const mounthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
/**
 * Will update the height of the card depending on the width of the card while resizing the window
 */
const updateCardHeight = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const width = card.offsetWidth;
    const height = width * 0.55;
    card.style.setProperty("height", height + "px");
  });
};

/**
 * display the default value or the input value
 */
const handleDisplayName = () => {
  const nameDisplay = document.querySelector(".name");

  if (!validator.name(nameInput.value)) {
    nameInput.classList.add("input__error");
    displayErrorMsg(nameInput, "Can't be blank");
  } else {
    nameInput.classList.remove("input__error");
    removeDomError(nameInput);
  }

  nameDisplay.textContent = nameInput.value
    ? nameInput.value
    : "jane appleseed";
};

const handleCVC = () => {
  const cvcDisplay = document.querySelector(".card__cvc");
  if (!validator.cvc(cvcInput.value)) {
    cvcInput.classList.add("input__error");
    displayErrorMsg(cvcInput, "Can't be blank");
  } else {
    cvcInput.classList.remove("input__error");
    removeDomError(cvcInput);
  }

  const isANumber = isNaN(parseInt(cvcInput.value));
  if (cvcInput.value > 999 || cvcInput.value < 0 || isANumber) {
    cvcInput.value = "";
  }

  cvcDisplay.textContent = cvcInput.value ? cvcInput.value : "000";
};

const handleNumbers = (e) => {
  if (!validator.isCardNumer(numbersInput.value)) {
    numbersInput.classList.add("input__error");
    displayErrorMsg(numbersInput, "Wrong format, numbers only");
  } else {
    numbersInput.classList.remove("input__error");
    removeDomError(numbersInput);
  }

  //let user delete white spaces
  if (e.inputType !== "deleteContentBackward") {
    handleInputSpaces(numbersInput);
  }

  updateDisplayNumber(numbersInput.value);
};

const handleExp = (e) => {
  const mmDisplay = document.querySelector("#mm");
  const yyDisplay = document.querySelector("#yy");

  if (+mounthInput.value <= 0) {
    mmDisplay.textContent = "00";
  } else if (+mounthInput.value < 10) {
    mmDisplay.textContent = "0" + mounthInput.value;
  } else {
    mmDisplay.textContent = mounthInput.value;
  }

  if (+yearInput.value >= 22) {
    yyDisplay.textContent = yearInput.value;
  }
};
//event listeners
window.addEventListener("resize", updateCardHeight);
window.addEventListener("load", updateCardHeight);

cvcInput.addEventListener("input", handleCVC);
nameInput.addEventListener("input", handleDisplayName);
numbersInput.addEventListener("input", handleNumbers);
mounthInput.addEventListener("input", handleExp);
yearInput.addEventListener("input", handleExp);
