'use client';

import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/storage/db';
import { PlusCircle, Calendar, Users, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

export default function Home() {
  const events = useLiveQuery(() => db.events.toArray());

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">LodgeMaster Companion</h1>
          <p className="text-muted">Event attendance management and export</p>
        </div>
        <Link
          href="/events/new"
          className="inline-flex items-center gap-2 bg-scout-green hover:bg-scout-green-hover text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-md active:scale-95"
        >
          <PlusCircle size={18} />
          <span>New Event</span>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-surface border-2 border-dashed border-border rounded-3xl">
            <Calendar className="mx-auto text-scout-green mb-4 opacity-50" size={64} />
            <h3 className="text-xl font-black text-foreground uppercase tracking-tight">No events yet</h3>
            <p className="text-muted mb-8 font-bold">Start your scouting season by creating an event.</p>
            <Link
              href="/events/new"
              className="inline-flex items-center gap-2 bg-scout-green text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-scout-green-hover transition-all shadow-lg shadow-scout-green/20"
            >
              Create an event &rarr;
            </Link>
          </div>
        ) : (
          events?.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group bg-surface border-2 border-border rounded-3xl p-8 hover:shadow-xl hover:border-scout-green/30 transition-all border-l-8 border-l-scout-green"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-khaki text-scout-green p-3 rounded-2xl">
                  <Calendar size={28} />
                </div>
                <ChevronRight className="text-muted group-hover:text-scout-green transition-all group-hover:translate-x-1" size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{event.name}</h3>
              <p className="text-muted text-sm mb-4">
                {format(new Date(event.date), 'PPPP')}
              </p>
              {event.chapter && (
                <div className="flex items-center gap-2 text-sm text-muted bg-surface-muted px-3 py-1 rounded-full w-fit">
                  <Users size={14} />
                  <span>{event.chapter}</span>
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
