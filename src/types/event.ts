export interface Event {
  id?: number;
  name: string;
  date: string;
  startDate?: string;
  endDate?: string;
  chapter?: string;
  isLocked?: boolean;
}
