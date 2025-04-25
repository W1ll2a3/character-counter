import {
    formatNumber,
    calculateCharCount,
    countWords,
    countSentences,
    generateFrequencyMap,
    truncateExcludingSpaces
  } from '../js/functions.js';
  
  describe('Text Analysis Functions', () => {
    describe('formatNumber', () => {
      it('should format single-digit numbers with leading zero', () => {
        expect(formatNumber(5)).toBe("05");
      });
  
      it('should not modify two-digit numbers', () => {
        expect(formatNumber(12)).toBe("12");
      });
    });
  
    describe('calculateCharCount', () => {
      it('should count all characters including spaces', () => {
        expect(calculateCharCount("hello world", false)).toBe(11);
      });
  
      it('should exclude spaces when requested', () => {
        expect(calculateCharCount("hello world", true)).toBe(10);
      });
    });
  
    describe('countWords', () => {
      it('should count words correctly', () => {
        expect(countWords("hello world").length).toBe(2);
      });
  
      it('should ignore multiple spaces', () => {
        expect(countWords("hello    world").length).toBe(2);
      });
    });
  
    describe('countSentences', () => {
      it('should count sentences correctly', () => {
        expect(countSentences("Hello. World!").length).toBe(2);
      });
  
      it('should ignore empty sentences', () => {
        expect(countSentences("Hello.. World!").length).toBe(2);
      });
    });
  
    describe('generateFrequencyMap', () => {
      it('should generate correct letter frequencies', () => {
        const letters = ['a', 'b', 'a', 'c', 'b', 'a'];
        const frequencyMap = generateFrequencyMap(letters);
        expect(frequencyMap).toEqual({ a: 3, b: 2, c: 1 });
      });
    });
  
    
    
  });