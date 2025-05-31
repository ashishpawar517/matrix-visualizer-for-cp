import React from "react";

interface CellProps {
  rowIndex: number;
  colIndex: number;
  displayRowIndex: number;
  displayColIndex: number;
  colorIndex: number;
  useChessLayout: boolean;
  onClick: (rowIndex: number, colIndex: number) => void;
  // new optional prop to flag cell selected via keyboard nav
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

  // Define custom styles for pattern
  const getStyle = () => {
    if (colorIndex === 2) {
      return {
        backgroundColor: 'rgb(254, 215, 170)', // orange-200 color
        backgroundImage: 'repeating-linear-gradient(120deg, transparent, transparent 10px, rgba(0,0,0,0.1) 11px, rgba(0,0,0,0.1) 12px)'
      };
    }
    return {};
  };

  // Determine background class based on chess layout and color index
  let bgClass = "";
  
  if (colorIndex > 0) {
    // If cell has a color, use that color (pattern for color 2 is handled by getStyle)
    if (colorIndex !== 2) {
      bgClass = colorClasses[colorIndex];
    }
  } else if (useChessLayout) {
    // If chess layout is enabled and cell doesn't have a color, apply chess pattern
    bgClass = (rowIndex + colIndex) % 2 === 0 ? "bg-gray-200" : "";
  }

  // If this cell is selected via keyboard, apply a stripe background
  const stripeStyle = isSelected
    ? {
        backgroundImage:
          "repeating-linear-gradient(120deg, #cccccc, #cccccc 5px, transparent 5px, transparent 10px)",
      }
    : (colorIndex === 2 ? getStyle() : {});

  return (
    <div
      className={`w-12 h-12 border border-gray-300 flex items-center justify-center cursor-pointer transition-colors duration-150 ${bgClass}`}
      style={stripeStyle}
      onClick={() => onClick(rowIndex, colIndex)}
    >
      <span className="text-sm text-black-600">
        {displayRowIndex},{displayColIndex}
      </span>
    </div>
  );
};

export default Cell;
