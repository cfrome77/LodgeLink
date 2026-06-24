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
        isPresent && "bg-status-present-bg border-status-present shadow-sm ring-1 ring-status-present/20",
        isPartial && "bg-status-partial-bg border-status-partial shadow-sm ring-1 ring-status-partial/20",
        isAbsent && "bg-status-absent-bg border-border hover:border-status-absent shadow-sm"
      )}
    >
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              "text-xl font-black truncate",
              isPresent ? "text-status-present" : isPartial ? "text-status-partial" : isAbsent ? "text-status-absent" : "text-foreground"
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
            <p className="text-sm font-bold font-mono text-muted">
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
          isPresent ? "bg-status-present text-white" :
          isPartial ? "bg-status-partial text-white" :
          "bg-status-absent-bg text-status-absent border border-status-absent/20"
        )}>
          {isPresent ? <UserCheck size={28} strokeWidth={3} /> :
           isPartial ? <UserMinus size={28} strokeWidth={3} /> :
           <UserX size={24} strokeWidth={2} />}
        </div>
      </div>

      {/* Badges for extra info */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
        {attendee.paidInFull ? (
          <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-tighter text-status-present bg-status-present-bg px-2 py-0.5 rounded-md border border-status-present/10">
            <CreditCard size={10} /> Paid
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-tighter text-status-absent bg-status-absent-bg px-2 py-0.5 rounded-md border border-status-absent/10">
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
          <span className="text-[9px] font-black uppercase tracking-tighter text-muted bg-surface-muted px-2 py-0.5 rounded-md truncate max-w-[100px] border border-border">
            {attendee.service} hrs
          </span>
        )}
      </div>
    </button>
  );
}
