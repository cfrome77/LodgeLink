'use client';

import { useState } from 'react';
import { Event } from '@/types/event';
import { Attendee } from '@/types/attendee';
import { ALL_COLUMNS, ExportColumn } from '@/lib/export/presets';
import { exportToExcel, exportToCSV } from '@/lib/export/excel';
import { CheckSquare, Square, ListFilter, CheckCircle2, Circle } from 'lucide-react';

interface ExportModalProps {
  event: Event;
  attendees: Attendee[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ event, attendees, isOpen, onClose }: ExportModalProps) {
  const [selectedColumns, setSelectedColumns] = useState<ExportColumn[]>([]);

  if (!isOpen) return null;

  const toggleColumn = (col: ExportColumn) => {
    setSelectedColumns(prev => {
      const isSelected = prev.some(c => c.key === col.key && c.header === col.header);
      if (isSelected) {
        return prev.filter(c => !(c.key === col.key && c.header === col.header));
      } else {
        return [...prev, col];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedColumns([...ALL_COLUMNS]);
  };

  const handleDeselectAll = () => {
    setSelectedColumns([]);
  };

  const isColumnSelected = (col: ExportColumn) => {
    return selectedColumns.some(c => c.key === col.key && c.header === col.header);
  };

  const handleExportExcel = () => {
    exportToExcel(event, attendees, selectedColumns);
    onClose();
  };

  const handleExportCSV = () => {
    exportToCSV(event, attendees, selectedColumns);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Export Data</h2>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">{event.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50 p-6 rounded-2xl border-2 border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-xl text-white">
                <ListFilter size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Select Export Fields</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                  {selectedColumns.length} fields selected
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSelectAll}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95"
              >
                <CheckCircle2 size={16} />
                All
              </button>
              <button
                onClick={handleDeselectAll}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all active:scale-95"
              >
                <Circle size={16} />
                None
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ALL_COLUMNS.map((col) => (
              <button
                key={`${col.key}-${col.header}`}
                onClick={() => toggleColumn(col)}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left group ${
                  isColumnSelected(col)
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className={`transition-colors ${isColumnSelected(col) ? 'text-blue-600' : 'text-gray-300 group-hover:text-gray-400'}`}>
                  {isColumnSelected(col) ? <CheckSquare size={20} /> : <Square size={20} />}
                </div>
                <span className={`text-sm font-bold tracking-tight ${isColumnSelected(col) ? 'text-blue-900' : 'text-gray-600'}`}>
                  {col.header}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-4 text-gray-500 font-black uppercase tracking-widest text-sm hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleExportCSV}
              disabled={selectedColumns.length === 0}
              className="flex-1 sm:flex-none bg-white border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:hover:border-gray-200 text-gray-700 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all active:scale-95"
            >
              CSV
            </button>
            <button
              onClick={handleExportExcel}
              disabled={selectedColumns.length === 0}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-200 active:scale-95 transition-all"
            >
              Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
