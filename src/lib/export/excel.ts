import * as XLSX from 'xlsx';
import { Attendee } from '@/types/attendee';
import { Event } from '@/types/event';

export function exportToExcel(event: Event, attendees: Attendee[]) {
  const data = attendees.map(a => ({
    'First Name': a.firstName,
    'Last Name': a.lastName,
    'Member ID': a.memberId || '',
    'Attendance Status': a.status,
    'Event Name': event.name,
    'Event Date': event.date,
    'Notes': a.notes || '',
    'Is Walk-in': a.isWalkIn ? 'Yes' : 'No',
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendees');

  // Generate buffer and trigger download
  XLSX.writeFile(workbook, `${event.name.replace(/\s+/g, '_')}_attendance.xlsx`);
}

export function exportToCSV(event: Event, attendees: Attendee[]) {
  const data = attendees.map(a => ({
    'First Name': a.firstName,
    'Last Name': a.lastName,
    'Member ID': a.memberId || '',
    'Attendance Status': a.status,
    'Event Name': event.name,
    'Event Date': event.date,
    'Notes': a.notes || '',
    'Is Walk-in': a.isWalkIn ? 'Yes' : 'No',
  }));

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
