
'use server';

import { z } from 'zod';
import { appendToSheet } from '@/lib/sheets';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  city: z.string().optional(),
  preferredCallDate: z.string().optional(),
  preferredCallTime: z.string().optional(),
  destination: z.string(),
  pax: z.string().optional(),
  travelDates: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  consent: z.boolean(),
});

export async function submitCustomItineraryRequest(values: z.infer<typeof formSchema>) {
  if (values.honeypot) {
    return { success: true, message: 'Request sent successfully!' };
  }
  try {
    await appendToSheet({
        Purpose: `Custom Itinerary: ${values.destination}`,
        Name: values.name,
        Email: values.email,
        Phone: values.phone,
        City: values.city,
        'Preferred Call Date': values.preferredCallDate,
        'Preferred Call Time': values.preferredCallTime,
        Destination: values.destination,
        'Pax (People)': values.pax,
        'Ideal Travel Dates': values.travelDates,
        Message: values.message,
        Consent: values.consent,
    });
    return { success: true, message: 'Request sent successfully!' };
  } catch (error) {
     console.error(error);
    if (error instanceof Error) {
        return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred.' };
  }
}
