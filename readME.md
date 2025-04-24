# Character Counter

A real-time text analyzer application that provides detailed statistics about your text, including character count, word count, sentence count, and letter density analysis.

## Features

- **Real-time Text Analysis**: Get instant feedback as you type
- **Character Counting**: 
  - Total character count
  - Option to exclude spaces
  - Custom character limit with warnings
- **Word & Sentence Analysis**:
  - Word count
  - Sentence count
  - Estimated reading time
- **Letter Density Analysis**:
  - Visual representation of letter frequency
  - Percentage breakdown of each letter
  - Expandable view for more detailed analysis
- **Dark/Light Theme**:
  - Automatic theme detection based on system preferences
  - Manual theme toggle
  - Theme persistence across sessions

## Technologies Used

- HTML5
- CSS3
  - CSS Variables for theming
  - Flexbox for layout
  - Media queries for responsiveness
- JavaScript (ES6+)
  - Module pattern for organization
  - DOM manipulation
  - Event handling
  - Local storage for theme persistence

## Project Structure

```
character-counter/
├── assets/
│   └── images/
│       ├── logo-light-theme.svg
│       ├── logo-dark-theme.svg
│       ├── icon-moon.svg
│       ├── icon-sun.svg
│       ├── info-circle.svg
│       ├── pattern-character-count.svg
│       ├── pattern-word-count.svg
│       └── pattern-sentence-count.svg
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── index.html
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/W1ll2a3/character-counter
```

2. Navigate to the project directory:
```bash
cd character-counter
```

3. Open `index.html` in your web browser

## Usage

1. Start typing or paste your text into the text area
2. Use the options to customize your analysis:
   - Toggle "Exclude Spaces" to count characters without spaces
   - Set a character limit to get warnings when approaching/exceeding the limit
3. View real-time statistics:
   - Character count
   - Word count
   - Sentence count
   - Estimated reading time
   - Letter density analysis
4. Toggle between light and dark themes using the theme switcher

## Features in Detail

### Character Analysis
- Real-time character counting
- Option to exclude spaces from count
- Custom character limit with visual warnings
- Warning at 90% of limit
- Error state when limit is exceeded

### Word & Sentence Analysis
- Accurate word counting
- Sentence detection based on punctuation
- Estimated reading time calculation
- Dynamic updates as you type

### Letter Density
- Visual representation of letter frequency
- Percentage breakdown for each letter
- Top 5 letters shown by default
- Expandable view for complete analysis
- Empty state handling

### Theme Support
- System preference detection
- Manual theme toggle
- Persistent theme selection
- Smooth transitions between themes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font: [DM Sans](https://fonts.google.com/specimen/DM+Sans)
- Icons: Custom SVG icons
- Design: Custom design implementation
