import { jest } from "@jest/globals";
import {
  Validator,
  getElem,
  updateDisplayNumber,
  handleInputSpaces,
  handleError,
  removeError,
  validateInput,
  resetValues,
  alternanteViews,
} from "./utils.js";

describe("Validator class suite test", () => {
  const validator = new Validator();
  describe("cleanspaces ", () => {
    test("should be defined", () => {
      expect(validator.cleanSpaces).toBeDefined();
    });
    test("should remove white spaces", () => {
      validator.cleanSpaces(" a b c d ");
      expect(validator.cleanSpaces(" a b c d ")).toEqual("abcd");
      expect(validator.cleanSpaces(" 111    ")).toEqual("111");
    });
  });

  describe("number method", () => {
    test("should be defined", () => {
      expect(validator.number).toBeDefined();
    });
    test("should return false", () => {
      expect(validator.number("aaaaaaaaaaaaaaaa")).toBe(false);
      expect(validator.number("g111 1111 1111 1111")).toBe(false);
      expect(validator.number("g111 1111-1111 1111")).toBe(false);
    });
    test("should return true", () => {
      expect(validator.number("1111")).toBe(true);
      expect(validator.number("1111 1111 1111 1111")).toBe(true);
    });
    test("SUBMIT = true, should return false", () => {
      expect(validator.number("1111", true)).toBe(false);
      expect(validator.number("1111", true)).toBe(false);
      expect(validator.number("1111 1111 1111 1111 1", true)).toBe(false);
    });
    test("SUBMIT = true, should return true", () => {
      expect(validator.number("1111 1111 1111 1111", true)).toBe(true);
    });
  });

  describe("cvc method", () => {
    expect(validator.cvc).toBeDefined();

    test("should return false", () => {
      expect(validator.cvc("")).toBe(false);
      expect(validator.cvc("d11")).toBe(false);
      expect(validator.cvc("-11")).toBe(false);
      expect(validator.cvc("1111")).toBe(false);
      expect(validator.cvc("11")).toBe(false);
    });

    test("should return true", () => {
      expect(validator.cvc("11 1")).toBe(true);
      expect(validator.cvc("111")).toBe(true);
    });
  });

  describe("name method", () => {
    expect(validator.name).toBeDefined();

    test("should return true", () => {
      expect(validator.name("a")).toBe(false);
      expect(validator.name("jfi234")).toBe(false);
      expect(validator.name("a4343?")).toBe(false);
    });
    test("should return true", () => {
      expect(validator.name("prénom")).toBe(true);
      expect(validator.name("prénom composé")).toBe(true);
      expect(validator.name("prénom-composé")).toBe(true);
    });
  });

  describe("mouth method", () => {
    expect(validator.month).toBeDefined();
    test("should return false", () => {
      expect(validator.month("13")).toBe(false);
      expect(validator.month("0")).toBe(false);
      expect(validator.month("-1")).toBe(false);
      expect(validator.month("da")).toBe(false);
    });

    test("should return true", () => {
      for (let i = 1; i <= 12; i++) {
        expect(validator.month(String(i))).toBe(true);
      }
      expect(validator.month("1")).toBe(true);
    });
  });

  describe("year method", () => {
    expect(validator.year).toBeDefined();
    test("should return false", () => {
      expect(validator.year("13")).toBe(false);
      expect(validator.year("0")).toBe(false);
      expect(validator.year("-1")).toBe(false);
      expect(validator.year("da")).toBe(false);
    });

    test("should return true", () => {
      for (let i = 22; i <= 27; i++) {
        expect(validator.year(String(i))).toBe(true);
      }
      expect(validator.year("22")).toBe(true);
    });
  });
});

describe("getElem", () => {
  test("should return an HTML element", () => {
    document.body.innerHTML =
      "<div>" +
      '  <p id="paragraph">Hello</p>' +
      '  <p id="paragraph" />' +
      "</div>";
    const element = getElem("#paragraph");
    expect(element.textContent).toEqual("Hello");
  });

  test("should return a node list containing 2 elements", () => {
    document.body.innerHTML =
      "<div>" +
      '  <p id="paragraph">Hello</p>' +
      '  <p id="paragraph" />' +
      "</div>";
    expect(Array.from(getElem("p", true)).length).toEqual(2);
  });
});

