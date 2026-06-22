'use client';

import { Attendee } from '@/types/attendee';
import { db } from '@/lib/storage/db';
import { Search, UserPlus, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import AttendeeCard from './AttendeeCard';
import WalkinModal from './WalkinModal';

interface CheckInModeProps {
  eventId: number;
  attendees: Attendee[];
}

export default function CheckInMode({ eventId, attendees }: CheckInModeProps) {
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
    // Fast interaction: Toggle between absent and present
    const newStatus = attendee.status === 'present' ? 'absent' : 'present';

    // Optimistic update via Dexie is already handled by useLiveQuery in parent
    await db.attendees.update(attendee.id!, { status: newStatus });
  };

  const handleMarkAbsent = async (id: number) => {
    await db.attendees.update(id, { status: 'absent' });
  };

  return (
    <div className="relative pb-24 min-h-full">
      {/* Search Header - Pinned at top of content area */}
      <div className="sticky top-0 sm:top-24 z-20 bg-zinc-50/95 backdrop-blur-sm pt-2 pb-4 px-1">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={24} />
          <input
            type="text"
            placeholder="Find attendee..."
            className="w-full pl-12 pr-12 py-5 text-xl font-bold bg-white border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all shadow-sm"
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
          <div className="text-center py-24 bg-white border-2 border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-400 text-lg font-bold">No results for "{searchTerm}"</p>
            <button
              onClick={() => setIsAddingWalkIn(true)}
              className="mt-4 bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-black uppercase tracking-wider text-sm hover:bg-blue-100 transition-colors"
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
              onLongPress={() => handleMarkAbsent(attendee.id!)}
            />
          ))
        )}
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40">
        <button
          onClick={() => setIsAddingWalkIn(true)}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-full font-black text-lg transition-all shadow-2xl active:scale-95 shadow-blue-500/40"
        >
          <UserPlus size={28} />
          <span className="sm:inline">Add Walk-in</span>
        </button>
      </div>

      {isAddingWalkIn && (
        <WalkinModal
          eventId={eventId}
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
