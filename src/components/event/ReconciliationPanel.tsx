'use client';

import { Attendee } from '@/types/attendee';
import { getReconciliationStats } from '@/lib/checkin/checkin';
import { Users, UserCheck, UserPlus, UserX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReconciliationPanelProps {
  attendees: Attendee[];
  className?: string;
}

export default function ReconciliationPanel({ attendees, className }: ReconciliationPanelProps) {
  const stats = getReconciliationStats(attendees);

  const statItems = [
    { label: 'Registered', value: stats.registered, icon: Users, color: 'blue' },
    { label: 'Checked In', value: stats.checkedIn, icon: UserCheck, color: 'green' },
    { label: 'Walk-ins', value: stats.walkIns, icon: UserPlus, color: 'purple' },
    { label: 'Missing', value: stats.missing, icon: UserX, color: 'red' },
  ];

  return (
    <div className={cn("grid grid-cols-1 gap-4", className)}>
      {statItems.map((item) => (
        <div key={item.label} className="bg-white p-5 rounded-2xl border-2 border-gray-100 shadow-sm flex items-center gap-4">
          <div className={cn(
            "p-3 rounded-xl",
            item.color === 'blue' && "bg-blue-50 text-blue-600",
            item.color === 'green' && "bg-green-50 text-green-600",
            item.color === 'purple' && "bg-purple-50 text-purple-600",
            item.color === 'red' && "bg-red-50 text-red-600",
          )}>
            <item.icon size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
            <h3 className="text-2xl font-black text-gray-900 leading-tight">{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
