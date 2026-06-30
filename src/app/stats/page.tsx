'use client';

import GlobalStats from '@/components/shared/GlobalStats';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/storage/db';
import { BarChart3, TrendingUp, Users, Award, Clock } from 'lucide-react';
import { useMemo } from 'react';

export default function StatsPage() {
  const attendees = useLiveQuery(() => db.attendees.toArray());
  const members = useLiveQuery(() => db.members.toArray());

  const roleBreakdown = useMemo(() => {
    if (!attendees) return [];
    const counts: Record<string, number> = {};
    attendees.forEach(a => {
      const role = a.role || 'Unassigned';
      counts[role] = (counts[role] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [attendees]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8 flex flex-col items-center text-center md:items-start md:text-left">
        <h1 className="text-3xl font-black text-foreground tracking-tight uppercase flex items-center gap-3">
          <BarChart3 className="text-scout-green" size={32} />
          <span>Global Statistics</span>
        </h1>
        <p className="text-muted font-bold uppercase tracking-widest text-[10px] sm:text-xs mt-1">Aggregated insights across all events</p>
      </div>

      <GlobalStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Role Breakdown */}
        <div className="bg-surface border-2 border-border rounded-3xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-scout-green" size={20} />
            <h2 className="text-lg font-black text-foreground uppercase tracking-tight">Participation by Role</h2>
          </div>
          <div className="space-y-4">
            {roleBreakdown.length === 0 ? (
              <p className="text-muted italic text-sm">No attendee data available yet.</p>
            ) : (
              roleBreakdown.map(([role, count]) => (
                <div key={role} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-muted">{role}</span>
                    <span className="text-foreground">{count}</span>
                  </div>
                  <div className="w-full bg-surface-muted rounded-full h-2">
                    <div
                      className="bg-scout-green h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(count / (attendees?.length || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Member Status */}
        <div className="bg-surface border-2 border-border rounded-3xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-scout-green" size={20} />
            <h2 className="text-lg font-black text-foreground uppercase tracking-tight">Member Directory Status</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background border-2 border-border p-6 rounded-2xl">
              <div className="text-xs font-black text-muted uppercase tracking-widest mb-1">Active</div>
              <div className="text-3xl font-black text-status-present">{members?.filter(m => m.isActive).length || 0}</div>
            </div>
            <div className="bg-background border-2 border-border p-6 rounded-2xl">
              <div className="text-xs font-black text-muted uppercase tracking-widest mb-1">Inactive</div>
              <div className="text-3xl font-black text-status-absent">{members?.filter(m => !m.isActive).length || 0}</div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-khaki/20 border-2 border-dashed border-khaki-dark rounded-2xl">
            <h3 className="text-sm font-black text-foreground uppercase mb-2 flex items-center gap-2">
              <Award size={16} className="text-scout-green" />
              Impact Summary
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              You are managing <strong>{members?.length || 0}</strong> unique members across all chapter activities.
              Total engagement has resulted in <strong>{attendees?.filter(a => a.status !== 'absent').length || 0}</strong> physical check-ins
              and <strong>{attendees?.reduce((acc, a) => acc + (a.service || 0), 0).toFixed(1)}</strong> service hours contributed to the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
