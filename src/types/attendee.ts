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
}
