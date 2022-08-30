import {
  handleCVC,
  handleName,
  handleNumbers,
  handleExp,
  updateCardHeight,
  handleSubmit,
} from "./events-cbs.js";
import { getElem } from "./utils.js";

window.addEventListener("resize", updateCardHeight);
window.addEventListener("load", updateCardHeight);

getElem("#cvc-input").addEventListener("input", handleCVC);
getElem("#name").addEventListener("input", handleName);
getElem("#number").addEventListener("input", handleNumbers);
getElem("#month").addEventListener("input", handleExp);
getElem("#year").addEventListener("input", handleExp);
getElem("form").addEventListener("submit", (e) => {
  const dataSet = e.target.dataset.id;
  dataSet === "form" ? handleSubmit(e, true) : handleSubmit(e, false);
});
