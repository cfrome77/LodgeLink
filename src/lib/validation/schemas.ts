import { z } from 'zod';

export const EventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  date: z.string().min(1, 'Event date is required'),
  chapter: z.string().optional().or(z.literal('')),
});

export const AttendeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional().or(z.literal('')),
  memberId: z.string().min(1, 'Member ID is required'),
  status: z.enum(['present', 'partial', 'absent'], {
    errorMap: () => ({ message: 'Attendance status is required' })
  }),
  notes: z.string().optional().or(z.literal('')),
  isWalkIn: z.boolean(),
  isImported: z.boolean(),
  eventId: z.number(),

  // New Fields
  role: z.string().optional().or(z.literal('')),
  checkInDate: z.string().min(1, 'Check-in time is required'),
  checkOutDate: z.string().min(1, 'Check-out time is required'),
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
export type AttendeeFormValues = z.infer<typeof AttendeeSchema>;