describe("updateDisplayNumber", () => {
  test("should set spans text content", () => {
    document.body.innerHTML =
      "<div>" +
      '  <p id="paragraph">Hello</p>' +
      '  <p id="paragraph" />' +
      '<div class="numbers__container">' +
      '<div class="numbers__group">' +
      ' <span class="single__number">0</span>' +
      ' <span class="single__number">0</span>' +
      ' <span class="single__number">0</span>' +
      ' <span class="single__number">0</span>' +
      " </div>" +
      ' <div class="numbers__group">' +
      '  <span class="single__number">0</span>' +
      '  <span class="single__number">0</span>' +
      '  <span class="single__number">0</span>' +
      '   <span class="single__number">0</span>' +
      " </div>" +
      ' <div class="numbers__group">' +
      '   <span class="single__number">0</span>' +
      '   <span class="single__number">0</span>' +
      '   <span class="single__number">0</span>' +
      '   <span class="single__number">0</span>' +
      " </div>" +
      ' <div class="numbers__group">' +
      '   <span class="single__number">0</span>' +
      '   <span class="single__number">0</span>' +
      '  <span class="single__number">0</span>' +
      '  <span class="single__number">0</span>' +
      " </div>" +
      "</div>" +
      "</div>";
    const inputValue = "1234567891234567";
    updateDisplayNumber(inputValue);
    document.querySelectorAll(".single__number").forEach((span, index) => {
      expect(span.textContent).toEqual(inputValue[index]);
    });
  });

  test("if has no value should set a default value ", () => {
    const inputValue = "12";
    updateDisplayNumber(inputValue);

    document.querySelectorAll(".single__number").forEach((span, index) => {
      if (index >= 0 && index <= 1) {
        expect(span.textContent).toEqual(inputValue[index]);
      } else {
        expect(span.textContent).toEqual("0");
      }
    });
  });
});

describe("handleInputSpaces", () => {
  const input = document.createElement("input");
  input.type = "text";
  test("should add a space after 3 chars", () => {
    input.value = "1234";
    handleInputSpaces(input);
    expect(input.value).toEqual("1234 ");
  });
  test("should add a space after 8 chars", () => {
    input.value = "12345678";
    handleInputSpaces(input);
    expect(input.value).toEqual("1234 5678 ");
  });
  test("should add a space after 12 chars", () => {
    input.value = "1234567891234567";
    handleInputSpaces(input);
    expect(input.value).toEqual("1234 5678 9123 4567");
  });
});

describe("handleError", () => {
  beforeEach(() => {
    document.body.innerHTML =
      "<div>" +
      '   <label for="name"> ' +
      '     <input  type="text" />' +
      '     <p class="text__error"></p>' +
      "   </label>" +
      "</div>";
  });

  test("should add a class to the input", () => {
    const input = document.querySelector("input");
    handleError(input);
    expect(input.classList).toContain("input__error");
  });

  test("should pass the error to the correct <p> ", () => {
    const input = document.querySelector("input");
    const textError = "this is an error";
    handleError(input, textError);
    expect(document.querySelector(".text__error").textContent).toEqual(
      textError
    );
  });
});

describe("removeError", () => {
  test("should remove error class and text error", () => {
    document.body.innerHTML =
      "<div>" +
      '   <label for="name"> ' +
      '     <input class="input__error" type="text" />' +
      '     <p class="text__error">this is an error</p>' +
      "   </label>" +
      "</div>";
    const input = document.querySelector("input");
    removeError(input);
    expect(input.classList).not.toContain("input__error");
    expect(document.querySelector(".text__error").textContent).toEqual("");
  });
});

describe("validateInput", () => {
  const textErrors = {
    name: "Must contain at least 3 letters",
    number: "Wrong format, numbers only",
    month: "Wrong format. Month : 1 to 12, Yeart: 22 to 27",
    year: "Wrong format. Month : 1 to 12, Yeart: 22 to 27",
    cvc: "Wrong format, numbers only. Min 3 chars",
  };

  test("empty input value should set 'cant be blank error and return false", () => {
    document.body.innerHTML =
      '<label for="name"> ' +
      ' <input type="text"  name="name"  id="name" />' +
      '     <p id="error" class="text__error"></p>' +
      " </label>";
    const mockEvent = {
      target: document.querySelector("#name"),
    };
    validateInput(mockEvent);
    expect(document.querySelector("#name + .text__error").textContent).toEqual(
      "Can't be blank"
    );
    expect(validateInput(mockEvent)).toBe(false);
  });

  test("should display name error", () => {
    document.body.innerHTML =
      '<label for="name"> ' +
      ' <input type="text"  name="name"  id="name" value="na" />' +
      '     <p id="error" class="text__error"></p>' +
      " </label>";
    const mockEvent = {
      target: document.querySelector("#name"),
    };
    validateInput(mockEvent);
    expect(document.querySelector("#name + .text__error").textContent).toEqual(
      textErrors.name
    );
  });
  test("should display number error", () => {
    document.body.innerHTML =
      "<label > " +
      ' <input type="text"  name="number"  id="number" value="n" />' +
      '     <p id="error" class="text__error"></p>' +
      " </label>";
    const mockEvent = {
      target: document.querySelector("#number"),
    };
    validateInput(mockEvent);
    expect(
      document.querySelector("#number + .text__error").textContent
    ).toEqual(textErrors.number);
  });
  test("should display month error", () => {
    document.body.innerHTML =
      "<label > " +
      ' <input type="number"  name="month"  id="month" value="0" />' +
      '     <p id="error" class="text__error"></p>' +
      " </label>";
    const mockEvent = {
      target: document.querySelector("#month"),
    };
    validateInput(mockEvent);
    expect(document.querySelector("#month + .text__error").textContent).toEqual(
      textErrors.month
    );
  });
  test("should display year error", () => {
    document.body.innerHTML =
      "<label> " +
      ' <input type="number"  name="year"  id="year" value="15" />' +
      '     <p id="error" class="text__error"></p>' +
      " </label>";
    const mockEvent = {
      target: document.querySelector("#year"),
    };
    validateInput(mockEvent);
    expect(document.querySelector("#year + .text__error").textContent).toEqual(
      textErrors.year
    );
  });
  test("should display cvc error", () => {
    document.body.innerHTML =
      "<label> " +
      ' <input type="number"  name="cvc"  id="cvc" value="12" />' +
      '     <p id="error" class="text__error"></p>' +
      " </label>";
    const mockEvent = {
      target: document.querySelector("#cvc"),
    };
    validateInput(mockEvent);
    expect(document.querySelector("#cvc + .text__error").textContent).toEqual(
      textErrors.cvc
    );
  });
  test("shoulr dreturn true & remove text error", () => {
    document.body.innerHTML =
      "<label> " +
      ' <input type="number"  name="cvc"  id="cvc" value="123" />' +
      '     <p id="error" class="text__error">contains an error</p>' +
      " </label>";
    const mockEvent = {
      target: document.querySelector("#cvc"),
    };
    validateInput(mockEvent);
    expect(document.querySelector("#cvc + .text__error").textContent).toEqual(
      ""
    );
  });
  test("if an input is passed as a second arg it should be used instead e.target", () => {
    document.body.innerHTML =
      "<label> " +
      ' <input type="number"  name="cvc"  id="cvc" value="123" />' +
      '     <p id="error" class="text__error">contains an error</p>' +
      " </label>";
    const input = document.querySelector("#cvc");
    input.name = "cvc";
    validateInput(null, input);
    expect(document.querySelector("#cvc + .text__error").textContent).toEqual(
      ""
    );
  });
});

