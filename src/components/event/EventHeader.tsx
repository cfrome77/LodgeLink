'use client';

import { Event } from '@/types/event';
import { format } from 'date-fns';
import { Calendar, MapPin, ArrowLeft, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import EventForm from './EventForm';
import { db } from '@/lib/storage/db';
import { EventFormValues } from '@/lib/validation/schemas';

interface EventHeaderProps {
  event: Event;
  totalAttendees: number;
}

export default function EventHeader({ event, totalAttendees }: EventHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateEvent = async (data: EventFormValues) => {
    setIsSubmitting(true);
    try {
      await db.events.update(event.id!, data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 px-4 py-4 sm:py-6">
      <div className="container mx-auto">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 -ml-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 truncate tracking-tight uppercase">
                {event.name}
              </h1>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                title="Edit Event"
              >
                <Settings size={18} />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-bold text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-blue-600" />
                <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
              </div>
              {event.chapter && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-blue-600" />
                  <span>{event.chapter}</span>
                </div>
              )}
              <div className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[10px] uppercase font-black tracking-widest">
                {totalAttendees} Total
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl">
            <EventForm
              title="Edit Event"
              initialData={event}
              onSubmit={handleUpdateEvent}
              onCancel={() => setIsEditing(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
    </header>
  );
}
