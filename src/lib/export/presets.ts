export interface ExportColumn {
  header: string;
  key: string; // key in attendee or special keys like 'fullName'
}

/**
 * The exact 16 fields requested for LodgeMaster export compatibility.
 */
export const ALL_COLUMNS: ExportColumn[] = [
  { header: 'Name', key: 'fullName' },
  { header: 'Service', key: 'service' },
  { header: 'Ordeal', key: 'ordeal' },
  { header: 'Brotherhood', key: 'brotherhood' },
  { header: 'Member ID', key: 'memberId' },
  { header: 'Role', key: 'role' },
  { header: 'Paid Amount', key: 'paidAmount' },
  { header: 'Receipt Number', key: 'receiptNumber' },
  { header: 'Payment Method', key: 'paymentMethod' },
  { header: 'Paid In Full', key: 'paidInFull' },
  { header: 'Check-in Date', key: 'checkInDate' },
  { header: 'Check-out Date', key: 'checkOutDate' },
  { header: 'Registered Date', key: 'dateRegistered' },
  { header: 'Paid Date', key: 'datePaid' },
  { header: 'Health Form', key: 'healthForm' },
  { header: 'Event Notes', key: 'notes' },
];
