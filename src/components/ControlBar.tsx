import React from 'react';
import { ControlBarProps } from '../types';
import { Grid, RefreshCw } from 'lucide-react';

const ControlBar: React.FC<ControlBarProps> = ({ 
  rows, 
  cols, 
  onRowsChange, 
  onColsChange,
  onReset
}) => {
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
              type="number"
              min={1}
              max={40}
              value={rows}
              onChange={(e) => onRowsChange(Math.min(40, Math.max(1, parseInt(e.target.value) || 1)))}
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
              min={1}
              max={40}
              value={cols}
              onChange={(e) => onColsChange(Math.min(40, Math.max(1, parseInt(e.target.value) || 1)))}
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
  );
};

export default ControlBar;