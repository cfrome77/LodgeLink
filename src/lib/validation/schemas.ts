import { z } from 'zod';

export const EventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  chapter: z.string().optional().or(z.literal('')),
  isLocked: z.boolean().optional(),
});

export const MemberSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional().or(z.literal('')),
  memberId: z.string().min(1, 'Member ID is required'),
  role: z.string().optional().or(z.literal('')),
  isActive: z.boolean(),
});

export const AttendeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional().or(z.literal('')),
  memberId: z.string().min(1, 'Member ID is required'),
  status: z.enum(['present', 'partial', 'absent']),
  notes: z.string().optional().or(z.literal('')),
  isWalkIn: z.boolean(),
  isImported: z.boolean(),
  isActive: z.boolean().optional(),
  eventId: z.number(),

  // New Fields
  role: z.string().optional().or(z.literal('')),
  checkInDate: z.string().min(1, 'Check-in date is required'),
  checkOutDate: z.string().min(1, 'Check-out date is required'),
  service: z.number().optional(),
  ordeal: z.boolean(),
  brotherhood: z.boolean(),
  paidAmount: z.number(),
  receiptNumber: z.string().optional().or(z.literal('')),
  paymentMethod: z.string().optional().or(z.literal('')),
  paidInFull: z.boolean(),
  dateRegistered: z.string().optional().or(z.literal('')),
  datePaid: z.string().optional().or(z.literal('')),
  healthForm: z.boolean(),
});

export type EventFormValues = z.infer<typeof EventSchema>;
export type MemberFormValues = z.infer<typeof MemberSchema>;
export type AttendeeFormValues = z.infer<typeof AttendeeSchema>;