describe("resetValues", () => {
  test("should reset all values", () => {
    document.body.innerHTML =
      ' <div class="card__cvc">000</div>' +
      ' <p class="name">JANE APPLESSED</p>' +
      ' <p class="exp"><span id="mm">00</span>/<span id="yy">00</span></p>' +
      ' <span class="single__number">1</span>' +
      ' <span class="single__number">2</span>' +
      ' <span class="single__number">3</span>' +
      ' <span class="single__number">5</span>' +
      ' <input type="number"  name="cvc"  id="cvc" value="123" />' +
      ' <input type="number"  name="yy"  id="yy" value="123" />' +
      ' <input type="text"  name="mm"  id="mm" value="n" />' +
      ' <input type="number"  name="number"  id="number" value="00" />' +
      ' <input type="number"  name="name"  id="name" value="15" />';

    resetValues();
    document.querySelectorAll(".single__number").forEach((i) => {
      expect(i.textContent).toEqual("0");
    });
    document.querySelectorAll("input").forEach((i) => {
      expect(i.value).toEqual("");
    });

    expect(document.querySelector(".name").textContent).toEqual(
      "JANE APPLESSED"
    );
    expect(document.querySelector(".card__cvc").textContent).toEqual("000");
    expect(document.querySelector("#mm").textContent).toEqual("00");
    expect(document.querySelector("#yy").textContent).toEqual("00");
  });
});

describe("alternateViews", () => {
  test("should display complete content and hide labels", () => {
    document.body.innerHTML =
      '<form data-id="form" action="">' +
      ' <div class="complete">' +
      "    <p>We've added your card details</p>" +
      "  </div>" +
      " <label><input /></label>" +
      "  <label><input /></label>" +
      "  <label><input /></label>" +
      "   <label><input /></label>" +
      '  <button class="btn">' +
      '    <span id="setting">Confirm</span>' +
      '    <span class="complete__btn">Continue</span>' +
      " </button>" +
      "</form>";

    alternanteViews(
      {
        target: document.querySelector("form"),
      },
      true
    );

    document.querySelectorAll("label").forEach((label) => {
      expect(getComputedStyle(label).getPropertyValue("display")).toEqual(
        "none"
      );
    });
    expect(document.querySelector("#setting").style.display).toEqual("none");
    expect(document.querySelector(".complete").style.display).toEqual("flex");
    expect(document.querySelector(".complete__btn").style.display).toEqual(
      "initial"
    );
  });

  test("should should display form and hide complete content", () => {
    alternanteViews(
      {
        target: document.querySelector("form"),
      },
      false
    );

    document.querySelectorAll("label").forEach((label) => {
      expect(getComputedStyle(label).getPropertyValue("display")).toEqual(
        "block"
      );
    });
    expect(document.querySelector("#setting").style.display).toEqual("initial");
    expect(document.querySelector(".complete").style.display).toEqual("none");
    expect(document.querySelector(".complete__btn").style.display).toEqual(
      "none"
    );
  });
});
