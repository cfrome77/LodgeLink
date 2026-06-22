export interface ExportColumn {
  header: string;
  key: string; // key in attendee or special keys like 'fullName'
}

export interface ExportPreset {
  id: string;
  name: string;
  columns: ExportColumn[];
}

export const EXPORT_PRESETS: ExportPreset[] = [
  {
    id: 'simple-meeting',
    name: 'Simple Meeting (ID & Check-in)',
    columns: [
      { header: 'Full Name (Last, First)', key: 'fullName' },
      { header: 'Member ID', key: 'memberId' },
      { header: 'Role', key: 'role' },
      { header: 'Check-in Date', key: 'checkInDate' },
      { header: 'Check-out Date', key: 'checkOutDate' },
    ],
  },
  {
    id: 'service-report',
    name: 'Service Report (Hours Included)',
    columns: [
      { header: 'Full Name (Last, First)', key: 'fullName' },
      { header: 'Service Hours', key: 'service' },
      { header: 'Member ID', key: 'memberId' },
      { header: 'Role', key: 'role' },
      { header: 'Check-in Date', key: 'checkInDate' },
      { header: 'Check-out Date', key: 'checkOutDate' },
    ],
  },
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
    id: 'lodge-master-import',
    name: 'LodgeMaster Format (Standard)',
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
