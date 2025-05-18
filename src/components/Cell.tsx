import React from 'react';

interface CellProps {
  rowIndex: number;
  colIndex: number;
  displayRowIndex: number;
  displayColIndex: number;
  colorIndex: number;
  onClick: (rowIndex: number, colIndex: number) => void;
}

const Cell: React.FC<CellProps> = ({ 
  rowIndex, 
  colIndex, 
  displayRowIndex, 
  displayColIndex, 
  colorIndex, 
  onClick 
}) => {
  // Define color palette for different highlight levels
  const colorClasses = [
    '', // Not used (index 0)
    'bg-blue-200',   // Color 1
    'bg-orange-200', // Color 2
    'bg-yellow-200', // Color 3
    'bg-red-200',    // Color 4
    'bg-purple-200'  // Color 5
  ];

  const colorClass = colorIndex > 0 ? colorClasses[colorIndex] : '';
  
  return (
    <div
      className={`w-12 h-12 border border-gray-300 flex items-center justify-center cursor-pointer transition-colors duration-150 ${colorClass}`}
      onClick={() => onClick(rowIndex, colIndex)}
    >
      <span className="text-sm text-black-600">{displayRowIndex},{displayColIndex}</span>
    </div>
  );
};

export default Cell;