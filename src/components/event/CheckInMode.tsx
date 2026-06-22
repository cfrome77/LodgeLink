'use client';

import { Attendee } from '@/types/attendee';
import { db } from '@/lib/storage/db';
import { Search, UserCheck, UserX, UserMinus, UserPlus } from 'lucide-react';
import { useState } from 'react';
import AttendeeForm from './AttendeeForm';

interface CheckInModeProps {
  eventId: number;
  attendees: Attendee[];
}

export default function CheckInMode({ eventId, attendees }: CheckInModeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingWalkIn, setIsAddingWalkIn] = useState(false);

  const filteredAttendees = attendees.filter(a =>
    `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.memberId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = async (id: number, status: Attendee['status']) => {
    await db.attendees.update(id, { status });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 sticky top-0 bg-zinc-50/80 backdrop-blur-md py-4 z-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="Search for check-in (Name or ID)..."
            className="w-full pl-12 pr-4 py-4 text-xl border border-gray-300 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        <button
          onClick={() => setIsAddingWalkIn(true)}
          className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-bold transition-colors shadow-sm"
        >
          <UserPlus size={24} />
          <span>Walk-in</span>
        </button>
      </div>

      <div className="grid gap-4">
        {filteredAttendees.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl">
            <p className="text-gray-500 text-xl font-medium">No one found matching "{searchTerm}"</p>
            <button
              onClick={() => setIsAddingWalkIn(true)}
              className="mt-4 text-purple-600 font-bold hover:underline"
            >
              Add as a walk-in attendee?
            </button>
          </div>
        ) : (
          filteredAttendees.map((attendee) => (
            <div
              key={attendee.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border rounded-2xl shadow-sm transition-all ${
                attendee.status === 'present' ? 'border-green-500 bg-green-50/30' : 'border-gray-200'
              }`}
            >
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-900">{attendee.firstName} {attendee.lastName}</h3>
                  {attendee.isWalkIn && (
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-bold uppercase">Walk-in</span>
                  )}
                </div>
                <p className="text-gray-500 font-mono">{attendee.memberId || 'No ID'}</p>
                {attendee.notes && <p className="text-sm text-gray-400 mt-1 italic">"{attendee.notes}"</p>}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(attendee.id!, 'present')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    attendee.status === 'present'
                      ? 'bg-green-600 text-white ring-4 ring-green-100'
                      : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'
                  }`}
                >
                  <UserCheck size={20} />
                  <span>Present</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate(attendee.id!, 'partial')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    attendee.status === 'partial'
                      ? 'bg-yellow-500 text-white ring-4 ring-yellow-100'
                      : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-700'
                  }`}
                >
                  <UserMinus size={20} />
                  <span>Partial</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate(attendee.id!, 'absent')}
                  className={`flex items-center justify-center p-3 rounded-xl font-bold transition-all ${
                    attendee.status === 'absent'
                      ? 'bg-gray-300 text-gray-700'
                      : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600'
                  }`}
                  title="Mark Absent"
                >
                  <UserX size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isAddingWalkIn && (
        <AttendeeForm
          eventId={eventId}
          title="Add Walk-in Attendee"
          initialData={{ isWalkIn: true, status: 'present' }}
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
