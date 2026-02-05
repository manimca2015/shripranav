'use server';

import { z } from 'zod';

export const airTicketFormSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('A valid email is required.'),
  phone: z.string().optional(),
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
});

export async function submitAirTicketRequest(values: z.infer<typeof airTicketFormSchema>) {
  console.log('Air ticket request received:', values);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Your request has been sent successfully!' };
}
