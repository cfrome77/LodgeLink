'use client';

import { Event } from '@/types/event';
import { format } from 'date-fns';
import { Calendar, MapPin, ArrowLeft, Settings, Lock, Unlock } from 'lucide-react';
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

  const handleToggleLock = async () => {
    try {
      await db.events.update(event.id!, { isLocked: !event.isLocked });
    } catch (error) {
      console.error('Failed to toggle lock:', error);
    }
  };

  return (
    <>
      <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40 px-4 py-4 sm:py-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <Link
              href="/"
            className="p-2 -ml-2 text-muted hover:text-scout-green transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground truncate tracking-tight uppercase">
                  {event.name}
                </h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-muted hover:text-scout-green hover:bg-surface rounded-lg transition-all"
                  title="Edit Event"
                >
                  <Settings size={20} />
                </button>
                <button
                  onClick={handleToggleLock}
                  className={`p-2 rounded-lg transition-all ${
                    event.isLocked
                      ? 'text-oa-red bg-oa-red/5 hover:bg-oa-red/10'
                      : 'text-muted hover:text-scout-green hover:bg-surface'
                  }`}
                  title={event.isLocked ? "Unlock Event" : "Lock Event"}
                >
                  {event.isLocked ? <Lock size={20} /> : <Unlock size={20} />}
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-bold text-muted">
                <div className="flex items-center gap-1">
                <Calendar size={14} className="text-scout-green" />
                  <span>
                    {event.startDate && event.endDate ? (
                      <>
                        {format(new Date(event.startDate), 'MMM d, h:mm a')} - {format(new Date(event.endDate), 'MMM d, h:mm a')}
                      </>
                    ) : (
                      format(new Date(event.date), 'MMM d, yyyy')
                    )}
                  </span>
                </div>
                {event.chapter && (
                  <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-scout-green" />
                    <span>{event.chapter}</span>
                  </div>
                )}
              <div className="bg-khaki text-scout-green-dark px-2 py-0.5 rounded-full text-[10px] uppercase font-black tracking-widest border border-khaki-dark/20">
                  {totalAttendees} Total
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl">
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
    </>
  );
}
