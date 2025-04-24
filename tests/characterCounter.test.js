import { applyTheme, toggleTheme } from "../js/utils";

describe("Theme toggling", () => {
  beforeEach(() => {
    // Set up a mock HTML environment
    document.documentElement.dataset.theme = "light";
    localStorage.clear();
  });

  test("should toggle from light to dark", () => {
    toggleTheme();
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  test("should toggle from dark to light", () => {
    document.documentElement.dataset.theme = "dark";
    toggleTheme();
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
