import React from 'react';
import { CellProps } from '../types';

const Cell: React.FC<CellProps> = ({ rowIndex, colIndex, isHighlighted, onClick }) => {
  return (
    <div
      className={`
        relative flex items-center justify-center
        border border-gray-300 w-12 h-12
        transition-all duration-200 ease-in-out
        ${isHighlighted ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}
        cursor-pointer select-none
      `}
      onClick={() => onClick(rowIndex, colIndex)}
      aria-label={`Cell at row ${rowIndex}, column ${colIndex}`}
    >
      <span className="text-xs font-semibold">
        {rowIndex},{colIndex}
      </span>
    </div>
  );
};

export default Cell;