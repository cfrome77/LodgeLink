import { Attendee } from "@/types/attendee";

export function getReconciliationStats(attendees: Attendee[]) {
  const registered = attendees.filter(a => a.isImported).length;
  const checkedIn = attendees.filter(a => a.status === 'present' || a.status === 'partial').length;
  const walkIns = attendees.filter(a => a.isWalkIn && (a.status === 'present' || a.status === 'partial')).length;
  const missing = attendees.filter(a => a.isImported && a.status === 'absent').length;

  return {
    registered,
    checkedIn,
    walkIns,
    missing
  };
}
