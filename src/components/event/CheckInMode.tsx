'use client';

import { Attendee } from '@/types/attendee';
import { Event as EventType } from '@/types/event';
import { db } from '@/lib/storage/db';
import { Search, UserPlus, X, Lock } from 'lucide-react';
import { useState, useMemo } from 'react';
import AttendeeCard from './AttendeeCard';
import WalkinModal from './WalkinModal';

interface CheckInModeProps {
  eventId: number;
  event: EventType;
  attendees: Attendee[];
}

export default function CheckInMode({ eventId, event: eventData, attendees }: CheckInModeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingWalkIn, setIsAddingWalkIn] = useState(false);

  const filteredAttendees = useMemo(() => {
    return attendees.filter(a =>
      `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.memberId?.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
      // Sort: Checked-in at bottom, or keep alphabetical?
      // Alphabetical is usually better for finding names.
      return a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName);
    });
  }, [attendees, searchTerm]);

  const handleToggleStatus = async (attendee: Attendee) => {
    if (eventData.isLocked) return;
    // Fast interaction cycle: absent -> present -> partial -> absent
    let newStatus: Attendee['status'];
    if (attendee.status === 'absent') newStatus = 'present';
    else if (attendee.status === 'present') newStatus = 'partial';
    else newStatus = 'absent';

    await db.attendees.update(attendee.id!, {
      status: newStatus,
      // Auto-set check-in date if moving to present/partial and it's empty
      ...(newStatus !== 'absent' && !attendee.checkInDate ? { checkInDate: new Date().toISOString().slice(0, 16) } : {}),
      // Auto-set check-out date if moving back to absent (resetting)
      ...(newStatus === 'absent' ? { checkOutDate: undefined } : {})
    });
  };

  const handleQuickReset = async (id: number) => {
    await db.attendees.update(id, { status: 'absent' });
  };

  return (
    <div className="relative pb-32 min-h-full">
      {/* Search Header - Pinned at top of content area */}
      <div className="sticky top-[73px] sm:top-24 z-20 bg-zinc-50/95 backdrop-blur-sm pt-2 pb-4 px-1">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-scout-green transition-colors" size={24} />
          <input
            type="text"
            placeholder="Find attendee..."
            className="w-full pl-12 pr-12 py-5 text-xl font-bold bg-white border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-scout-green/10 focus:border-scout-green transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Attendee List */}
      <div className="grid gap-3 mt-2 px-1">
        {filteredAttendees.length === 0 ? (
          <div className="text-center py-24 bg-khaki/20 border-2 border-dashed border-khaki-dark rounded-3xl">
            <p className="text-khaki-dark text-lg font-bold">No results for &quot;{searchTerm}&quot;</p>
            <button
              onClick={() => setIsAddingWalkIn(true)}
              className="mt-4 bg-scout-green/10 text-scout-green px-6 py-3 rounded-xl font-black uppercase tracking-wider text-sm hover:bg-scout-green/20 transition-colors"
            >
              Add as a walk-in
            </button>
          </div>
        ) : (
          filteredAttendees.map((attendee) => (
            <AttendeeCard
              key={attendee.id}
              attendee={attendee}
              onToggleStatus={() => handleToggleStatus(attendee)}
              onLongPress={() => handleQuickReset(attendee.id!)}
            />
          ))
        )}
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-6 sm:bottom-8 sm:right-8 sm:left-auto sm:translate-x-0 z-40">
        <button
          onClick={() => !eventData.isLocked && setIsAddingWalkIn(true)}
          disabled={eventData.isLocked}
          className={`flex items-center gap-3 px-8 py-5 rounded-full font-black text-lg transition-all shadow-2xl active:scale-95 ${
            eventData.isLocked
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
              : 'bg-scout-green hover:bg-scout-green-dark text-white shadow-scout-green-dark/40'
          }`}
        >
          {eventData.isLocked ? <Lock size={28} /> : <UserPlus size={28} />}
          <span className="sm:inline">{eventData.isLocked ? 'Locked' : 'Add Walk-in'}</span>
        </button>
      </div>

      {isAddingWalkIn && (
        <WalkinModal
          eventId={eventId}
          event={eventData}
          onClose={() => setIsAddingWalkIn(false)}
          onSubmit={async (data) => {
            await db.attendees.add(data);
            setIsAddingWalkIn(false);
          }}
        />
      )}
    </div>
  );
}
