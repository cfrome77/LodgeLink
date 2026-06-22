'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AttendeeSchema, AttendeeFormValues } from '@/lib/validation/schemas';
import { X, Save } from 'lucide-react';

interface AttendeeFormProps {
  eventId: number;
  onClose: () => void;
  onSubmit: (data: AttendeeFormValues) => void;
  initialData?: Partial<AttendeeFormValues>;
  title: string;
}

export default function AttendeeForm({ eventId, onClose, onSubmit, initialData, title }: AttendeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttendeeFormValues>({
    resolver: zodResolver(AttendeeSchema),
    defaultValues: {
      eventId,
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      memberId: initialData?.memberId || '',
      status: initialData?.status || 'absent',
      notes: initialData?.notes || '',
      isWalkIn: initialData?.isWalkIn || false,
      isImported: initialData?.isImported || false,
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                {...register('firstName')}
                id="firstName"
                className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                {...register('lastName')}
                id="lastName"
                className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-1">Member ID (Optional)</label>
            <input
              {...register('memberId')}
              id="memberId"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="LodgeMaster ID"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Attendance Status</label>
            <select
              {...register('status')}
              id="status"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="absent">Absent</option>
              <option value="present">Present</option>
              <option value="partial">Partial</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              {...register('notes')}
              id="notes"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isWalkIn"
              {...register('isWalkIn')}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isWalkIn" className="text-sm text-gray-700">Mark as Walk-in</label>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              <Save size={18} />
              Save Attendee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
