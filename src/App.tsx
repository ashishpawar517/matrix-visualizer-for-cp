import { useState, useCallback, useEffect } from "react";
import ControlBar from "./components/ControlBar";
import Matrix from "./components/Matrix";
import { getCellKey } from "./utils/matrixUtils";
import { Analytics } from "@vercel/analytics/react";
import { MAX_COLOR_LEVEL } from "./utils/matrixUtils";

function App() {
  const [dimensions, setDimensions] = useState({
    rows: 10,
    cols: 10,
  });
  const [highlightedCells, setHighlightedCells] = useState<Map<string, number>>(
    new Map(),
  );
  const [useOneBased, setUseOneBased] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>({ row: 0, col: 0 });
  const [enableKeyboardNav, setEnableKeyboardNav] = useState(true);
  const [useChessLayout, setUseChessLayout] = useState(false);

  const handleRowsChange = useCallback((rows: number) => {
    setDimensions((prev) => ({ ...prev, rows }));
  }, []);

  const handleColsChange = useCallback((cols: number) => {
    setDimensions((prev) => ({ ...prev, cols }));
  }, []);

  const handleIndexingChange = useCallback((checked: boolean) => {
    setUseOneBased(checked);
  }, []);

  const handleChessLayoutChange = useCallback((checked: boolean) => {
    setUseChessLayout(checked);
  }, []);

  // Now takes an optional keyboardTriggered flag
  const handleCellClick = useCallback(
    (
      rowIndex: number,
      colIndex: number,
      keyboardTriggered: boolean = false,
    ) => {
      // on a mouse click, disable keyboard nav; not so on a keyboard trigger (f)
      if (!keyboardTriggered) {
        setEnableKeyboardNav(false);
      }

      setHighlightedCells((prev) => {
        const newHighlightedCells = new Map(prev);
        const cellKey = getCellKey(rowIndex, colIndex);

        if (newHighlightedCells.has(cellKey)) {
          const currentColor = newHighlightedCells.get(cellKey)!;
          if (currentColor < MAX_COLOR_LEVEL) {
            newHighlightedCells.set(cellKey, currentColor + 1);
          } else {
            newHighlightedCells.delete(cellKey);
          }
        } else {
          newHighlightedCells.set(cellKey, 1);
        }

        return newHighlightedCells;
      });
    },
    [],
  );

  const handleReset = useCallback(() => {
    setHighlightedCells(new Map());
    setEnableKeyboardNav(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["h", "j", "k", "l", "f", "i", "r", "c", "e"].includes(e.key)) {
        e.preventDefault();
      }

      // Deselect rows/cols inputs if a navigation key is pressed
      if (["h", "j", "k", "l"].includes(e.key)) {
        const activeEl = document.activeElement;
        if (
          activeEl instanceof HTMLInputElement &&
          (activeEl.id === "rows" || activeEl.id === "cols")
        ) {
          activeEl.blur();
        }
      }

      // Handle new custom keys regardless of nav state
      if (e.key === "i") {
        setUseOneBased((prev) => !prev);
        return;
      }
      if (e.key === "r") {
        document.getElementById("rows")?.focus();
        return;
      }
      if (e.key === "c") {
        document.getElementById("cols")?.focus();
        return;
      }
      if (e.key === "e") {
        handleReset();
        return;
      }

      // If keyboard navigation is disabled, only re-enable on "j"
      if (!enableKeyboardNav) {
        if (e.key === "j") {
          setEnableKeyboardNav(true);
          setSelectedCell({ row: 0, col: 0 });
        }
        return;
      }

      if (e.key === "f") {
        if (selectedCell) {
          // Call the click handler marking it as keyboard triggered so navigation stays enabled.
          handleCellClick(selectedCell.row, selectedCell.col, true);
        }
        return;
      }
      if (e.key === "h") {
        setSelectedCell((prev) => {
          const newCol = prev ? Math.max(prev.col - 1, 0) : 0;
          return prev
            ? { row: prev.row, col: newCol }
            : { row: 0, col: newCol };
        });
      }
      if (e.key === "l") {
        setSelectedCell((prev) => {
          const newCol = prev ? Math.min(prev.col + 1, dimensions.cols - 1) : 0;
          return prev
            ? { row: prev.row, col: newCol }
            : { row: 0, col: newCol };
        });
      }
      if (e.key === "k") {
        setSelectedCell((prev) => {
          const newRow = prev ? Math.max(prev.row - 1, 0) : 0;
          return prev
            ? { row: newRow, col: prev.col }
            : { row: newRow, col: 0 };
        });
      }
      if (e.key === "j") {
        setSelectedCell((prev) => {
          if (!prev) {
            return { row: 0, col: 0 };
          }
          const newRow = Math.min(prev.row + 1, dimensions.rows - 1);
          return { row: newRow, col: prev.col };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    enableKeyboardNav,
    selectedCell,
    dimensions,
    handleCellClick,
    handleReset,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <ControlBar
          rows={dimensions.rows}
          cols={dimensions.cols}
          useOneBased={useOneBased}
          useChessLayout={useChessLayout}
          onRowsChange={handleRowsChange}
          onColsChange={handleColsChange}
          onIndexingChange={handleIndexingChange}
          onChessLayoutChange={handleChessLayoutChange}
          onReset={handleReset}
        />

        <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
          <Matrix
            rows={dimensions.rows}
            cols={dimensions.cols}
            highlightedCells={highlightedCells}
            useOneBased={useOneBased}
            useChessLayout={useChessLayout}
            onCellClick={handleCellClick}
            selectedCell={enableKeyboardNav ? selectedCell : null}
          />
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Use <strong>h j k l</strong> keys to navigate the grid.
            Press <strong>f</strong> to toggle cell colors. Press <strong>i</strong> to change indexing,
              <strong> r c</strong> for jump to rows & columns input, 
            <strong> e</strong> to reset/erase the coloring. 
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
