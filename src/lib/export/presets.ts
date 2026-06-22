export interface ExportColumn {
  header: string;
  key: string; // key in attendee or special keys like 'fullName'
}

export interface ExportPreset {
  id: string;
  name: string;
  columns: ExportColumn[];
}

export const ALL_COLUMNS: ExportColumn[] = [
  { header: 'First Name', key: 'firstName' },
  { header: 'Last Name', key: 'lastName' },
  { header: 'Name', key: 'fullName' },
  { header: 'Member ID', key: 'memberId' },
  { header: 'Role', key: 'role' },
  { header: 'Service', key: 'service' },
  { header: 'Ordeal', key: 'ordeal' },
  { header: 'Brotherhood', key: 'brotherhood' },
  { header: 'Attendance Status', key: 'status' },
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
  { header: 'Event Name', key: 'eventName' },
  { header: 'Event Date', key: 'eventDate' },
];

export const EXPORT_PRESETS: ExportPreset[] = [
  {
    id: 'lodgemaster-updated',
    name: 'LodgeMaster (Updated Form)',
    columns: [
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
    ],
  },
  {
    id: 'simple-meeting',
    name: 'Simple Meeting',
    columns: [
      { header: 'Full Name (Last, First)', key: 'fullName' },
      { header: 'Member ID', key: 'memberId' },
      { header: 'Role', key: 'role' },
      { header: 'Check-in Date', key: 'checkInDate' },
    ],
  },
  {
    id: 'lodge-master-import',
    name: 'LodgeMaster (Standard)',
    columns: [
      { header: 'First Name', key: 'firstName' },
      { header: 'Last Name', key: 'lastName' },
      { header: 'Member ID', key: 'memberId' },
      { header: 'Attendance Status', key: 'status' },
      { header: 'Event Name', key: 'eventName' },
      { header: 'Event Date', key: 'eventDate' },
    ],
  },
];
