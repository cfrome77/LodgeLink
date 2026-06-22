'use client';

import { useState } from 'react';
import { Event } from '@/types/event';
import { Attendee } from '@/types/attendee';
import { EXPORT_PRESETS, ExportPreset } from '@/lib/export/presets';
import { exportToExcel, exportToCSV } from '@/lib/export/excel';

interface ExportModalProps {
  event: Event;
  attendees: Attendee[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ event, attendees, isOpen, onClose }: ExportModalProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(EXPORT_PRESETS[0].id);

  if (!isOpen) return null;

  const selectedPreset = EXPORT_PRESETS.find(p => p.id === selectedPresetId) || EXPORT_PRESETS[0];

  const handleExportExcel = () => {
    exportToExcel(event, attendees, selectedPreset.columns);
    onClose();
  };

  const handleExportCSV = () => {
    exportToCSV(event, attendees, selectedPreset.columns);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Export Event Data</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Select a template for your export. Different templates include different columns required for LodgeMaster reports.
        </p>

        <div className="space-y-3">
          {EXPORT_PRESETS.map((preset) => (
            <label
              key={preset.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                selectedPresetId === preset.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="preset"
                value={preset.id}
                checked={selectedPresetId === preset.id}
                onChange={(e) => setSelectedPresetId(e.target.value)}
                className="mt-1 h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <span className="block font-medium text-gray-900">{preset.name}</span>
                <span className="mt-1 block text-xs text-gray-500">
                  Columns: {preset.columns.map(c => c.header).join(', ')}
                </span>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExportCSV}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportExcel}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Export Excel (.xlsx)
          </button>
        </div>
      </div>
    </div>
  );
}
