'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { parseBlackPugCSV } from '@/lib/ingestion/blackpug';
import { db } from '@/lib/storage/db';
import { Attendee } from '@/types/attendee';

interface CSVImporterProps {
  eventId: number;
}

export default function CSVImporter({ eventId }: CSVImporterProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setError(null);
    setSuccess(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const importedAttendees = parseBlackPugCSV(content, eventId);

        if (importedAttendees.length === 0) {
          throw new Error('No valid attendees found in the CSV.');
        }

        // Get existing attendees to avoid duplicates
        const existingAttendees = await db.attendees.where('eventId').equals(eventId).toArray();
        const existingKeys = new Set(existingAttendees.map(a => `${a.firstName.toLowerCase()}|${a.lastName.toLowerCase()}`));

        const newAttendees = importedAttendees.filter(a =>
          !existingKeys.has(`${a.firstName.toLowerCase()}|${a.lastName.toLowerCase()}`)
        );

        if (newAttendees.length > 0) {
          await db.attendees.bulkAdd(newAttendees);
        }

        setSuccess(newAttendees.length);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (err: any) {
        setError(err.message || 'Failed to parse CSV file.');
      } finally {
        setIsImporting(false);
      }
    };

    reader.onerror = () => {
      setError('Error reading file.');
      setIsImporting(false);
    };

    reader.readAsText(file);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
          <Upload size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Import from Black Pug</h2>
          <p className="text-sm text-gray-500">Upload your event registration CSV</p>
        </div>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isImporting ? 'bg-gray-50 border-gray-300' : 'hover:bg-blue-50 hover:border-blue-300 border-gray-300'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".csv"
          className="hidden"
        />
        {isImporting ? (
          <div className="flex flex-col items-center">
            <Loader2 size={40} className="text-blue-600 animate-spin mb-2" />
            <p className="text-gray-600 font-medium">Processing CSV...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FileText size={40} className="text-gray-400 mb-2" />
            <p className="text-gray-600 font-medium">Click to select or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">Accepts Black Pug registration CSV</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md text-sm border border-red-100">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {success !== null && (
        <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md text-sm border border-green-100">
          <CheckCircle2 size={18} />
          <span>Successfully imported {success} new attendees.</span>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
        <p className="font-semibold mb-1 uppercase tracking-wider">Instructions:</p>
        <ol className="list-decimal ml-4 space-y-1">
          <li>Download the "Registration Report" from Black Pug.</li>
          <li>Ensure it's in CSV format.</li>
          <li>Upload it here to populate the attendee list.</li>
          <li>Duplicates (based on name) will be skipped automatically.</li>
        </ol>
      </div>
    </div>
  );
}
