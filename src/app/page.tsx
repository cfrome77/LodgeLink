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
          <h1 className="text-3xl font-bold text-gray-900">LodgeMaster Companion</h1>
          <p className="text-gray-600">Event attendance management and export</p>
        </div>
        <Link
          href="/events/new"
          className="inline-flex items-center gap-2 bg-scout-green hover:bg-scout-green-dark text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-md active:scale-95"
        >
          <PlusCircle size={18} />
          <span>New Event</span>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-khaki/30 border-2 border-dashed border-khaki-dark rounded-3xl">
            <Calendar className="mx-auto text-khaki-dark mb-4" size={64} />
            <h3 className="text-xl font-black text-scout-green-dark uppercase tracking-tight">No events yet</h3>
            <p className="text-gray-500 mb-8 font-bold">Start your scouting season by creating an event.</p>
            <Link
              href="/events/new"
              className="inline-flex items-center gap-2 bg-scout-green text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-scout-green-dark transition-all shadow-lg shadow-scout-green/20"
            >
              Create an event &rarr;
            </Link>
          </div>
        ) : (
          events?.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group bg-white border-2 border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:border-scout-green/30 transition-all border-l-8 border-l-scout-green"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-khaki text-scout-green p-3 rounded-2xl">
                  <Calendar size={28} />
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-scout-green transition-all group-hover:translate-x-1" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{event.name}</h3>
              <p className="text-gray-500 text-sm mb-4">
                {format(new Date(event.date), 'PPPP')}
              </p>
              {event.chapter && (
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full w-fit">
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
