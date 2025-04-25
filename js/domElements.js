export const elements = {
    textarea: document.getElementById("text"),
    excludeSpacesCheckbox: document.getElementById("exclude-spaces"),
    characterLimitCheckbox: document.getElementById("character-limit"),
    characterLimitInput: document.getElementById("character-limit-value"),
    totalCharElem: document.querySelector(".stat-card--characters .stat-card-number"),
    totalCharLabelElem: document.getElementById("total-char-label"),
    wordCountElem: document.querySelector(".stat-card--words .stat-card-number"),
    sentenceCountElem: document.querySelector(".stat-card--sentences .stat-card-number"),
    letterDensityContainer: document.querySelector(".letter-density"),
    noDataMessage: document.querySelector(".letter-density .empty-state-message"),
    seeMoreButton: document.querySelector(".expand-button"),
    textInputContainer: document.querySelector(".text-input-wrapper"),
    limitErrorElem: document.getElementById("limit-error"),
    readingTimeElem: document.getElementById("reading-time"),
    themeToggleButton: document.querySelector(".theme-toggle button"),
    themeToggleIcon: document.querySelector(".theme-toggle button img"),
    logo: document.querySelector(".app-logo img"),
    body: document.body
  };
  
  export const config = {
    initialShowCount: 5,
    wordsPerMinute: 200 // Average adult reading speed
  };