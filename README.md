<h1 align="center"> Matrix Visualizer for CP
  <p align="center">

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-1A1A1A?logo=vercel&logoColor=white)](https://matrix-visualizer-blush.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev/)

  </p>
 </h1>

A React-based interactive matrix visualization tool designed for competitive programming practice and algorithm visualization.

## Features

- Interactive grid-based matrix visualization
- Customizable matrix dimensions (up to 40x40)
- Cell highlighting with click interactions
- **Mouseless Navigation:** Navigate the grid using vim keys:
  - **h, j, k, l:** Move left, down, up, and right across the matrix.
  - **f:** Toggle the color of the currently selected cell.
  - **i:** Toggle between 0-based and 1-based indexing.
  - **r, c:** Jump to the rows or columns input fields (which clear on focus, updating on navigation if left empty).
  - **e:** Reset/erase the current cell coloring.
- Clean, responsive UI built with Tailwind CSS

## Demo

[Live Demo](https://matrix-visualizer.netlify.app/) 

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

- **Adjust Matrix Size:** Use the row and column inputs to resize the matrix (1-40 dimensions). The inputs automatically clear when focused via keyboard navigation and revert if no new value is entered.
- **Highlight Cells:** Click on any cell to highlight or unhighlight it.
- **Mouseless Navigation:** Use:
  - **h, j, k, l** to move the selection cursor around the matrix.
  - **f** to toggle the cell color.
  - **i** to switch indexing between 0-based and 1-based.
  - **r, c** to quickly jump to the rows or columns input fields.
  - **e** to reset/clear all highlighted cells.
- **Reset:** Click the reset button or press **e** to clear all highlighted cells.
- **Cell Coordinates:** Each cell displays its (row, column) coordinates.

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

This project is licensed under the GNU v3 License - see the [LICENSE](/LICENSE) file for details.

## Acknowledgments

- Inspired by the needs of competitive programmers to visualize matrix-based algorithms.
- Built with React and Tailwind CSS.

