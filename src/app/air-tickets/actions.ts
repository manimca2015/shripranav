'use server';

import { z } from 'zod';
import { appendToSheet } from '@/lib/sheets';

const airTicketFormSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('A valid email is required.'),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  city: z.string().optional(),
  preferredCallDate: z.string({ required_error: 'Please select a preferred call date.' }).refine(date => {
    if (!date) return true;
    const day = new Date(date + 'T00:00:00').getDay();
    return day !== 0 && day !== 6;
  }, { message: "Please select a weekday (Monday to Friday only)." }),
  preferredCallTime: z.string({ required_error: 'Please select a preferred call time.' }),
  tripType: z.enum(['one-way', 'round-trip', 'multi-city']),
  from: z.string().min(3, 'Departure city/airport is required.'),
  to: z.string().min(3, 'Arrival city/airport is required.'),
  departureDate: z.string({ required_error: "Departure date is required."}),
  returnDate: z.string().optional(),
  adults: z.string().min(1, 'At least one adult is required.'),
  children: z.string().optional(),
  infants: z.string().optional(),
  travelClass: z.enum(['economy', 'premium-economy', 'business', 'first']),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  consent: z.boolean(),
});

export async function submitAirTicketRequest(values: z.infer<typeof airTicketFormSchema>) {
  if (values.honeypot) {
    return { success: true, message: 'Your request has been sent successfully!' };
  }
  try {
    const preferredDateTime = (values.preferredCallDate && values.preferredCallTime) 
        ? `${values.preferredCallDate} at ${values.preferredCallTime}` 
        : values.preferredCallDate || values.preferredCallTime || '';
    
    await appendToSheet({
        Purpose: 'Air Ticket Request',
        Subject: 'Air Ticket Quote Request',
        Name: values.name,
        Email: values.email,
        Phone: values.phone,
        City: values.city,
        'Preferred Date and Time': preferredDateTime,
        'Trip Type': values.tripType,
        'From (Flight)': values.from,
        'To (Flight)': values.to,
        'Departure Date': values.departureDate,
        'Return Date': values.returnDate,
        Adults: values.adults,
        Children: values.children,
        Infants: values.infants,
        'Travel Class': values.travelClass,
        Message: values.message,
        Consent: values.consent,
    });
    return { success: true, message: 'Your request has been sent successfully!' };
  } catch (error) {
     console.error(error);
    if (error instanceof Error) {
        return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred.' };
  }
}
