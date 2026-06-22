'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventSchema, EventFormValues } from '@/lib/validation/schemas';
import { db } from '@/lib/storage/db';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: '',
      date: new Date().toISOString().split('T')[0],
      chapter: '',
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    setIsSubmitting(true);
    try {
      const id = await db.events.add(data);
      router.push(`/events/${id}`);
    } catch (error) {
      console.error('Failed to create event:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-1" />
        Back to Events
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-sm text-gray-500">Enter event details to get started.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Event Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="e.g. Spring Conclave 2024"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Event Date *
            </label>
            <input
              {...register('date')}
              type="date"
              id="date"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="chapter" className="block text-sm font-medium text-gray-700 mb-1">
              Chapter (Optional)
            </label>
            <input
              {...register('chapter')}
              type="text"
              id="chapter"
              placeholder="e.g. Kittatinny"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md transition-colors font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Create Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
