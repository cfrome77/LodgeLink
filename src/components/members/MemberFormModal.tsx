'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MemberSchema, MemberFormValues } from '@/lib/validation/schemas';
import { X, Save, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PREDEFINED_ROLES } from '@/lib/constants';

interface MemberFormModalProps {
  onClose: () => void;
  onSubmit: (data: MemberFormValues) => void;
  initialData?: Partial<MemberFormValues>;
  title: string;
}

export default function MemberFormModal({ onClose, onSubmit, initialData, title }: MemberFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      middleName: initialData?.middleName || '',
      memberId: initialData?.memberId || '',
      role: initialData?.role || '',
      isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    },
  });

  const inputClass = "w-full px-4 py-3 border-2 border-border rounded-xl outline-none focus:ring-4 focus:ring-scout-green/10 focus:border-scout-green transition-all text-sm font-bold bg-background text-foreground";
  const labelClass = "block text-xs font-bold text-muted mb-1 ml-1 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border-2 border-border">
        <div className="flex justify-between items-center px-8 py-6 border-b border-border bg-khaki/30 text-foreground">
          <h2 className="text-2xl font-black tracking-tight uppercase">{title}</h2>
          <button onClick={onClose} className="p-2 text-muted hover:text-foreground transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 text-xs font-black text-muted uppercase tracking-widest mb-4">
                <User size={14} />
                <span>Personal Information</span>
              </div>
            </div>

            <div>
              <label htmlFor="firstName" className={labelClass}>First Name *</label>
              <input id="firstName" {...register('firstName')} className={cn(inputClass, errors.firstName && "border-oa-red bg-oa-red/5")} />
              {errors.firstName && <p className="mt-1 text-[10px] font-bold text-oa-red ml-1 uppercase">{errors.firstName.message}</p>}
            </div>

            <div>
              <label htmlFor="middleName" className={labelClass}>Middle Name</label>
              <input id="middleName" {...register('middleName')} className={inputClass} />
            </div>

            <div>
              <label htmlFor="lastName" className={labelClass}>Last Name *</label>
              <input id="lastName" {...register('lastName')} className={cn(inputClass, errors.lastName && "border-oa-red bg-oa-red/5")} />
              {errors.lastName && <p className="mt-1 text-[10px] font-bold text-oa-red ml-1 uppercase">{errors.lastName.message}</p>}
            </div>

            <div>
              <label htmlFor="memberId" className={labelClass}>Member ID *</label>
              <input id="memberId" {...register('memberId')} className={cn(inputClass, errors.memberId && "border-oa-red bg-oa-red/5")} />
              {errors.memberId && <p className="mt-1 text-[10px] font-bold text-oa-red ml-1 uppercase">{errors.memberId.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="role" className={labelClass}>Default Role</label>
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

          <div className="flex items-center gap-3 p-4 bg-surface-muted rounded-xl border-2 border-border/50">
            <input
              type="checkbox"
              id="isActive"
              {...register('isActive')}
              className="w-5 h-5 rounded border-border text-scout-green focus:ring-scout-green"
            />
            <label htmlFor="isActive" className="text-sm font-bold text-foreground uppercase tracking-widest cursor-pointer">
              Active Member
            </label>
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-muted font-black uppercase tracking-widest text-xs hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-scout-green hover:bg-scout-green-hover text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-scout-green/20 active:scale-95 transition-all"
            >
              <Save size={18} />
              Save Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
