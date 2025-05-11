# Matrix Visualizer for CP

A React-based interactive matrix visualization tool designed for competitive programming practice and algorithm visualization.

## Features

- Interactive grid-based matrix visualization
- Customizable matrix dimensions (up to 40x40)
- Cell highlighting with click interactions
- Clean, responsive UI built with Tailwind CSS

## Demo

[Live Demo](https://your-demo-link-here.com) 

<!-- ![Matrix Visualizer Screenshot](./screenshot.png) -->

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ashishpawar517/matrix-visualizer-for-cp.git
```

2. Navigate to the project directory:

```bash
cd matrix-visualizer-for-cp
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## Usage

- **Adjust Matrix Size**: Use the row and column inputs to resize the matrix (1-40 dimensions)
- **Highlight Cells**: Click on any cell to highlight or unhighlight it
- **Reset**: Click the reset button to clear all highlighted cells
- **Cell Coordinates**: Each cell displays its (row, column) coordinates

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- Vite for fast development and building
- Lucide React for icons

## Project Structure

```
src/
├── components/
│   ├── Cell.tsx         # Individual cell component
│   ├── ControlBar.tsx   # Controls for matrix dimensions and reset
│   └── Matrix.tsx       # Main matrix grid component
├── types/
│   └── index.ts         # TypeScript interfaces
├── utils/
│   └── matrixUtils.ts   # Utility functions for matrix operations
└── App.tsx              # Main application component
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the needs of competitive programmers to visualize matrix-based algorithms
- Built with React and Tailwind CSS

