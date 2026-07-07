import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Attendee } from '@/types/attendee';
import { Event } from '@/types/event';
import { ExportColumn } from './presets';
import { format, parseISO, isValid } from 'date-fns';

function formatValue(key: string, value: string | number | boolean | undefined | null): string | number {
  if (value === undefined || value === null) return '';

  if (typeof value === 'string' && (key.toLowerCase().includes('date') || key.toLowerCase().includes('time'))) {
    // Attempt to format as US Date MM-DD-YYYY
    const d = parseISO(value);
    if (isValid(d)) {
      return format(d, 'MM-dd-yyyy');
    }
  }

  if (typeof value === 'boolean') {
    // If it's Ordeal, Brotherhood, Health Form, or Paid in Full,
    // LodgeMaster often expects True/False or T/F.
    // Given the previous requirement for Yes/No as default, we check for specific headers.
    const k = key.toLowerCase();
    if (k.includes('ordeal') || k.includes('brotherhood') || k.includes('health') || k.includes('paid in full')) {
      return value ? 'True' : 'False';
    }

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
      let value: string | number | boolean | undefined | null;

      if (col.key === 'fullName') {
        const middle = a.middleName ? ` ${a.middleName}` : '';
        value = `${a.lastName}, ${a.firstName}${middle}`;
      } else if (col.key === 'eventName') {
        value = event.name;
      } else if (col.key === 'eventDate') {
        value = event.startDate || '';
      } else {
        value = a[col.key as keyof Attendee];
      }

      row[col.header] = formatValue(col.header, value);
    });

    return row;
  });
}

export async function exportToExcel(event: Event, attendees: Attendee[], columns: ExportColumn[]) {
  const data = prepareExportData(event, attendees, columns);
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Attendees');

  if (data.length > 0) {
    const headers = Object.keys(data[0]);
    worksheet.columns = headers.map(header => ({
      header,
      key: header,
    }));
    worksheet.addRows(data);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${event.name.replace(/\s+/g, '_')}_attendance.xlsx`);
}

function csvEscape(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  const s = String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function exportToCSV(event: Event, attendees: Attendee[], columns: ExportColumn[]) {
  const data = prepareExportData(event, attendees, columns);
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows: string[] = [];

  // Header row
  csvRows.push(headers.map(csvEscape).join(','));

  // Data rows
  data.forEach(row => {
    csvRows.push(headers.map(header => csvEscape(row[header])).join(','));
  });

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${event.name.replace(/\s+/g, '_')}_backup.csv`);
}
