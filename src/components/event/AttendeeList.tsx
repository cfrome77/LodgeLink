'use client';

import { Attendee } from '@/types/attendee';
import { db } from '@/lib/storage/db';
import { Edit2, Trash2, UserPlus, Search, UserCheck, ShieldCheck, CreditCard } from 'lucide-react';
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
    `${a.firstName} ${a.middleName || ''} ${a.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-scout-green/10 focus:border-scout-green transition-all font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 bg-scout-green hover:bg-scout-green-dark text-white px-6 py-2 rounded-xl font-black transition-all shadow-md active:scale-95 uppercase tracking-widest text-xs"
        >
          <UserPlus size={18} />
          <span>Add Attendee</span>
        </button>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role / ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Flags</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAttendees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-bold italic">
                    No attendees found.
                  </td>
                </tr>
              ) : (
                filteredAttendees.map((attendee) => (
                  <tr key={attendee.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{attendee.firstName} {attendee.middleName ? `${attendee.middleName} ` : ''}{attendee.lastName}</div>
                      {attendee.isWalkIn && <span className="text-[9px] bg-scout-green/10 text-scout-green px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider">Walk-in</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-black text-scout-green uppercase tracking-tighter">{attendee.role || '-'}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{attendee.memberId || '-'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusToggle(attendee)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                          attendee.status === 'present'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : attendee.status === 'partial'
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        <UserCheck size={14} />
                        {attendee.status}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {attendee.paidInFull ? <CreditCard size={16} className="text-green-500" /> : <CreditCard size={16} className="text-red-300" />}
                        {attendee.healthForm && <ShieldCheck size={16} className="text-blue-500" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingAttendee(attendee)}
                          className="p-2 text-gray-400 hover:text-scout-green hover:bg-khaki rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(attendee.id!)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
