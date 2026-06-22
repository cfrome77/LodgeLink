'use client';

import { Attendee } from '@/types/attendee';
import { cn } from '@/lib/utils';
import { UserCheck, UserMinus, UserX } from 'lucide-react';

interface AttendeeCardProps {
  attendee: Attendee;
  onToggleStatus: () => void;
  onLongPress?: () => void;
}

export default function AttendeeCard({ attendee, onToggleStatus, onLongPress }: AttendeeCardProps) {
  const isPresent = attendee.status === 'present';
  const isPartial = attendee.status === 'partial';
  const isAbsent = attendee.status === 'absent';

  return (
    <button
      onClick={onToggleStatus}
      onContextMenu={(e) => {
        if (onLongPress) {
          e.preventDefault();
          onLongPress();
        }
      }}
      className={cn(
        "w-full text-left p-5 rounded-2xl border-2 transition-all active:scale-[0.98] flex items-center justify-between gap-4 select-none",
        isPresent && "bg-green-50 border-green-500 shadow-sm ring-1 ring-green-500/20",
        isPartial && "bg-amber-50 border-amber-500 shadow-sm ring-1 ring-amber-500/20",
        isAbsent && "bg-red-50/30 border-red-200 hover:border-red-300 shadow-sm"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={cn(
            "text-xl font-black truncate",
            isPresent ? "text-green-900" : isPartial ? "text-amber-900" : isAbsent ? "text-red-900" : "text-gray-900"
          )}>
            {attendee.firstName} {attendee.lastName}
          </h3>
          {attendee.isWalkIn && (
            <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
              Walk-in
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold font-mono text-gray-500">
            {attendee.memberId || 'NO ID'}
          </p>
          {attendee.notes && (
            <span className="text-xs text-gray-400 italic truncate">
              "{attendee.notes}"
            </span>
          )}
        </div>
      </div>

      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
        isPresent ? "bg-green-600 text-white" :
        isPartial ? "bg-amber-500 text-white" :
        "bg-red-100 text-red-600"
      )}>
        {isPresent ? <UserCheck size={28} strokeWidth={3} /> :
         isPartial ? <UserMinus size={28} strokeWidth={3} /> :
         <UserX size={24} strokeWidth={2} />}
      </div>
    </button>
  );
}
