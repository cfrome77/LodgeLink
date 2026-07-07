'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { EventFormValues } from '@/lib/validation/schemas';
import { db } from '@/lib/storage/db';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import EventForm from '@/components/event/EventForm';

export default function NewEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: EventFormValues) => {
    setIsSubmitting(true);
    try {
      const id = await db.events.add(data);
      router.push(`/events?id=${id}`);
    } catch (error) {
      console.error('Failed to create event:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Link
        href="/"
        className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors font-black uppercase tracking-widest text-xs"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Events
      </Link>

      <EventForm
        title="Create New Event"
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
