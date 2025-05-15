import React, { useState, useEffect } from 'react'
import { ControlBarProps } from '../types'
import { Grid, RefreshCw } from 'lucide-react'

const ControlBar: React.FC<ControlBarProps> = ({
  rows,
  cols,
  onRowsChange,
  onColsChange,
  onReset,
}) => {
  // local inputs as strings so the user can delete everything
  const [rowsInput, setRowsInput] = useState(rows.toString())
  const [colsInput, setColsInput] = useState(cols.toString())

  // keep local state in sync if parent ever changes rows/cols from outside
  useEffect(() => {
    setRowsInput(rows.toString())
  }, [rows])
  useEffect(() => {
    setColsInput(cols.toString())
  }, [cols])

  // only allow digits (or empty)
  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(e.target.value)) {
      setRowsInput(e.target.value)
    }
  }
  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(e.target.value)) {
      setColsInput(e.target.value)
    }
  }

  // on blur (or Enter) we clamp, sync back to input, and notify parent
  const commitRows = () => {
    let n = parseInt(rowsInput) || 1
    n = Math.min(40, Math.max(1, n))
    setRowsInput(n.toString())
    onRowsChange(n)
  }
  const commitCols = () => {
    let n = parseInt(colsInput) || 1
    n = Math.min(40, Math.max(1, n))
    setColsInput(n.toString())
    onColsChange(n)
  }

  return (
    <div className="bg-white shadow-md py-4 px-6 mb-4 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <Grid className="text-blue-500" size={24} />
          <h1 className="text-xl font-bold text-gray-800">Matrix Visualizer</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="rows" className="text-sm font-medium text-gray-700">
              Rows:
            </label>
            <input
              id="rows"
              type="text"
              value={rowsInput}
              onChange={handleRowsChange}
              onBlur={commitRows}
              onKeyDown={e => e.key === 'Enter' && commitRows()}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="cols" className="text-sm font-medium text-gray-700">
              Columns:
            </label>
            <input
              id="cols"
              type="text"
              value={colsInput}
              onChange={handleColsChange}
              onBlur={commitCols}
              onKeyDown={e => e.key === 'Enter' && commitCols()}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
  )
}

export default ControlBar