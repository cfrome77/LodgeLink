import * as XLSX from 'xlsx';
import { Attendee } from '@/types/attendee';
import { Event } from '@/types/event';
import { ExportColumn } from './presets';

function formatValue(key: string, value: any): string | number {
  if (value === undefined || value === null) return '';

  if (typeof value === 'boolean') {
    // If the key suggests (T/F), use T/F
    if (key.includes('(T/F)') || key.includes('(T)')) {
      return value ? 'T' : 'F';
    }
    return value ? 'Yes' : 'No';
  }

  return value;
}

function prepareExportData(event: Event, attendees: Attendee[], columns: ExportColumn[]) {
  return attendees.map(a => {
    const row: Record<string, string | number> = {};

    columns.forEach(col => {
      let value: any;

      if (col.key === 'fullName') {
        value = `${a.lastName}, ${a.firstName}`;
      } else if (col.key === 'eventName') {
        value = event.name;
      } else if (col.key === 'eventDate') {
        value = event.date;
      } else {
        value = (a as any)[col.key];
      }

      row[col.header] = formatValue(col.header, value);
    });

    return row;
  });
}

export function exportToExcel(event: Event, attendees: Attendee[], columns: ExportColumn[]) {
  const data = prepareExportData(event, attendees, columns);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendees');

  XLSX.writeFile(workbook, `${event.name.replace(/\s+/g, '_')}_attendance.xlsx`);
}

export function exportToCSV(event: Event, attendees: Attendee[], columns: ExportColumn[]) {
  const data = prepareExportData(event, attendees, columns);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${event.name.replace(/\s+/g, '_')}_backup.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
