export interface ExportColumn {
  header: string;
  key: string; // key in attendee or special keys like 'fullName'
}

export const ALL_COLUMNS: ExportColumn[] = [
  { header: 'First Name', key: 'firstName' },
  { header: 'Last Name', key: 'lastName' },
  { header: 'Name', key: 'fullName' },
  { header: 'Member ID', key: 'memberId' },
  { header: 'Role', key: 'role' },
  { header: 'Service', key: 'service' },
  { header: 'Ordeal (T/F)', key: 'ordeal' },
  { header: 'Brotherhood (T/F)', key: 'brotherhood' },
  { header: 'Attendance Status', key: 'status' },
  { header: 'Paid Amount', key: 'paidAmount' },
  { header: 'Receipt Number', key: 'receiptNumber' },
  { header: 'Payment Method', key: 'paymentMethod' },
  { header: 'Paid In Full (T/F)', key: 'paidInFull' },
  { header: 'Check-in Date', key: 'checkInDate' },
  { header: 'Check-out Date', key: 'checkOutDate' },
  { header: 'Registered Date', key: 'dateRegistered' },
  { header: 'Paid Date', key: 'datePaid' },
  { header: 'Health Form (T/F)', key: 'healthForm' },
  { header: 'Event Notes', key: 'notes' },
  { header: 'Event Name', key: 'eventName' },
  { header: 'Event Date', key: 'eventDate' },
];
