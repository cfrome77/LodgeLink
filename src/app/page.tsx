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
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <PlusCircle size={20} />
          <span>New Event</span>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white border-2 border-dashed border-gray-300 rounded-lg">
            <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900">No events yet</h3>
            <p className="text-gray-500 mb-6">Create your first event to get started.</p>
            <Link
              href="/events/new"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Create an event &rarr;
            </Link>
          </div>
        ) : (
          events?.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all border-l-4 border-l-blue-600"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-50 text-blue-700 p-2 rounded-lg">
                  <Calendar size={24} />
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
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
