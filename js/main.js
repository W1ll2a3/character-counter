import { elements, config } from './domElements.js';
import { 
  formatNumber, 
  calculateCharCount, 
  countWords, 
  countSentences, 
  generateFrequencyMap, 
  getCharacterLimit,
  updateReadingTime,
  truncateExcludingSpaces
} from './functions.js';

document.addEventListener("DOMContentLoaded", () => {
  const TextAnalyzer = (() => {
    // Error Handling Functions
    function updateErrorMessage(limit, charCount, isApproaching = false) {
      if (charCount < Math.floor(limit * 0.9)) {
        elements.limitErrorElem.innerHTML = `<span class="alert-icon"><img src="./images/info-circle.svg" alt=""></span> Character count: ${charCount}/${limit}`;
        elements.limitErrorElem.style.color = "hsl(274, 90%, 80%)";
      } else if (isApproaching) {
        elements.limitErrorElem.innerHTML = `<span class="alert-icon"><img src="./images/info-circle.svg" alt=""></span> Approaching limit! ${charCount}/${limit} characters.`;
        elements.limitErrorElem.style.color = "orange";
      } else {
        elements.limitErrorElem.innerHTML = `<span class="alert-icon"><img src="./images/info-circle.svg" alt=""></span> Limit reached! ${charCount}/${limit} characters.`;
        elements.limitErrorElem.style.color = "red";
      }
    }

    function showLimitError(limit, charCount, isApproaching = false) {
      updateErrorMessage(limit, charCount, isApproaching);
      elements.limitErrorElem.style.display = "flex";
      if (charCount >= limit) {
        elements.textarea.style.outline = "2px solid #fe8158";
        elements.textarea.style.boxShadow = "1px 1px 10px 1px #fe8158";
      } else {
        elements.textarea.style.outline = "";
        elements.textarea.style.boxShadow = "none";
      }
    }

    function hideLimitError() {
      elements.limitErrorElem.style.display = "none";
      elements.textarea.style.outline = "";
      elements.textarea.style.boxShadow = "none";
    }

    // Text Analysis Core Functions
    function generateDensityHTML(letters, totalLetters) {
      const frequencyMap = generateFrequencyMap(letters);
      const sortedLetters = Object.entries(frequencyMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, config.initialShowCount);

      return sortedLetters
        .map(
          ([letter, count]) => `
            <div class="progress-wrapper">
              <span class="progress-label">${letter}</span>
              <div class="progress-container">
                <div class="progress-bar" style="width: ${(count / totalLetters) * 100}%"></div>
              </div>
              <span class="progress-percentage">${((count / totalLetters) * 100).toFixed(1)}%</span>
            </div>
          `
        )
        .join("");
    }

    function clearLetterDensityContent() {
      elements.letterDensityContainer.innerHTML = `<h2 id="density-heading">Letter Density</h2>`;
    }

    function showNoDataMessage() {
      elements.noDataMessage.style.display = "block";
    }

    function hideNoDataMessage() {
      elements.noDataMessage.style.display = "none";
    }

    function toggleRemainingLetters() {
      const remainingLetters = document.querySelectorAll(".progress-wrapper");
      remainingLetters.forEach((letter, index) => {
        if (index >= config.initialShowCount) {
          letter.style.display = letter.style.display === "none" ? "flex" : "none";
        }
      });
    }

    function configureSeeMoreButton() {
      elements.seeMoreButton.addEventListener("click", () => {
        toggleRemainingLetters();
        const isExpanded = elements.seeMoreButton.querySelector("span").style.transform === "rotate(90deg)";
        elements.seeMoreButton.querySelector("span").style.transform = isExpanded ? "rotate(0deg)" : "rotate(90deg)";
        elements.seeMoreButton.querySelector("p").textContent = isExpanded ? "See more" : "See less";
      });
    }

    function setupSeeMoreFunctionality(remainingLetters, totalLetters) {
      if (remainingLetters.length > config.initialShowCount) {
        elements.seeMoreButton.style.display = "flex";
        configureSeeMoreButton();
      } else {
        elements.seeMoreButton.style.display = "none";
      }
    }

    function displayLetterFrequency(letters, totalLetters) {
      if (letters.length === 0) {
        showNoDataMessage();
        return;
      }

      hideNoDataMessage();
      clearLetterDensityContent();
      const densityHTML = generateDensityHTML(letters, totalLetters);
      elements.letterDensityContainer.insertAdjacentHTML("beforeend", densityHTML);

      const remainingLetters = document.querySelectorAll(".progress-wrapper");
      setupSeeMoreFunctionality(remainingLetters, totalLetters);
    }

    function updateLetterDensity(text) {
      const letters = text.toLowerCase().match(/[a-z]/g) || [];
      const totalLetters = letters.length;
      displayLetterFrequency(letters, totalLetters);
    }

    function enforceCharacterLimit(text, limit, excludeSpaces) {
      if (excludeSpaces) {
        return truncateExcludingSpaces(text, limit);
      }
      return text.slice(0, limit);
    }

    function toggleCharacterLimitInput() {
      const isChecked = elements.characterLimitCheckbox.checked;
      elements.characterLimitInput.style.visibility = isChecked ? "visible" : "hidden";
      elements.characterLimitInput.style.height = isChecked ? "auto" : "8px";
      elements.characterLimitInput.style.padding = isChecked ? "10px 0.3rem" : "10px 0.3rem";

      if (!isChecked) {
        elements.characterLimitInput.value = "";
        hideLimitError();
      }
    }

    function checkCharacterLimit() {
      const limit = getCharacterLimit();
      if (!limit) return;

      const text = elements.textarea.value;
      const excludeSpaces = elements.excludeSpacesCheckbox.checked;
      const charCount = calculateCharCount(text, excludeSpaces);

      if (charCount > limit) {
        const truncatedText = enforceCharacterLimit(text, limit, excludeSpaces);
        elements.textarea.value = truncatedText;
        showLimitError(limit, limit);
      } else if (charCount >= Math.floor(limit * 0.9)) {
        showLimitError(limit, charCount, true);
      } else if (charCount > 0) {
        showLimitError(limit, charCount);
      } else {
        hideLimitError();
      }
    }

    function updateAnalysis() {
      const text = elements.textarea.value;
      const excludeSpaces = elements.excludeSpacesCheckbox.checked;

      // Update character count
      const charCount = calculateCharCount(text, excludeSpaces);
      elements.totalCharElem.textContent = formatNumber(charCount);
      elements.totalCharLabelElem.textContent = excludeSpaces ? "Characters (no spaces)" : "Total Characters";

      // Update word count
      const words = countWords(text);
      elements.wordCountElem.textContent = formatNumber(words.length);

      // Update sentence count
      const sentences = countSentences(text);
      elements.sentenceCountElem.textContent = formatNumber(sentences.length);

      // Update reading time
      updateReadingTime(words.length);

      // Update letter density
      updateLetterDensity(text);

      // Check character limit if enabled
      if (elements.characterLimitCheckbox.checked) {
        checkCharacterLimit();
      }
    }

    function handleTextInput() {
      updateAnalysis();
    }

    function setTheme(isDark) {
      elements.body.classList.toggle("dark-theme", isDark);
      const logoPath = isDark ? "./assets/images/logo-dark-theme.svg" : "./assets/images/logo-light-theme.svg";
      const themeIconPath = isDark ? "./assets/images/icon-sun.svg" : "./assets/images/icon-moon.svg";
      elements.logo.src = logoPath;
      elements.themeToggleIcon.src = themeIconPath;
      localStorage.setItem("darkTheme", isDark);
    }

    function toggleTheme() {
      const isDark = elements.body.classList.contains("dark-theme");
      setTheme(!isDark);
    }

    function initializeTheme() {
      const savedTheme = localStorage.getItem("darkTheme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(savedTheme ? JSON.parse(savedTheme) : prefersDark);
    }

    function initializeEventListeners() {
      elements.textarea.addEventListener("input", handleTextInput);
      elements.excludeSpacesCheckbox.addEventListener("change", updateAnalysis);
      elements.characterLimitCheckbox.addEventListener("change", toggleCharacterLimitInput);
      elements.characterLimitInput.addEventListener("input", checkCharacterLimit);
      elements.themeToggleButton.addEventListener("click", toggleTheme);
    }

    function init() {
      initializeTheme();
      initializeEventListeners();
      updateAnalysis();
    }

    return {
      init
    };
  })();

  TextAnalyzer.init();
});