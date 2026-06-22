import { AttendanceStatus, Attendee } from './attendee';

export interface Event {
  id?: number;
  name: string;
  date: string;
  chapter?: string;
}
