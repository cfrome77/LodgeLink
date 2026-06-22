import { Attendee } from '@/types/attendee';
import Papa from 'papaparse';

/**
 * Parses Black Pug CSV data.
 * Expected columns: First Name, Last Name, BSA ID (Member ID), etc.
 */
export function parseBlackPugCSV(csvContent: string, eventId: number): Attendee[] {
  const results = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  const data = results.data as any[];
  if (data.length === 0) return [];

  // Find column names dynamically as they might vary slightly
  const headers = Object.keys(data[0]);
  const firstNameKey = headers.find(h => h.toLowerCase().includes('first name'));
  const lastNameKey = headers.find(h => h.toLowerCase().includes('last name'));
  const memberIdKey = headers.find(h => h.toLowerCase().includes('bsa id') || h.toLowerCase().includes('member id'));

  if (!firstNameKey || !lastNameKey) {
    throw new Error('Invalid CSV format: First Name and Last Name columns are required.');
  }

  const attendees: Attendee[] = [];

  for (const row of data) {
    const firstName = row[firstNameKey]?.trim();
    const lastName = row[lastNameKey]?.trim();
    const memberId = memberIdKey ? row[memberIdKey]?.trim() : undefined;

    if (firstName && lastName) {
      attendees.push({
        eventId,
        firstName,
        lastName,
        memberId,
        status: 'absent',
        isWalkIn: false,
        isImported: true,
      });
    }
  }

  return attendees;
}
