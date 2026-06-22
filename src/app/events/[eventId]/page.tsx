'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/storage/db';
import { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Upload,
  CheckSquare,
  BarChart3,
  Download,
  Trash2,
  Calendar,
  MapPin
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Components
import AttendeeList from '@/components/event/AttendeeList';
import CSVImporter from '@/components/event/CSVImporter';
import CheckInMode from '@/components/event/CheckInMode';
import ReconciliationView from '@/components/event/ReconciliationView';
import { exportToExcel, exportToCSV } from '@/lib/export/excel';

type Tab = 'attendees' | 'import' | 'checkin' | 'reconciliation';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = Number(params.eventId);

  const [activeTab, setActiveTab] = useState<Tab>('attendees');
  const [isExporting, setIsExporting] = useState(false);

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

  const handleExportExcel = () => {
    if (!attendees) return;
    exportToExcel(event, attendees);
  };

  const handleExportCSV = () => {
    if (!attendees) return;
    exportToCSV(event, attendees);
  };

  const tabs = [
    { id: 'attendees', label: 'Attendees', icon: Users },
    { id: 'import', label: 'Black Pug Import', icon: Upload },
    { id: 'checkin', label: 'Live Check-in', icon: CheckSquare },
    { id: 'reconciliation', label: 'Reconciliation', icon: BarChart3 },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="space-y-1">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{event.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm">
              <Calendar size={14} className="text-blue-600" />
              <span>{format(new Date(event.date), 'PPPP')}</span>
            </div>
            {event.chapter && (
              <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm">
                <MapPin size={14} className="text-blue-600" />
                <span>{event.chapter}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm">
              <Users size={14} className="text-blue-600" />
              <span>{attendees?.length || 0} Total</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative group">
            <button
              onClick={() => setIsExporting(!isExporting)}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-sm"
            >
              <Download size={20} />
              <span>Export</span>
            </button>
            {isExporting && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => { handleExportExcel(); setIsExporting(false); }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <div className="bg-green-100 p-1.5 rounded-md text-green-700">
                    <Download size={16} />
                  </div>
                  <span>Excel (LodgeMaster)</span>
                </button>
                <button
                  onClick={() => { handleExportCSV(); setIsExporting(false); }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors border-t border-gray-100"
                >
                  <div className="bg-blue-100 p-1.5 rounded-md text-blue-700">
                    <Download size={16} />
                  </div>
                  <span>CSV Backup</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleDeleteEvent}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete Event"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "border-blue-600 text-blue-600 bg-blue-50/30"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[50vh] animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'attendees' && (
          <AttendeeList eventId={eventId} attendees={attendees || []} />
        )}

        {activeTab === 'import' && (
          <div className="max-w-2xl mx-auto">
            <CSVImporter eventId={eventId} />
          </div>
        )}

        {activeTab === 'checkin' && (
          <CheckInMode eventId={eventId} attendees={attendees || []} />
        )}

        {activeTab === 'reconciliation' && (
          <ReconciliationView attendees={attendees || []} />
        )}
      </div>
    </div>
  );
}
