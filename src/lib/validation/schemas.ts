import { z } from 'zod';

export const EventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  date: z.string().min(1, 'Event date is required'),
  chapter: z.string().optional(),
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
});

export type EventFormValues = z.infer<typeof EventSchema>;
export type AttendeeFormValues = z.infer<typeof AttendeeSchema>;
