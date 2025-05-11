import React from 'react';
import Cell from './Cell';
import { MatrixProps } from '../types';

const Matrix: React.FC<MatrixProps> = ({ rows, cols, highlightedCells, onCellClick }) => {
  // Generate the matrix
  const renderMatrix = () => {
    const matrix = [];
    
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const cellKey = `${i},${j}`;
        row.push(
          <Cell
            key={cellKey}
            rowIndex={i}
            colIndex={j}
            isHighlighted={highlightedCells.has(cellKey)}
            onClick={onCellClick}
          />
        );
      }
      matrix.push(
        <div key={`row-${i}`} className="flex">
          {row}
        </div>
      );
    }
    
    return matrix;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 overflow-auto">
      <div 
        className="mx-auto border border-gray-300 shadow-lg"
        style={{ maxHeight: 'calc(100vh - 180px)' }}
      >
        {renderMatrix()}
      </div>
    </div>
  );
};

export default Matrix;