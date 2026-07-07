"use client";

import Image from "next/image";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/storage/db";
import { PlusCircle, Calendar, Users, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export default function Home() {
  const events = useLiveQuery(() => db.events.toArray());

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header section with Logo + Contextual Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src="/lodgelink-logo-vertical.png"
            alt="LodgeLink Logo"
            width={180}
            height={40}
            style={{ width: "180px", height: "auto" }}
            priority
          />
          {/* Greeting fills the space and adds professional polish */}
          <div className="border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
            <h2 className="text-xl font-black text-foreground">Dashboard</h2>
            <p className="text-sm text-muted font-medium">
              Manage your lodge events and track your progress.
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-surface border-2 border-dashed border-border rounded-3xl">
            <Calendar
              className="mx-auto text-scout-green mb-4 opacity-50"
              size={64}
            />
            <h3 className="text-xl font-black text-foreground uppercase tracking-tight">
              No events yet
            </h3>
            <p className="text-muted mb-8 font-bold">
              Start your scouting season by creating an event.
            </p>
            <Link
              href="/events/new"
              className="inline-flex items-center gap-2 bg-scout-green text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-scout-green-hover transition-all shadow-lg shadow-scout-green/20"
            >
              <PlusCircle size={18} />
              Create an event &rarr;
            </Link>
          </div>
        ) : (
          events?.map((event) => (
            <Link
              key={event.id}
              href={`/events?id=${event.id}`}
              className="group bg-surface border-2 border-border rounded-3xl p-8 hover:shadow-xl hover:border-scout-green/30 transition-all border-l-8 border-l-scout-green"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-khaki text-scout-green p-3 rounded-2xl">
                  <Calendar size={28} />
                </div>
                <ChevronRight
                  className="text-muted group-hover:text-scout-green transition-all group-hover:translate-x-1"
                  size={24}
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                {event.name}
              </h3>
              <p className="text-muted text-sm mb-4">
                {event.startDate &&
                  format(
                    new Date(event.startDate + "T00:00:00"),
                    "MMM d, yyyy",
                  )}
                {event.endDate &&
                  event.endDate !== event.startDate &&
                  ` - ${format(new Date(event.endDate + "T00:00:00"), "MMM d, yyyy")}`}
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
