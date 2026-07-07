'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/storage/db';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';
import { useMemo } from 'react';

export default function GlobalStats() {
  const events = useLiveQuery(() => db.events.toArray());
  const attendees = useLiveQuery(() => db.attendees.toArray());
  const members = useLiveQuery(() => db.members.toArray());

  const stats = useMemo(() => {
    if (!events || !attendees || !members) return null;

    const checkIns = attendees.filter(a => a.status === 'present' || a.status === 'partial').length;
    const totalService = attendees.reduce((acc, a) => acc + (a.service || 0), 0);
    const totalRevenue = attendees.reduce((acc, a) => acc + (a.paidAmount || 0), 0);

    return [
      { label: 'Total Events', value: events.length, icon: Calendar, color: 'text-scout-green', bg: 'bg-scout-green/10' },
      { label: 'Total Members', value: members.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Total Check-ins', value: checkIns, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'Service Hours', value: totalService.toFixed(1), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Total Payments', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];
  }, [events, attendees, members]);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-12">
      {stats.map((s) => (
        <div key={s.label} className="bg-surface border-2 border-border p-5 rounded-3xl transition-all hover:shadow-md">
          <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-3`}>
            <s.icon size={20} />
          </div>
          <div className="text-2xl font-black text-foreground tracking-tight">{s.value}</div>
          <div className="text-[10px] font-black text-muted uppercase tracking-widest mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
