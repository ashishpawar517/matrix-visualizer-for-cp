import React, { useState, useCallback } from 'react';
import ControlBar from './components/ControlBar';
import Matrix from './components/Matrix';
import { getCellKey } from './utils/matrixUtils';

function App() {
  // State for matrix dimensions
  const [dimensions, setDimensions] = useState({
    rows: 10,
    cols: 10
  });
  
  // State for highlighted cells
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());

  // Handle row change
  const handleRowsChange = useCallback((rows: number) => {
    setDimensions(prev => ({ ...prev, rows }));
  }, []);

  // Handle column change
  const handleColsChange = useCallback((cols: number) => {
    setDimensions(prev => ({ ...prev, cols }));
  }, []);

  // Handle cell click
  const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
    setHighlightedCells(prev => {
      const newHighlightedCells = new Set(prev);
      const cellKey = getCellKey(rowIndex, colIndex);
      
      if (newHighlightedCells.has(cellKey)) {
        newHighlightedCells.delete(cellKey);
      } else {
        newHighlightedCells.add(cellKey);
      }
      
      return newHighlightedCells;
    });
  }, []);

  // Reset all highlights
  const handleReset = useCallback(() => {
    setHighlightedCells(new Set());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <ControlBar
          rows={dimensions.rows}
          cols={dimensions.cols}
          onRowsChange={handleRowsChange}
          onColsChange={handleColsChange}
          onReset={handleReset}
        />
        
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
          <Matrix
            rows={dimensions.rows}
            cols={dimensions.cols}
            highlightedCells={highlightedCells}
            onCellClick={handleCellClick}
          />
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Click on any cell to highlight or unhighlight it</p>
          <p className="mt-1">
            Highlighted cells: {highlightedCells.size}
          </p>
          <p className="mt-4 text-blue-600 font-medium">
            ⭐ Star the repo on <a 
              href="https://github.com/ashishpawar517/matrix-visualizer-for-cp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-blue-800"
            >
              GitHub
            </a> if this is helpful for you!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
