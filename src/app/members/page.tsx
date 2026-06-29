'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/storage/db';
import { useState, useMemo } from 'react';
import {
  Users,
  Search,
  UserPlus,
  Edit2,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import MemberFormModal from '@/components/members/MemberFormModal';
import { Member } from '@/types/member';

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{added: number} | null>(null);

  const members = useLiveQuery(() => db.members.toArray());

  const filteredMembers = useMemo(() => {
    if (!members) return [];
    return members.filter(m =>
      `${m.firstName} ${m.middleName || ''} ${m.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.memberId.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));
  }, [members, searchTerm]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this member from the Master List? This will NOT delete their historical attendance in events.')) {
      await db.members.delete(id);
    }
  };

  const handleToggleActive = async (member: Member) => {
    await db.members.update(member.id!, { isActive: !member.isActive });
  };

  const handleSyncFromEvents = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      const attendees = await db.attendees.toArray();
      let addedCount = 0;

      for (const a of attendees) {
        if (!a.memberId) continue;
        const existing = await db.members.where('memberId').equals(a.memberId).first();
        if (!existing) {
          await db.members.add({
            firstName: a.firstName,
            lastName: a.lastName,
            middleName: a.middleName,
            memberId: a.memberId,
            role: a.role,
            isActive: true
          });
          addedCount++;
        }
      }
      setSyncResult({ added: addedCount });
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight uppercase">Master Member List</h1>
          <p className="text-muted font-bold">Shared directory for all events</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={handleSyncFromEvents}
            disabled={isSyncing}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface border-2 border-border hover:border-scout-green text-muted hover:text-scout-green px-6 py-3 rounded-xl font-black transition-all uppercase tracking-widest text-xs"
            title="Import members from previous event data"
          >
            <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Sync from Events'}</span>
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-scout-green hover:bg-scout-green-hover text-white px-8 py-3 rounded-xl font-black transition-all shadow-md active:scale-95 uppercase tracking-widest text-xs"
          >
            <UserPlus size={18} />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {syncResult && (
        <div className="mb-6 flex items-center gap-3 bg-scout-green/10 border-2 border-scout-green/20 p-4 rounded-2xl text-scout-green animate-in fade-in slide-in-from-top-2">
          <ShieldCheck size={20} />
          <p className="font-bold text-sm">Successfully synced {syncResult.added} new members from historical event data.</p>
          <button onClick={() => setSyncResult(null)} className="ml-auto text-xs font-black uppercase underline">Dismiss</button>
        </div>
      )}

      <div className="bg-surface border-2 border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border bg-surface/50">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input
              type="text"
              placeholder="Search by name or Member ID..."
              className="w-full pl-12 pr-4 py-3 bg-background border-2 border-border rounded-2xl outline-none focus:ring-4 focus:ring-scout-green/10 focus:border-scout-green transition-all font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-muted/50 border-b border-border">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-muted uppercase tracking-widest">Member</th>
                <th className="px-8 py-4 text-[10px] font-black text-muted uppercase tracking-widest">Member ID</th>
                <th className="px-8 py-4 text-[10px] font-black text-muted uppercase tracking-widest">Role</th>
                <th className="px-8 py-4 text-[10px] font-black text-muted uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-muted uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-muted font-bold italic">
                    {members?.length === 0
                      ? "Master list is empty. Add members manually or sync from existing events."
                      : "No members match your search."}
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className={`hover:bg-surface-muted/30 transition-colors ${!member.isActive ? 'opacity-60' : ''}`}>
                    <td className="px-8 py-5">
                      <div className="font-bold text-foreground">{member.firstName} {member.middleName ? `${member.middleName} ` : ''}{member.lastName}</div>
                    </td>
                    <td className="px-8 py-5 font-mono text-sm text-muted">
                      {member.memberId}
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-black text-scout-green uppercase tracking-tighter">{member.role || '-'}</span>
                    </td>
                    <td className="px-8 py-5">
                      <button
                        onClick={() => handleToggleActive(member)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border-2 ${
                          member.isActive
                            ? 'bg-status-present-bg text-status-present border-status-present/20'
                            : 'bg-status-absent-bg text-status-absent border-status-absent/20'
                        }`}
                      >
                        {member.isActive ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                        {member.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="p-2 text-muted hover:text-scout-green hover:bg-scout-green/5 rounded-lg transition-all"
                          title="Edit Member"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id!)}
                          className="p-2 text-muted hover:text-oa-red hover:bg-oa-red/5 rounded-lg transition-all"
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

      {(isAdding || editingMember) && (
        <MemberFormModal
          initialData={editingMember || undefined}
          onClose={() => {
            setIsAdding(false);
            setEditingMember(null);
          }}
          onSubmit={async (data) => {
            if (editingMember) {
              await db.members.update(editingMember.id!, data);

              // Optional: Propagate changes to unlocked events
              if (confirm('Do you want to update this member\'s information across all current (unlocked) events? Historical records in locked events will remain unchanged.')) {
                const unlockedEvents = await db.events.where('isLocked').notEqual(1).toArray();
                const eventIds = unlockedEvents.map(e => e.id!);

                // Find all attendee records for this member in unlocked events
                const attendeeRecords = await db.attendees
                  .where('memberId').equals(data.memberId)
                  .filter(a => eventIds.includes(a.eventId))
                  .toArray();

                for (const a of attendeeRecords) {
                  await db.attendees.update(a.id!, {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    middleName: data.middleName,
                    role: data.role
                  });
                }
              }
            } else {
              await db.members.add(data);
            }
            setIsAdding(false);
            setEditingMember(null);
          }}
          title={editingMember ? 'Edit Member' : 'Add New Member'}
        />
      )}
    </div>
  );
}
