'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AttendeeSchema, AttendeeFormValues } from '@/lib/validation/schemas';
import { X, Save, User, CreditCard, ClipboardCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PREDEFINED_ROLES, PAYMENT_METHODS } from '@/lib/constants';
import { useEffect } from 'react';

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
    watch,
    setValue,
    formState: { errors },
  } = useForm<AttendeeFormValues>({
    resolver: zodResolver(AttendeeSchema),
    defaultValues: {
      eventId,
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      middleName: initialData?.middleName || '',
      memberId: initialData?.memberId || '',
      status: initialData?.status || 'absent',
      notes: initialData?.notes || '',
      isWalkIn: initialData?.isWalkIn || false,
      isImported: initialData?.isImported || false,
      role: initialData?.role || '',
      checkInDate: initialData?.checkInDate || '',
      checkOutDate: initialData?.checkOutDate || '',
      service: initialData?.service || 0,
      ordeal: initialData?.ordeal || false,
      brotherhood: initialData?.brotherhood || false,
      paidAmount: initialData?.paidAmount || 0,
      receiptNumber: initialData?.receiptNumber || '',
      paymentMethod: initialData?.paymentMethod || '',
      paidInFull: initialData?.paidInFull || false,
      dateRegistered: initialData?.dateRegistered || '',
      datePaid: initialData?.datePaid || '',
      healthForm: initialData?.healthForm || false,
    },
  });

  const ordeal = watch('ordeal');
  const brotherhood = watch('brotherhood');

  // Mutual exclusivity for Ordeal and Brotherhood
  useEffect(() => {
    if (ordeal && brotherhood) {
      // This is a simple way to handle it, but might be race-y if not careful.
      // Better to handle it in a change handler if we had one, but watch/useEffect works for MVP.
    }
  }, [ordeal, brotherhood]);

  const handleOrdealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValue('ordeal', checked);
    if (checked) setValue('brotherhood', false);
  };

  const handleBrotherhoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValue('brotherhood', checked);
    if (checked) setValue('ordeal', false);
  };

  const sectionLabelClass = "flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4 mt-2";
  const inputClass = "w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-scout-green/10 focus:border-scout-green transition-all text-sm font-bold";
  const labelClass = "block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider";
  const checkboxContainerClass = "flex items-center gap-3 p-4 border-2 border-gray-50 rounded-xl hover:bg-khaki/30 transition-colors cursor-pointer";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-khaki">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-1 p-8 space-y-8 custom-scrollbar">
          {/* Personal Info */}
          <section>
            <div className={sectionLabelClass}>
              <User size={14} />
              <span>Personal Information</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={labelClass}>First Name *</label>
                <input id="firstName" {...register('firstName')} className={cn(inputClass, errors.firstName && "border-red-500 bg-red-50")} />
              </div>
              <div>
                <label htmlFor="middleName" className={labelClass}>Middle Name</label>
                <input id="middleName" {...register('middleName')} className={inputClass} />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>Last Name *</label>
                <input id="lastName" {...register('lastName')} className={cn(inputClass, errors.lastName && "border-red-500 bg-red-50")} />
              </div>
              <div>
                <label htmlFor="memberId" className={labelClass}>Member ID *</label>
                <input id="memberId" {...register('memberId')} className={cn(inputClass, errors.memberId && "border-red-500 bg-red-50")} />
                {errors.memberId && <p className="mt-1 text-[10px] font-bold text-red-600 ml-1 uppercase">{errors.memberId.message}</p>}
              </div>
              <div className="relative group">
                <label htmlFor="role" className={labelClass}>Role</label>
                <input
                  id="role"
                  {...register('role')}
                  className={inputClass}
                  placeholder="Select or type role..."
                  list="roles-list"
                />
                <datalist id="roles-list">
                  {PREDEFINED_ROLES.map(role => <option key={role} value={role} />)}
                </datalist>
              </div>
            </div>
          </section>

          {/* Logistics & Participation */}
          <section>
            <div className={sectionLabelClass}>
              <ClipboardCheck size={14} />
              <span>Participation & Status</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Attendance Status *</label>
                <select {...register('status')} className={cn(inputClass, errors.status && "border-red-500 bg-red-50")}>
                  <option value="absent">Absent</option>
                  <option value="present">Present</option>
                  <option value="partial">Partial</option>
                </select>
                {errors.status && <p className="mt-1 text-[10px] font-bold text-red-600 ml-1 uppercase">{errors.status.message}</p>}
              </div>
              <div>
                <label htmlFor="service" className={labelClass}>Service (Hours)</label>
                <input
                  id="service"
                  type="number"
                  {...register('service', { valueAsNumber: true })}
                  className={inputClass}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <label htmlFor="ordeal" className={checkboxContainerClass}>
                <input
                  id="ordeal"
                  type="checkbox"
                  {...register('ordeal')}
                  onChange={handleOrdealChange}
                  className="w-5 h-5 rounded border-gray-300 text-scout-green focus:ring-scout-green"
                />
                <span className="text-sm font-bold text-gray-700">Ordeal</span>
              </label>
              <label htmlFor="brotherhood" className={checkboxContainerClass}>
                <input
                  id="brotherhood"
                  type="checkbox"
                  {...register('brotherhood')}
                  onChange={handleBrotherhoodChange}
                  className="w-5 h-5 rounded border-gray-300 text-scout-green focus:ring-scout-green"
                />
                <span className="text-sm font-bold text-gray-700">Brotherhood</span>
              </label>
              <label className={checkboxContainerClass}>
                <input type="checkbox" {...register('healthForm')} className="w-5 h-5 rounded border-gray-300 text-scout-green focus:ring-scout-green" />
                <span className="text-sm font-bold text-gray-700">Health Form</span>
              </label>
            </div>
          </section>

          {/* Payment Info */}
          <section>
            <div className={sectionLabelClass}>
              <CreditCard size={14} />
              <span>Payment Details</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Paid Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('paidAmount', { valueAsNumber: true })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="paymentMethod" className={labelClass}>Payment Method</label>
                <select id="paymentMethod" {...register('paymentMethod')} className={inputClass}>
                  <option value="">Select Method</option>
                  {PAYMENT_METHODS.map(m => (
                    <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Receipt Number</label>
                <input {...register('receiptNumber')} className={inputClass} />
              </div>
              <div className="flex items-end">
                <label className={cn(checkboxContainerClass, "w-full")}>
                  <input type="checkbox" {...register('paidInFull')} className="w-5 h-5 rounded border-gray-300 text-scout-green focus:ring-scout-green" />
                  <span className="text-sm font-bold text-gray-700">Paid In Full</span>
                </label>
              </div>
            </div>
          </section>

          {/* Dates & Times */}
          <section>
            <div className={sectionLabelClass}>
              <Clock size={14} />
              <span>Timestamps</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Check-in Time *</label>
                <input type="datetime-local" {...register('checkInDate')} className={cn(inputClass, errors.checkInDate && "border-red-500 bg-red-50")} />
                {errors.checkInDate && <p className="mt-1 text-[10px] font-bold text-red-600 ml-1 uppercase">{errors.checkInDate.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Check-out Time *</label>
                <input type="datetime-local" {...register('checkOutDate')} className={cn(inputClass, errors.checkOutDate && "border-red-500 bg-red-50")} />
                {errors.checkOutDate && <p className="mt-1 text-[10px] font-bold text-red-600 ml-1 uppercase">{errors.checkOutDate.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Date Registered</label>
                <input type="date" {...register('dateRegistered')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Date Paid</label>
                <input type="date" {...register('datePaid')} className={inputClass} />
              </div>
            </div>
          </section>

          {/* Notes */}
          <section>
            <label className={labelClass}>Event Notes</label>
            <textarea
              {...register('notes')}
              className={cn(inputClass, "h-24 resize-none")}
              placeholder="Additional comments..."
            />
          </section>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="isWalkIn" {...register('isWalkIn')} className="rounded text-scout-green" />
            <label htmlFor="isWalkIn" className="text-sm font-bold text-gray-700 uppercase tracking-widest">Mark as Walk-in</label>
          </div>
        </form>

        <div className="p-8 border-t border-gray-100 bg-khaki flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-4 text-gray-500 font-black uppercase tracking-widest text-sm hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="flex items-center gap-2 bg-scout-green hover:bg-scout-green-dark text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-scout-green/20 active:scale-95 transition-all"
          >
            <Save size={20} />
            Save Attendee
          </button>
        </div>
      </div>
    </div>
  );
}
