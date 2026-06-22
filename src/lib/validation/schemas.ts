import { z } from 'zod';

export const EventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  date: z.string().min(1, 'Event date is required'),
  chapter: z.string().optional().or(z.literal('')),
});

export const AttendeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  memberId: z.string().optional().or(z.literal('')),
  status: z.enum(['present', 'partial', 'absent']),
  notes: z.string().optional().or(z.literal('')),
  isWalkIn: z.boolean(),
  isImported: z.boolean(),
  eventId: z.number(),

  // New Fields
  role: z.string().optional().or(z.literal('')),
  checkInDate: z.string().optional().or(z.literal('')),
  checkOutDate: z.string().optional().or(z.literal('')),
  service: z.string().optional().or(z.literal('')),
  ordeal: z.boolean().default(false),
  brotherhood: z.boolean().default(false),
  paidAmount: z.coerce.number().default(0),
  receiptNumber: z.string().optional().or(z.literal('')),
  paymentMethod: z.string().optional().or(z.literal('')),
  paidInFull: z.boolean().default(false),
  dateRegistered: z.string().optional().or(z.literal('')),
  datePaid: z.string().optional().or(z.literal('')),
  healthForm: z.boolean().default(false),
});

export type EventFormValues = z.infer<typeof EventSchema>;
export type AttendeeFormValues = z.infer<typeof AttendeeSchema>;
