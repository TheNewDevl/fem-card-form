export class Validator {
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

  cvc(val) {
    const value = this.cleanSpaces(val);
    const reg = /^\d{3}$/;
    return value.length === 3 && reg.test(value);
  }

  name(value) {
    const reg = /^([a-zA-Z'éèàçêï\+-][\s]{0,1}){4,20}$/;
    return reg.test(this.cleanSpaces(value));
  }

  month(val) {
    const value = this.cleanSpaces(val);
    return +value > 0 && +value <= 12;
  }

  year(val) {
    const value = this.cleanSpaces(val);

    return +value >= 22 && +value <= 30;
  }
}

/**
 *
 * @param {string} selector css selector
 * @param {boolean} all : send true to return all elements ;
 * @returns {HTMLElement}
 */
export const getElem = (selector, all) => {
  return all
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
};

/**
 * Remove white spaces and display the input value in the card
 * @param {string} inputValue
 */
export const updateDisplayNumber = (inputValue) => {
  const numbers = [...getElem(".single__number", true)];
  const value = new Validator().cleanSpaces(inputValue);
  for (let i = numbers.length - 1; i >= 0; i--) {
    numbers[i].textContent = value[i] ? value[i] : "0";
  }
};

/**
 * Will format the string adding a space every 4 chars
 * @param {HTMLInputElement} numbersInput
 */
export const handleInputSpaces = (numbersInput) => {
  const cleanInputArray = new Validator()
    .cleanSpaces(numbersInput.value)
    .split("");
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
export const handleError = (input, textError) => {
  input.classList.add("input__error");
  const closestError = input.closest("label").lastElementChild;
  closestError.textContent = textError;
};

/** @param {HTMLInputElement} input */
export const removeError = (input) => {
  input.classList.remove("input__error");

  const closestError = input.closest("label").lastElementChild;
  closestError.textContent = "";
};

const textErrors = {
  name: "Must contain at least 3 letters",
  number: "Wrong format, numbers only",
  month: "Wrong format. Month : 1 to 12, Yeart: 22 to 27",
  year: "Wrong format. Month : 1 to 12, Yeart: 22 to 27",
  cvc: "Wrong format, numbers only. Min 3 chars",
};

export const validateInput = (e, inputField) => {
  const input = inputField ? inputField : e.target;

  if (input.value == "") {
    handleError(input, "Can't be blank");
    return false;
  }
  if (!new Validator()[input.name](input.value)) {
    handleError(input, textErrors[input.name]);
    return false;
  } else {
    removeError(input);
    return true;
  }
};

export const resetValues = () => {
  getElem("input", true).forEach((i) => (i.value = ""));
  getElem(".name").textContent = "JANE APPLESSED";
  getElem(".card__cvc").textContent = "000";
  getElem("#mm").textContent = "00";
  getElem("#yy").textContent = "00";
  [...getElem(".single__number", true)].forEach((i) => {
    i.textContent = "0";
  });
};

export const alternanteViews = (e, isSubmitting) => {
  getElem("label", true).forEach((label) => {
    label.style.display = isSubmitting ? "none" : "block";
    getElem("#setting").style.display = isSubmitting ? "none" : "initial";

    e.target.dataset.id = isSubmitting ? "reset" : "form";
  });
  getElem(".complete").style.display = isSubmitting ? "flex" : "none";
  getElem(".complete__btn").style.display = isSubmitting ? "initial" : "none";
};
