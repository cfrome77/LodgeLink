'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AttendeeSchema, AttendeeFormValues } from '@/lib/validation/schemas';
import { X, Save, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Attendee } from '@/types/attendee';
import { Member } from '@/types/member';
import { Event as EventType } from '@/types/event';
import { db } from '@/lib/storage/db';

interface WalkinModalProps {
  eventId: number;
  event: EventType;
  onClose: () => void;
  onSubmit: (data: AttendeeFormValues) => void;
}

export default function WalkinModal({ eventId, event, onClose, onSubmit }: WalkinModalProps) {
  const [suggestions, setSuggestions] = useState<Member[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AttendeeFormValues>({
    resolver: zodResolver(AttendeeSchema),
    defaultValues: {
      eventId,
      firstName: '',
      lastName: '',
      memberId: '',
      status: 'present',
      checkInDate: event.startDate || new Date().toISOString().slice(0, 16),
      checkOutDate: event.endDate || new Date().toISOString().slice(0, 16),
      notes: 'Walk-in attendee',
      isWalkIn: true,
      isImported: false,
      paidAmount: 0,
      paidInFull: false,
      ordeal: false,
      brotherhood: false,
      healthForm: false,
      service: 0,
      isActive: true,
    },
  });

  const firstName = watch('firstName');
  const lastName = watch('lastName');

  useEffect(() => {
    const fetchSuggestions = async () => {
      if ((firstName && firstName.length > 1) || (lastName && lastName.length > 1)) {
        const results = await db.members
          .toArray();

        // Filter
        const filtered = results.filter(a => {
          if (!a.isActive) return false;
          const matches = (firstName && a.firstName.toLowerCase().startsWith(firstName.toLowerCase())) ||
                        (lastName && a.lastName.toLowerCase().startsWith(lastName.toLowerCase()));
          return matches;
        }).slice(0, 5);

        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [firstName, lastName]);

  const selectSuggestion = (a: Member) => {
    setValue('firstName', a.firstName);
    setValue('lastName', a.lastName);
    setValue('middleName', a.middleName || '');
    setValue('memberId', a.memberId || '');
    setValue('role', a.role || '');
    setShowSuggestions(false);
  };

  const syncToMemberTable = async (data: AttendeeFormValues) => {
    try {
      const existing = await db.members.where('memberId').equals(data.memberId).first();
      const memberData = {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        memberId: data.memberId,
        role: data.role,
        isActive: data.isActive !== undefined ? data.isActive : true,
      };

      if (existing) {
        await db.members.update(existing.id!, memberData);
      } else {
        await db.members.add(memberData);
      }
    } catch (error) {
      console.error('Failed to sync to member table:', error);
    }
  };

  const handleFormSubmit = async (data: AttendeeFormValues) => {
    await syncToMemberTable(data);
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-khaki">
          <div className="flex items-center gap-2">
            <div className="bg-scout-green p-1.5 rounded-lg text-white">
              <UserPlus size={20} />
            </div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Add Walk-in</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="firstName" className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-1">First Name *</label>
              <input
                {...register('firstName')}
                id="firstName"
                autoFocus
                autoComplete="off"
                placeholder="Required"
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl outline-none focus:ring-4 focus:ring-scout-green/10 transition-all ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-scout-green'}`}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              />

              {showSuggestions && (
                <div className="absolute z-10 left-0 right-0 mt-1 bg-white border-2 border-gray-100 rounded-xl shadow-xl overflow-hidden">
                  {suggestions.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => selectSuggestion(a)}
                      className="w-full text-left px-4 py-3 hover:bg-khaki/30 border-b border-gray-50 last:border-0 transition-colors flex justify-between items-center"
                    >
                      <div>
                        <div className="font-bold text-gray-900">{a.firstName} {a.lastName}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-black">{a.memberId}</div>
                      </div>
                      <div className="text-[10px] bg-scout-green/10 text-scout-green px-2 py-1 rounded-full font-black uppercase">Recent</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-1">Last Name *</label>
              <input
                {...register('lastName')}
                id="lastName"
                placeholder="Required"
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl outline-none focus:ring-4 focus:ring-scout-green/10 transition-all ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-scout-green'}`}
              />
            </div>
            <div>
              <label htmlFor="memberId" className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-1">Member ID *</label>
              <input
                {...register('memberId')}
                id="memberId"
                placeholder="Required"
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl outline-none focus:ring-4 focus:ring-scout-green/10 transition-all ${errors.memberId ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-scout-green'}`}
              />
              {errors.memberId && <p className="mt-1 text-xs font-bold text-red-600 ml-1 uppercase">{errors.memberId.message}</p>}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-scout-green hover:bg-scout-green-dark text-white px-6 py-5 rounded-xl text-lg font-black uppercase tracking-widest transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
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
