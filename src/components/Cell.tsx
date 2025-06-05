import React from "react";

interface CellProps {
  rowIndex: number;
  colIndex: number;
  displayRowIndex: number;
  displayColIndex: number;
  colorIndex: number;
  useChessLayout: boolean;
  onClick: (rowIndex: number, colIndex: number) => void;
  isSelected?: boolean;
}

const Cell: React.FC<CellProps> = ({
  rowIndex,
  colIndex,
  displayRowIndex,
  displayColIndex,
  colorIndex,
  useChessLayout,
  onClick,
  isSelected,
}) => {
  // Define color palette for different highlight levels
  const colorClasses = [
    "", // Not used (index 0)
    "bg-blue-200", // Color 1
    "bg-orange-200", // Color 2
    "bg-yellow-200", // Color 3
    "bg-red-200", // Color 4
    "bg-purple-200", // Color 5
  ];

  // Determine background class based on chess layout and color index
  let bgClass = "";

  if (colorIndex > 0) {
    // If cell has a color, use that color from colorClasses array
    bgClass = colorClasses[colorIndex];
  } else if (useChessLayout) {
    // If chess layout is enabled and cell doesn't have a color, apply chess pattern
    bgClass = (rowIndex + colIndex) % 2 === 0 ? "bg-gray-200" : "";
  }

  // Create striped pattern for selected cells
  const cellStyle = isSelected
    ? {
        backgroundImage: 
          "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 10px)",
        // This keeps the original background color visible under the stripes
      }
    : {};

  return (
    <div
      className={`w-12 h-12 border border-gray-300 flex items-center justify-center cursor-pointer transition-colors duration-150 ${bgClass}`}
      style={cellStyle}
      onClick={() => onClick(rowIndex, colIndex)}
    >
      <span className="text-sm text-black-600">
        {displayRowIndex},{displayColIndex}
      </span>
    </div>
  );
};

export default Cell;
