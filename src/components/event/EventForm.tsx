'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventSchema, EventFormValues } from '@/lib/validation/schemas';
import { Save, Loader2, X } from 'lucide-react';

interface EventFormProps {
  initialData?: Partial<EventFormValues>;
  onSubmit: (data: EventFormValues) => Promise<void>;
  onCancel?: () => void;
  title: string;
  isSubmitting: boolean;
}

export default function EventForm({ initialData, onSubmit, onCancel, title, isSubmitting }: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: initialData?.name || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
      startDate: initialData?.startDate || new Date().toISOString().slice(0, 16),
      endDate: initialData?.endDate || new Date().toISOString().slice(0, 16),
      chapter: initialData?.chapter || '',
    },
  });

  return (
    <div className="bg-surface border-2 border-border rounded-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
      <div className="bg-surface/50 border-b border-border px-8 py-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">{title}</h2>
          <p className="text-sm font-bold text-muted uppercase tracking-wider mt-1">Event Configuration</p>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="p-2 text-muted hover:text-foreground transition-colors">
            <X size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
        <div className="grid gap-6">
          <div>
            <label htmlFor="name" className="block text-xs font-black text-muted uppercase tracking-widest mb-2 ml-1">
              Event Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="e.g. Spring Conclave 2024"
              className={`w-full px-5 py-4 bg-surface border-2 rounded-2xl outline-none focus:ring-4 focus:ring-scout-green/10 transition-all font-bold text-foreground placeholder:text-muted ${
                errors.name ? 'border-oa-red bg-oa-red/5 focus:border-oa-red' : 'border-border focus:border-scout-green'
              }`}
            />
            {errors.name && (
              <p className="mt-2 text-sm font-bold text-oa-red ml-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-xs font-black text-muted uppercase tracking-widest mb-2 ml-1">
                Start Date/Time *
              </label>
              <input
                {...register('startDate')}
                type="datetime-local"
                id="startDate"
                className={`w-full px-5 py-4 bg-surface border-2 rounded-2xl outline-none focus:ring-4 focus:ring-scout-green/10 transition-all font-bold text-foreground ${
                  errors.startDate ? 'border-oa-red bg-oa-red/5 focus:border-oa-red' : 'border-border focus:border-scout-green'
                }`}
              />
              {errors.startDate && (
                <p className="mt-2 text-sm font-bold text-oa-red ml-1">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-xs font-black text-muted uppercase tracking-widest mb-2 ml-1">
                End Date/Time *
              </label>
              <input
                {...register('endDate')}
                type="datetime-local"
                id="endDate"
                className={`w-full px-5 py-4 bg-surface border-2 rounded-2xl outline-none focus:ring-4 focus:ring-scout-green/10 transition-all font-bold text-foreground ${
                  errors.endDate ? 'border-oa-red bg-oa-red/5 focus:border-oa-red' : 'border-border focus:border-scout-green'
                }`}
              />
              {errors.endDate && (
                <p className="mt-2 text-sm font-bold text-oa-red ml-1">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="date" className="block text-xs font-black text-muted uppercase tracking-widest mb-2 ml-1">
              Event Date *
            </label>
            <input
              {...register('date')}
              type="date"
              id="date"
              className={`w-full px-5 py-4 bg-surface border-2 rounded-2xl outline-none focus:ring-4 focus:ring-scout-green/10 transition-all font-bold text-foreground ${
                errors.date ? 'border-oa-red bg-oa-red/5 focus:border-oa-red' : 'border-border focus:border-scout-green'
              }`}
            />
            {errors.date && (
              <p className="mt-2 text-sm font-bold text-oa-red ml-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="chapter" className="block text-xs font-black text-muted uppercase tracking-widest mb-2 ml-1">
              Chapter (Optional)
            </label>
            <input
              {...register('chapter')}
              type="text"
              id="chapter"
              placeholder="e.g. Kittatinny"
              className="w-full px-5 py-4 bg-surface border-2 border-border rounded-2xl outline-none focus:ring-4 focus:ring-scout-green/10 focus:border-scout-green transition-all font-bold text-foreground placeholder:text-muted"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border flex justify-end gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-4 text-muted font-black uppercase tracking-widest text-sm hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-3 bg-scout-green hover:bg-scout-green-dark disabled:bg-scout-green/40 text-white px-8 py-4 rounded-2xl transition-all font-black uppercase tracking-widest text-sm shadow-lg shadow-scout-green/20 active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Event
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
