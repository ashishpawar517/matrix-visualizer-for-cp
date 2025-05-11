/**
 * Generates a key for a cell based on its row and column indices
 */
export const getCellKey = (rowIndex: number, colIndex: number): string => {
  return `${rowIndex},${colIndex}`;
};

/**
 * Creates a new matrix with the specified dimensions
 */
export const createMatrix = (rows: number, cols: number): number[][] => {
  return Array(rows).fill(0).map(() => Array(cols).fill(0));
};