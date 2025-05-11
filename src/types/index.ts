export interface CellProps {
  rowIndex: number;
  colIndex: number;
  isHighlighted: boolean;
  onClick: (rowIndex: number, colIndex: number) => void;
}

export interface MatrixProps {
  rows: number;
  cols: number;
  highlightedCells: Set<string>;
  onCellClick: (rowIndex: number, colIndex: number) => void;
}

export interface ControlBarProps {
  rows: number;
  cols: number;
  onRowsChange: (rows: number) => void;
  onColsChange: (cols: number) => void;
  onReset: () => void;
}