import { Attendee } from '@/types/attendee';
import { Event } from '@/types/event';
import Papa from 'papaparse';

/**
 * Parses Black Pug CSV data.
 * Attempts to map all extended fields.
 */
export function parseBlackPugCSV(csvContent: string, eventId: number, event?: Event): Attendee[] {
  const results = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  const data = results.data as Record<string, string>[];
  if (data.length === 0) return [];

  const headers = Object.keys(data[0]);

  const findKey = (patterns: string[]) =>
    headers.find(h => patterns.some(p => h.toLowerCase().includes(p)));

  const mapping = {
    firstName: findKey(['first name']),
    lastName: findKey(['last name']),
    memberId: findKey(['bsa id', 'member id']),
    role: findKey(['role', 'position', 'registration type']),
    paidAmount: findKey(['paid amount', 'amount paid', 'total paid']),
    receiptNumber: findKey(['receipt', 'transaction id']),
    paymentMethod: findKey(['payment method']),
    paidInFull: findKey(['paid in full', 'balance due']),
    dateRegistered: findKey(['date registered', 'registration date']),
    datePaid: findKey(['date paid', 'payment date']),
    service: findKey(['service', 'crew', 'kitchen']),
    ordeal: findKey(['ordeal']),
    brotherhood: findKey(['brotherhood']),
    healthForm: findKey(['health form', 'medical form']),
  };

  if (!mapping.firstName || !mapping.lastName) {
    throw new Error('Invalid CSV format: First Name and Last Name columns are required.');
  }

  const attendees: Attendee[] = [];

  for (const row of data) {
    const firstName = row[mapping.firstName!]?.trim();
    const lastName = row[mapping.lastName!]?.trim();

    if (firstName && lastName) {
      // Helper to parse booleans from strings
      const parseBool = (val: string | boolean | undefined | null) => {
        if (typeof val === 'boolean') return val;
        if (!val) return false;
        const s = String(val).toLowerCase();
        return s === 'true' || s === 'yes' || s === 'y' || s === 'checked' || s === '1';
      };

      // Special handling for Paid In Full if it's based on "Balance Due"
      let isPaidInFull = mapping.paidInFull ? parseBool(row[mapping.paidInFull]) : false;
      if (mapping.paidInFull?.toLowerCase().includes('balance')) {
        const balance = parseFloat(String(row[mapping.paidInFull]).replace(/[^0-9.-]+/g, ""));
        isPaidInFull = !isNaN(balance) && balance <= 0;
      }

      attendees.push({
        eventId,
        firstName,
        lastName,
        memberId: mapping.memberId ? row[mapping.memberId]?.trim() : undefined,
        status: 'absent',
        isWalkIn: false,
        isImported: true,
        role: mapping.role ? row[mapping.role]?.trim() : undefined,
        checkInDate: event?.startDate,
        checkOutDate: event?.endDate,
        paidAmount: mapping.paidAmount ? parseFloat(String(row[mapping.paidAmount]).replace(/[^0-9.-]+/g, "")) || 0 : 0,
        receiptNumber: mapping.receiptNumber ? row[mapping.receiptNumber]?.trim() : undefined,
        paymentMethod: mapping.paymentMethod ? row[mapping.paymentMethod]?.trim() : undefined,
        paidInFull: isPaidInFull,
        dateRegistered: mapping.dateRegistered ? row[mapping.dateRegistered]?.trim() : undefined,
        datePaid: mapping.datePaid ? row[mapping.datePaid]?.trim() : undefined,
        service: mapping.service ? parseFloat(String(row[mapping.service]).replace(/[^0-9.-]+/g, "")) || 0 : 0,
        ordeal: mapping.ordeal ? parseBool(row[mapping.ordeal]) : false,
        brotherhood: mapping.brotherhood ? parseBool(row[mapping.brotherhood]) : false,
        healthForm: mapping.healthForm ? parseBool(row[mapping.healthForm]) : false,
        isActive: true,
      });
    }
  }

  return attendees;
}
