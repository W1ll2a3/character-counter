const {
  getWordCount,
  getSentenceCount,
  countCharacters,
  estimateReadingTime,
} = require("../js/utils.js");

describe("Letter analysis utilties", () => {
  describe("getWordCount()", () => {
    test("returns 2 for 'Hello world'", () => {
      expect(getWordCount("Hello world")).toBe(2);
    });

    test("returns 0 for empty string", () => {
      expect(getWordCount("")).toBe(0);
    });

    test("trims extra spaces", () => {
      expect(getWordCount("  one  two  three  ")).toBe(3);
    });
  });

  describe("getSentenceCount()", () => {
    test("sentence count works", () => {
      expect(getSentenceCount("Hi. Bye? Wait!")).toBe(3);
    });
  });

  describe("countCharacters()", () => {
    expect(countCharacters("a b c", true)).toBe(3);
  });

  describe("estimateReadingTime()", () => {
    test("reading time is correct", () => {
      const text = "word ".repeat(400);
      expect(estimateReadingTime(text)).toBe(2);
    });
  });
});
