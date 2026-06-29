import Dexie, { type Table } from 'dexie';
import { Event } from '../../types/event';
import { Attendee } from '../../types/attendee';
import { Member } from '../../types/member';

export class LodgeMasterDatabase extends Dexie {
  events!: Table<Event>;
  attendees!: Table<Attendee>;
  members!: Table<Member>;

  constructor() {
    super('LodgeMasterCompanionDB');
    this.version(7).stores({
      events: '++id, name, startDate, endDate, chapter, isLocked',
      attendees: '++id, eventId, firstName, lastName, memberId, status, isWalkIn, isImported, role, paidInFull, healthForm, isActive, [eventId+memberId], [eventId+firstName+lastName]',
      members: '++id, firstName, lastName, memberId, role, isActive'
    }).upgrade(() => {
      // Logic for upgrade if needed, dexie handles adding fields to stores automatically if version increases
    });
  }
}

export const db = new LodgeMasterDatabase();
