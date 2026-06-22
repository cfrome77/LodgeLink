export type AttendanceStatus = 'present' | 'partial' | 'absent';

export interface Attendee {
  id?: number;
  eventId: number;
  firstName: string;
  lastName: string;
  memberId?: string;
  status: AttendanceStatus;
  notes?: string;
  isWalkIn: boolean;
  isImported: boolean;

  // New Fields
  role?: string;
  checkInDate?: string;
  checkOutDate?: string;
  service?: string;
  ordeal?: boolean;
  brotherhood?: boolean;
  paidAmount?: number;
  receiptNumber?: string;
  paymentMethod?: string;
  paidInFull?: boolean;
  dateRegistered?: string;
  datePaid?: string;
  healthForm?: boolean;
}
