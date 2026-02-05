
'use server';

import { z } from 'zod';
import { appendToSheet } from '@/lib/sheets';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  destination: z.string(),
  pax: z.string().optional(),
  travelDates: z.string().optional(),
  message: z.string().optional(),
});

export async function submitCustomItineraryRequest(values: z.infer<typeof formSchema>) {
  try {
    await appendToSheet({
        Purpose: `Custom Itinerary: ${values.destination}`,
        Name: values.name,
        Email: values.email,
        Phone: values.phone,
        Destination: values.destination,
        'Pax (People)': values.pax,
        'Ideal Travel Dates': values.travelDates,
        Message: values.message,
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
