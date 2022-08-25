class Validator {
  constructor() {}

  cleanSpaces(value) {
    return value.replace(/\s+/g, "");
  }

  /**
   * check the string validity
   * @param {string} val the input value
   * @param {boolean} submit different check when submit form
   * @returns {boolean} true if is valid
   */
  number(val, submit) {
    const value = this.cleanSpaces(val);
    const reg = submit ? /^\d{16}$/ : /^\d+$/;
    return submit ? reg.test(value) && value.length === 16 : reg.test(value);
  }

  cvc(value) {
    const reg = /^\d{3}$/;
    return value.length === 3 && reg.test(value);
  }

  name(value) {
    const reg = /^([a-zA-Z'éèàçêï\+-][\s]{0,1}){4,20}$/;
    return reg.test(this.cleanSpaces(value));
  }

  month(value) {
    return +value >= 0 && +value <= 12;
  }

  year(value) {
    return +value >= 22 && +value <= 30;
  }
}

/**
 * Remove white spaces and display the input value in the card
 * @param {string} inputValue
 */
const updateDisplayNumber = (inputValue) => {
  const numbers = [...document.querySelectorAll(".single__number")];
  const value = validator.cleanSpaces(inputValue);

  for (let i = numbers.length - 1; i >= 0; i--) {
    numbers[i].textContent = value[i] ? value[i] : "0";
  }
};

/**
 * Will format the string adding a space every 4 chars
 * @param {HTMLInputElement} numbersInput
 */
const handleInputSpaces = (numbersInput) => {
  const cleanInputArray = validator.cleanSpaces(numbersInput.value).split("");
  for (let i = 4; i < 16; i += 5) {
    if (numbersInput.value.length >= i && cleanInputArray[i] !== " ") {
      const rest = cleanInputArray.slice(i, 18);
      rest.unshift(" ");
      cleanInputArray.splice(i, 20, ...rest);
      numbersInput.value = cleanInputArray.join("");
    }
  }
};

/**
 * Will create and insert an error message
 * @param {HTMLInputElement} input concerned
 * @param {string} textError the custom text error
 */
const handleError = (input, textError) => {
  input.classList.add("input__error");
  const closestError = input.closest("label").lastElementChild;
  closestError.textContent = textError;
};

/** @param {HTMLInputElement} input */
const removeError = (input) => {
  input.classList.remove("input__error");

  const closestError = input.closest("label").lastElementChild;
  closestError.textContent = "";
};

const textErrors = {
  name: "Can't be blank",
  number: "Wrong format, numbers only",
  month: "Can't be blank",
  year: "Can't be blank",
  cvc: "Can't be blank",
};

const validateInput = (e, inputField) => {
  const input = inputField ? inputField : e.target;

  if (!validator[input.name](input.value)) {
    handleError(input, textErrors[input.name]);
    return false;
  } else {
    removeError(input);
    return true;
  }
};
