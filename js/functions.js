import { elements, config } from './domElements.js';

// Utility Functions
export function formatNumber(num) {
  return num.toString().padStart(2, "0");
}

export function calculateCharCount(text, excludeSpaces) {
  return excludeSpaces ? text.replace(/\s/g, "").length : text.length;
}

export function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

export function countSentences(text) {
  return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
}

export function generateFrequencyMap(letters) {
  return letters.reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {});
}

export function getCharacterLimit() {
  return parseInt(elements.characterLimitInput.value) || 0;
}

export function updateReadingTime(wordCount) {
  const minutes = wordCount / config.wordsPerMinute;
  
  let readingTimeText;
  if (wordCount === 0 || minutes < 1) {
    readingTimeText = "<1 min";
  } else if (minutes < 1.5) {
    readingTimeText = "1 min";
  } else {
    readingTimeText = `${Math.round(minutes)} mins`;
  }
  
  elements.readingTimeElem.textContent = `Approx. reading time: ${readingTimeText}`;
}

export function truncateExcludingSpaces(text, limit) {
  let result = "";
  let charCount = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] !== " ") {
      if (charCount >= limit) break;
      charCount++;
    }
    result += text[i];
  }

  return result;
}