'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AttendeeSchema, AttendeeFormValues } from '@/lib/validation/schemas';
import { X, Save, UserPlus } from 'lucide-react';

interface WalkinModalProps {
  eventId: number;
  onClose: () => void;
  onSubmit: (data: AttendeeFormValues) => void;
}

export default function WalkinModal({ eventId, onClose, onSubmit }: WalkinModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttendeeFormValues>({
    resolver: zodResolver(AttendeeSchema),
    defaultValues: {
      eventId,
      firstName: '',
      lastName: '',
      memberId: '',
      status: 'present',
      notes: 'Walk-in attendee',
      isWalkIn: true,
      isImported: false,
    },
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 duration-300">
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <UserPlus size={20} />
            </div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Add Walk-in</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-1">First Name</label>
              <input
                {...register('firstName')}
                id="firstName"
                autoFocus
                placeholder="Required"
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-600'}`}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-1">Last Name</label>
              <input
                {...register('lastName')}
                id="lastName"
                placeholder="Required"
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 transition-all ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-600'}`}
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl text-lg font-black transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Save size={24} />
              Save & Check-in
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-4 text-gray-500 font-bold hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
