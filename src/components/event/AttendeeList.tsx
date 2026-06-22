'use client';

import { Attendee } from '@/types/attendee';
import { db } from '@/lib/storage/db';
import { Edit2, Trash2, UserPlus, Search, UserCheck } from 'lucide-react';
import { useState } from 'react';
import AttendeeForm from './AttendeeForm';

interface AttendeeListProps {
  eventId: number;
  attendees: Attendee[];
}

export default function AttendeeList({ eventId, attendees }: AttendeeListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingAttendee, setEditingAttendee] = useState<Attendee | null>(null);

  const filteredAttendees = attendees.filter(a =>
    `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.memberId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this attendee?')) {
      await db.attendees.delete(id);
    }
  };

  const handleStatusToggle = async (attendee: Attendee) => {
    const nextStatus = attendee.status === 'absent' ? 'present' : 'absent';
    await db.attendees.update(attendee.id!, { status: nextStatus });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search attendees..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <UserPlus size={20} />
          <span>Add Attendee</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAttendees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                    No attendees found.
                  </td>
                </tr>
              ) : (
                filteredAttendees.map((attendee) => (
                  <tr key={attendee.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{attendee.firstName} {attendee.lastName}</div>
                      {attendee.notes && <div className="text-xs text-gray-500 truncate max-w-[200px]">{attendee.notes}</div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {attendee.memberId || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusToggle(attendee)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                          attendee.status === 'present'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : attendee.status === 'partial'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <UserCheck size={14} />
                        {attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      {attendee.isWalkIn ? (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Walk-in</span>
                      ) : (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Imported</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingAttendee(attendee)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(attendee.id!)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAdding && (
        <AttendeeForm
          eventId={eventId}
          title="Add New Attendee"
          onClose={() => setIsAdding(false)}
          onSubmit={async (data) => {
            await db.attendees.add(data);
            setIsAdding(false);
          }}
        />
      )}

      {editingAttendee && (
        <AttendeeForm
          eventId={eventId}
          title="Edit Attendee"
          initialData={editingAttendee}
          onClose={() => setEditingAttendee(null)}
          onSubmit={async (data) => {
            await db.attendees.update(editingAttendee.id!, data);
            setEditingAttendee(null);
          }}
        />
      )}
    </div>
  );
}
