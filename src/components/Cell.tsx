import React from "react";

interface CellProps {
  rowIndex: number;
  colIndex: number;
  displayRowIndex: number;
  displayColIndex: number;
  colorIndex: number;
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

  const colorClass = colorIndex > 0 ? colorClasses[colorIndex] : "";

  // If this cell is selected via keyboard, apply a stripe background.
  // Adjust these style values as needed.
  const stripeStyle = isSelected
    ? {
        backgroundImage:
          "repeating-linear-gradient(120deg, #cccccc, #cccccc 5px, transparent 5px, transparent 10px)",
      }
    : {};

  return (
    <div
      className={`w-12 h-12 border border-gray-300 flex items-center justify-center cursor-pointer transition-colors duration-150 ${colorClass}`}
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
