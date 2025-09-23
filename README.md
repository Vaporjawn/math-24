# Math 24 Game

A faithful recreation of the classic Math 24 game from First In Math, built with React, Vite, and Material-UI.

## Game Overview

Math 24 is a mathematical puzzle game where players must use four given numbers and basic arithmetic operations (+, -, ×, ÷) to create an expression that equals 24. Each number must be used exactly once.

## Features

- **Circular Number Wheel**: Numbers are arranged in a circle matching the original First In Math interface
- **Interactive Operation Buttons**: Click-based selection of arithmetic operations (+, -, ×, ÷)
- **Real-time Calculation**: Immediate feedback on mathematical expressions
- **Undo Functionality**: Step back through previous operations
- **Submit Validation**: Check if your solution equals 24
- **New Puzzle Generation**: Get fresh challenges with verified solvable puzzles
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Hover effects and transitions for enhanced user experience

## Technology Stack

- **React 19.1.1**: Modern functional components with hooks
- **TypeScript 5.8.3**: Full type safety and enhanced development experience
- **Vite 7.1.7**: Fast build tool and development server
- **Material-UI v5**: Complete UI component library with theming
- **Emotion**: CSS-in-JS styling with performance optimization

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (current version 22.6.0 works but shows warnings)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd math24-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the provided localhost URL (usually `http://localhost:5173`)

### Available Scripts

- `npm run dev`: Start development server with hot module replacement
- `npm run build`: Build production-ready application
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint for code quality checks

## How to Play

1. **Select Numbers**: Click on two numbers from the circular wheel
2. **Choose Operation**: Click one of the arithmetic operation buttons (+, -, ×, ÷)
3. **See Result**: The calculation result appears as a new number on the wheel
4. **Continue**: Keep combining numbers until you have one result
5. **Submit**: Click "Submit" when you think your result equals 24
6. **Undo**: Use "Undo" to step back through your operations
7. **New Puzzle**: Click "New Puzzle" to start fresh with different numbers

## Example Solutions

### Puzzle: [1, 1, 8, 8]
- Solution: `(8 ÷ (1 - 1 ÷ 8)) = 24`
- Step-by-step: 1 ÷ 8 = 0.125, then 1 - 0.125 = 0.875, then 8 ÷ 0.875 = 24

### Puzzle: [4, 1, 8, 7]
- Solution: `(8 - 4) × (7 - 1) = 24`
- Step-by-step: 8 - 4 = 4, then 7 - 1 = 6, then 4 × 6 = 24

### Puzzle: [1, 2, 3, 4]
- Solution: `(1 + 2 + 3) × 4 = 24`
- Step-by-step: 1 + 2 = 3, then 3 + 3 = 6, then 6 × 4 = 24

## Project Structure

```
src/
├── components/
│   └── Math24Game.tsx     # Main game component with UI and logic
├── App.tsx                # Application root component
├── main.tsx              # Application entry point with theming
└── vite-env.d.ts         # Vite environment types
```

## Key Features Implementation

### Circular Number Layout
Numbers are positioned using trigonometric calculations to create a perfect circle:
```typescript
const angle = (index * 360) / numbers.length;
const x = Math.cos((angle * Math.PI) / 180) * radius;
const y = Math.sin((angle * Math.PI) / 180) * radius;
```

### Game State Management
Comprehensive state tracking using React hooks:
- `currentNumbers`: Available numbers for selection
- `selectedNumbers`: Currently selected numbers for operation
- `selectedOperation`: Chosen arithmetic operation
- `gameHistory`: Stack of previous states for undo functionality
- `message`: User feedback and game status

### Mathematical Operations
Safe arithmetic operations with proper handling of:
- Division by zero protection
- Floating-point precision (rounded to 6 decimal places)
- Order of operations in complex expressions

### Material-UI Theming
Custom theme with:
- Primary color: Deep blue (#1976d2)
- Secondary color: Orange (#f57c00)
- Custom typography and spacing
- Consistent component styling throughout

## Development Notes

- **Type Safety**: Full TypeScript implementation with strict type checking
- **Performance**: Optimized with React.memo and strategic re-rendering
- **Accessibility**: Semantic HTML and ARIA attributes for screen readers
- **Responsive**: Mobile-friendly design with flexible layouts
- **Testing Ready**: Structure supports unit, integration, and E2E testing

## Known Issues

- Node.js version warning (22.6.0 vs required 22.12+) - functionality not affected
- Some complex puzzles may have multiple valid solutions

## Future Enhancements

- [ ] Hint system for when players get stuck
- [ ] Timer and scoring system
- [ ] Difficulty levels with more complex puzzles
- [ ] Multiplayer competition mode
- [ ] Solution history and statistics
- [ ] Custom puzzle creation
- [ ] Sound effects and enhanced animations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the original Math 24 game from First In Math
- Built with modern React and Material-UI best practices
- Thanks to the open-source community for the excellent tooling
