'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/storage/db';
import { useState } from 'react';
import {
  Users,
  Upload,
  CheckSquare,
  BarChart3,
  Download,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Components
import AttendeeList from '@/components/event/AttendeeList';
import CSVImporter from '@/components/event/CSVImporter';
import CheckInMode from '@/components/event/CheckInMode';
import ReconciliationView from '@/components/event/ReconciliationView';
import ReconciliationPanel from '@/components/event/ReconciliationPanel';
import EventHeader from '@/components/event/EventHeader';
import ExportModal from '@/components/event/ExportModal';

type Tab = 'checkin' | 'attendees' | 'import' | 'reconciliation';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = Number(params.eventId);

  const [activeTab, setActiveTab] = useState<Tab>('checkin');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const event = useLiveQuery(() => db.events.get(eventId), [eventId]);
  const attendees = useLiveQuery(() => db.attendees.where('eventId').equals(eventId).toArray(), [eventId]);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500">Loading event details...</p>
      </div>
    );
  }

  const handleDeleteEvent = async () => {
    if (confirm('Are you sure you want to delete this event and ALL its attendees? This cannot be undone.')) {
      await db.transaction('rw', [db.events, db.attendees], async () => {
        await db.attendees.where('eventId').equals(eventId).delete();
        await db.events.delete(eventId);
      });
      router.push('/');
    }
  };

  const tabs = [
    { id: 'checkin', label: 'Check-in', icon: CheckSquare },
    { id: 'attendees', label: 'List', icon: Users },
    { id: 'import', label: 'Import', icon: Upload },
    { id: 'reconciliation', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <EventHeader event={event} totalAttendees={attendees?.length || 0} />

      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6 col-span-full">
            {/* Desktop Tabs - Hidden on mobile as it has bottom nav or top sticky search */}
            <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-2xl border-2 border-gray-100 w-fit mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all",
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
              {activeTab === 'checkin' && (
                <CheckInMode eventId={eventId} attendees={attendees || []} />
              )}

              {activeTab === 'attendees' && (
                <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Attendee List</h2>
                  </div>
                  <AttendeeList eventId={eventId} attendees={attendees || []} />
                </div>
              )}

              {activeTab === 'import' && (
                <div className="max-w-2xl mx-auto">
                  <CSVImporter eventId={eventId} />
                </div>
              )}

              {activeTab === 'reconciliation' && (
                <ReconciliationView attendees={attendees || []} />
              )}
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-32">
            <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider text-center">Summary</h3>
              <ReconciliationPanel attendees={attendees || []} />
            </div>

            <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-wider text-center">Actions</h3>
              <div className="grid gap-3">
                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-black transition-all shadow-md active:scale-95"
                >
                  <Download size={20} />
                  Export Data
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="flex items-center justify-center gap-2 border-2 border-red-100 hover:bg-red-50 text-red-600 px-6 py-4 rounded-xl font-black transition-all active:scale-95"
                >
                  <Trash2 size={20} />
                  Delete Event
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-30 flex justify-around items-center pb-safe-area">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
              activeTab === tab.id ? "text-blue-600 scale-110" : "text-gray-400"
            )}
          >
            <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] font-black uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </nav>

      {event && attendees && (
        <ExportModal
          event={event}
          attendees={attendees}
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}
    </div>
  );
}
