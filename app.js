const form = document.querySelector("form");
const name = document.querySelector("#name");
const cardNumber = document.querySelector("#number");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const cvc = document.querySelector("#cvc");

/**
 * Will update the height of the card depending on the width of the card while resizing the window
 */
const updateHeight = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const width = card.offsetWidth;
    const height = width * 0.55;
    card.style.setProperty("height", height + "px");
  });
};

window.addEventListener("resize", updateHeight);
window.addEventListener("load", updateHeight);
