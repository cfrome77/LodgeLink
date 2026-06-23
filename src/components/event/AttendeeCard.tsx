'use client';

import { Attendee } from '@/types/attendee';
import { cn } from '@/lib/utils';
import { UserCheck, UserMinus, UserX, ShieldCheck, CreditCard } from 'lucide-react';

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
        "w-full text-left p-5 rounded-2xl border-2 transition-all active:scale-[0.98] flex flex-col gap-3 select-none",
        isPresent && "bg-green-50 border-green-500 shadow-sm ring-1 ring-green-500/20",
        isPartial && "bg-amber-50 border-amber-500 shadow-sm ring-1 ring-amber-500/20",
        isAbsent && "bg-red-50/30 border-red-200 hover:border-red-300 shadow-sm"
      )}
    >
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              "text-xl font-black truncate",
              isPresent ? "text-green-900" : isPartial ? "text-amber-900" : isAbsent ? "text-red-900" : "text-gray-900"
            )}>
              {attendee.firstName} {attendee.middleName ? `${attendee.middleName} ` : ''}{attendee.lastName}
            </h3>
            {attendee.isWalkIn && (
              <span className="bg-scout-green text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                Walk-in
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold font-mono text-gray-500">
              {attendee.memberId || 'NO ID'}
            </p>
            {attendee.role && (
              <span className="text-xs font-black text-scout-green uppercase tracking-widest">
                {attendee.role}
              </span>
            )}
          </div>
        </div>

        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0",
          isPresent ? "bg-green-600 text-white" :
          isPartial ? "bg-amber-500 text-white" :
          "bg-red-100 text-red-600"
        )}>
          {isPresent ? <UserCheck size={28} strokeWidth={3} /> :
           isPartial ? <UserMinus size={28} strokeWidth={3} /> :
           <UserX size={24} strokeWidth={2} />}
        </div>
      </div>

      {/* Badges for extra info */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-black/5">
        {attendee.paidInFull ? (
          <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-tighter text-green-700 bg-green-100 px-2 py-0.5 rounded-md">
            <CreditCard size={10} /> Paid
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-tighter text-red-700 bg-red-100 px-2 py-0.5 rounded-md">
            <CreditCard size={10} /> Unpaid
          </span>
        )}

        {attendee.healthForm && (
          <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-tighter text-scout-green-dark bg-khaki px-2 py-0.5 rounded-md border border-khaki-dark/30">
            <ShieldCheck size={10} /> Health Form
          </span>
        )}

        {(attendee.ordeal || attendee.brotherhood) && (
          <span className="text-[9px] font-black uppercase tracking-tighter text-white bg-oa-red px-2 py-0.5 rounded-md shadow-sm">
            {attendee.ordeal ? 'Ordeal' : 'Brotherhood'}
          </span>
        )}

        {attendee.service !== undefined && attendee.service > 0 && (
          <span className="text-[9px] font-black uppercase tracking-tighter text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md truncate max-w-[100px]">
            {attendee.service} hrs
          </span>
        )}
      </div>
    </button>
  );
}
