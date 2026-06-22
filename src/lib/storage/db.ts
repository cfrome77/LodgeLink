import Dexie, { type Table } from 'dexie';
import { Event } from '../../types/event';
import { Attendee } from '../../types/attendee';

export class LodgeMasterDatabase extends Dexie {
  events!: Table<Event>;
  attendees!: Table<Attendee>;

  constructor() {
    super('LodgeMasterCompanionDB');
    this.version(1).stores({
      events: '++id, name, date, chapter',
      attendees: '++id, eventId, firstName, lastName, memberId, status, isWalkIn, isImported'
    });
  }
}

export const db = new LodgeMasterDatabase();
