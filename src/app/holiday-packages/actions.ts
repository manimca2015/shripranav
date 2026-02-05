'use server';

import { z } from 'zod';

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
  // Here you would typically send an email or save to a database.
  // For this example, we'll just log the values and simulate a success response.
  console.log('Custom Itinerary Request submitted:', values);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, message: 'Request sent successfully!' };
}
