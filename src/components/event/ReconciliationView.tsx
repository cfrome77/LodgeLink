'use client';

import { Attendee } from '@/types/attendee';
import { getReconciliationStats } from '@/lib/checkin/checkin';
import { Users, UserCheck, UserPlus, UserX, AlertTriangle, FileText } from 'lucide-react';

interface ReconciliationViewProps {
  attendees: Attendee[];
}

export default function ReconciliationView({ attendees }: ReconciliationViewProps) {
  const stats = getReconciliationStats(attendees);
  const missingAttendees = attendees.filter(a => a.isImported && a.status === 'absent');
  const checkedInAttendees = attendees.filter(a => a.status === 'present' || a.status === 'partial');

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-blue-600 mb-2 bg-blue-50 w-fit p-2 rounded-lg">
            <Users size={24} />
          </div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Registered</p>
          <h3 className="text-3xl font-bold text-gray-900">{stats.registered}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-green-600 mb-2 bg-green-50 w-fit p-2 rounded-lg">
            <UserCheck size={24} />
          </div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Checked In</p>
          <h3 className="text-3xl font-bold text-gray-900">{stats.checkedIn}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-purple-600 mb-2 bg-purple-50 w-fit p-2 rounded-lg">
            <UserPlus size={24} />
          </div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Walk-ins</p>
          <h3 className="text-3xl font-bold text-gray-900">{stats.walkIns}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-red-600 mb-2 bg-red-50 w-fit p-2 rounded-lg">
            <UserX size={24} />
          </div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Missing</p>
          <h3 className="text-3xl font-bold text-gray-900">{stats.missing}</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Missing Attendees */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 bg-red-50/50 flex items-center justify-between">
            <h3 className="font-bold text-red-800 flex items-center gap-2">
              <AlertTriangle size={18} />
              Missing Registered (Not Checked In)
            </h3>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold">{missingAttendees.length}</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {missingAttendees.length === 0 ? (
              <p className="p-6 text-center text-gray-500 italic">No missing attendees! Great job.</p>
            ) : (
              <table className="w-full text-left">
                <tbody className="divide-y divide-gray-100">
                  {missingAttendees.map(a => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{a.firstName} {a.lastName}</td>
                      <td className="px-6 py-3 text-sm text-gray-500 font-mono">{a.memberId || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Checked In List */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 bg-green-50/50 flex items-center justify-between">
            <h3 className="font-bold text-green-800 flex items-center gap-2">
              <FileText size={18} />
              Confirmed Attendance
            </h3>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">{checkedInAttendees.length}</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {checkedInAttendees.length === 0 ? (
              <p className="p-6 text-center text-gray-500 italic">No one has checked in yet.</p>
            ) : (
              <table className="w-full text-left">
                <tbody className="divide-y divide-gray-100">
                  {checkedInAttendees.map(a => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div className="font-medium text-gray-900">{a.firstName} {a.lastName}</div>
                        {a.isWalkIn && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-bold uppercase">Walk-in</span>}
                      </td>
                      <td className="px-6 py-3">
                        <span className={`text-xs font-bold uppercase ${a.status === 'present' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
