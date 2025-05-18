import React, { useState, useCallback } from "react";
import ControlBar from "./components/ControlBar";
import Matrix from "./components/Matrix";
import { getCellKey } from "./utils/matrixUtils";
import { Analytics } from "@vercel/analytics/react";
import { MAX_COLOR_LEVEL } from "./utils/matrixUtils";

function App() {
  // State for matrix dimensions
  const [dimensions, setDimensions] = useState({
    rows: 10,
    cols: 10,
  });

  // State for colored cells: mapping cell key -> color index (1 to 5)
  const [highlightedCells, setHighlightedCells] = useState<Map<string, number>>(
    new Map(),
  );

  // State for 1-based indexing
  const [useOneBased, setUseOneBased] = useState(false);

  // Handle row change
  const handleRowsChange = useCallback((rows: number) => {
    setDimensions((prev) => ({ ...prev, rows }));
  }, []);

  // Handle column change
  const handleColsChange = useCallback((cols: number) => {
    setDimensions((prev) => ({ ...prev, cols }));
  }, []);

  // Handle indexing change
  const handleIndexingChange = useCallback((checked: boolean) => {
    setUseOneBased(checked);
  }, []);

  // Handle cell click
  const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
    setHighlightedCells((prev) => {
      const newHighlightedCells = new Map(prev);
      const cellKey = getCellKey(rowIndex, colIndex);

      // console.log(`Cell clicked: ${rowIndex},${colIndex} (key: ${cellKey})`);
      // console.log(
      //   `Current state: ${
      //     newHighlightedCells.has(cellKey)
      //       ? `Color ${newHighlightedCells.get(cellKey)}`
      //       : "Uncolored"
      //   }`,
      // );

      if (newHighlightedCells.has(cellKey)) {
        const currentColor = newHighlightedCells.get(cellKey)!;
        if (currentColor < MAX_COLOR_LEVEL) {
          newHighlightedCells.set(cellKey, currentColor + 1);
          // console.log(`New color: ${currentColor + 1}`);
        } else {
          newHighlightedCells.delete(cellKey);
          // console.log("Reset to uncolored");
        }
      } else {
        newHighlightedCells.set(cellKey, 1);
        // console.log("Set to color 1");
      }

      return newHighlightedCells;
    });
  }, []);

  // Reset all highlights
  const handleReset = useCallback(() => {
    setHighlightedCells(new Map());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <ControlBar
          rows={dimensions.rows}
          cols={dimensions.cols}
          useOneBased={useOneBased}
          onRowsChange={handleRowsChange}
          onColsChange={handleColsChange}
          onIndexingChange={handleIndexingChange}
          onReset={handleReset}
        />

        <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
          <Matrix
            rows={dimensions.rows}
            cols={dimensions.cols}
            highlightedCells={highlightedCells}
            useOneBased={useOneBased}
            onCellClick={handleCellClick}
          />
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Click on any cell to cycle through colors (up to 5) or reset back to
            uncolored
          </p>
          <p className="mt-1">Colored cells: {highlightedCells.size}</p>
          <p className="mt-4 text-blue-600 font-medium">
            ⭐ Star the repo on{" "}
            <a
              href="https://github.com/ashishpawar517/matrix-visualizer-for-cp"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-800"
            >
              GitHub
            </a>{" "}
            if this is helpful for you!
          </p>
        </div>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
