'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { Attendee } from '@/types/attendee';
import { EXPORT_PRESETS, ALL_COLUMNS, ExportColumn } from '@/lib/export/presets';
import { exportToExcel, exportToCSV } from '@/lib/export/excel';
import { ChevronDown, ChevronRight, CheckSquare, Square } from 'lucide-react';

interface ExportModalProps {
  event: Event;
  attendees: Attendee[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ event, attendees, isOpen, onClose }: ExportModalProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(EXPORT_PRESETS[0].id);
  const [selectedColumns, setSelectedColumns] = useState<ExportColumn[]>(EXPORT_PRESETS[0].columns);
  const [showCustomFields, setShowCustomFields] = useState(false);

  useEffect(() => {
    if (selectedPresetId !== 'custom') {
      const preset = EXPORT_PRESETS.find(p => p.id === selectedPresetId);
      if (preset) {
        setSelectedColumns(preset.columns);
      }
    }
  }, [selectedPresetId]);

  if (!isOpen) return null;

  const toggleColumn = (col: ExportColumn) => {
    setSelectedPresetId('custom');
    setSelectedColumns(prev => {
      const isSelected = prev.some(c => c.key === col.key && c.header === col.header);
      if (isSelected) {
        return prev.filter(c => !(c.key === col.key && c.header === col.header));
      } else {
        return [...prev, col];
      }
    });
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

        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          {/* Presets */}
          <section>
            <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
              <span>Templates</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPORT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={`flex flex-col items-start text-left p-4 rounded-2xl border-2 transition-all ${
                    selectedPresetId === preset.id
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <span className={`text-sm font-black ${selectedPresetId === preset.id ? 'text-blue-700' : 'text-gray-900'}`}>
                    {preset.name}
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-tighter">
                    {preset.columns.length} Fields
                  </span>
                </button>
              ))}
              <button
                onClick={() => {
                  setSelectedPresetId('custom');
                  setShowCustomFields(true);
                }}
                className={`flex flex-col items-start text-left p-4 rounded-2xl border-2 transition-all ${
                  selectedPresetId === 'custom'
                    ? 'border-blue-600 bg-blue-50/50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <span className={`text-sm font-black ${selectedPresetId === 'custom' ? 'text-blue-700' : 'text-gray-900'}`}>
                  Custom Selection
                </span>
                <span className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-tighter">
                  {selectedColumns.length} Selected
                </span>
              </button>
            </div>
          </section>

          {/* Column Selection */}
          <section>
            <button
              onClick={() => setShowCustomFields(!showCustomFields)}
              className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4 hover:text-gray-600 transition-colors"
            >
              {showCustomFields ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span>Field Selection</span>
              <span className="ml-auto text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {selectedColumns.length} / {ALL_COLUMNS.length}
              </span>
            </button>

            {showCustomFields && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {ALL_COLUMNS.map((col) => (
                  <button
                    key={`${col.key}-${col.header}`}
                    onClick={() => toggleColumn(col)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left ${
                      isColumnSelected(col)
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : 'border-gray-50 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    {isColumnSelected(col) ? <CheckSquare size={16} /> : <Square size={16} />}
                    <span className="text-xs font-bold leading-tight">{col.header}</span>
                  </button>
                ))}
              </div>
            )}
          </section>
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
              className="flex-1 sm:flex-none bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all active:scale-95"
            >
              CSV
            </button>
            <button
              onClick={handleExportExcel}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-200 active:scale-95 transition-all"
            >
              Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
