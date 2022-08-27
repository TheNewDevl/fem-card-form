describe("Validator class suite test", () => {
  const { Validator } = require("../js/utils");

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
