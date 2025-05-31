import React, { useState, useEffect } from "react";
import { Grid, RefreshCw } from "lucide-react";

interface ControlBarProps {
  rows: number;
  cols: number;
  useOneBased: boolean;
  useChessLayout: boolean;
  onRowsChange: (rows: number) => void;
  onColsChange: (cols: number) => void;
  onIndexingChange: (checked: boolean) => void;
  onChessLayoutChange: (checked: boolean) => void;
  onReset: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
  rows,
  cols,
  useOneBased,
  useChessLayout,
  onRowsChange,
  onColsChange,
  onIndexingChange,
  onChessLayoutChange,
  onReset,
}) => {
  const [rowsInput, setRowsInput] = useState(rows.toString());
  const [colsInput, setColsInput] = useState(cols.toString());

  // Keep local input state in sync with props
  useEffect(() => {
    setRowsInput(rows.toString());
  }, [rows]);

  useEffect(() => {
    setColsInput(cols.toString());
  }, [cols]);

  const handleRowsBlur = () => {
    if (rowsInput.trim() === "") {
      // Revert to last value if nothing was entered
      setRowsInput(rows.toString());
    } else {
      // Update parent's value
      const parsed = parseInt(rowsInput, 10);
      if (!isNaN(parsed)) {
        onRowsChange(parsed);
      }
    }
  };

  const handleColsBlur = () => {
    if (colsInput.trim() === "") {
      setColsInput(cols.toString());
    } else {
      const parsed = parseInt(colsInput, 10);
      if (!isNaN(parsed)) {
        onColsChange(parsed);
      }
    }
  };

  return (
    <div className="bg-white shadow-md py-4 px-6 mb-4 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <Grid className="text-blue-500" size={24} />
          <h1 className="text-xl font-bold text-gray-800">Matrix Visualizer</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="indexing"
              checked={useOneBased}
              onChange={(e) => onIndexingChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="indexing"
              className="text-sm font-medium text-gray-700"
            >
              1-based indexing
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="chessLayout"
              checked={useChessLayout}
              onChange={(e) => onChessLayoutChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="chessLayout"
              className="text-sm font-medium text-gray-700"
            >
              Chess layout
            </label>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="rows" className="text-sm font-medium text-gray-700">
              Rows:
            </label>
            <input
              id="rows"
              type="number"
              value={rowsInput}
              onFocus={() => setRowsInput("")}
              onBlur={handleRowsBlur}
              onKeyDown={(e) => {
                if (["h", "j", "k", "l"].includes(e.key)) {
                  e.currentTarget.blur();
                }
              }}
              onChange={(e) => setRowsInput(e.target.value)}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="cols" className="text-sm font-medium text-gray-700">
              Columns:
            </label>
            <input
              id="cols"
              type="number"
              value={colsInput}
              onFocus={() => setColsInput("")}
              onBlur={handleColsBlur}
              onKeyDown={(e) => {
                if (["h", "j", "k", "l"].includes(e.key)) {
                  e.currentTarget.blur();
                }
              }}
              onChange={(e) => setColsInput(e.target.value)}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              aria-label="Reset matrix highlights"
            >
              <RefreshCw size={16} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
