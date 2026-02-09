
'use server';

import { z } from 'zod';
import { appendToSheet } from '@/lib/sheets';

const visaEnquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  destination: z.string(),
  visaType: z.enum(['tourist', 'business', 'student', 'other']),
  travelDate: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function submitVisaEnquiry(values: z.infer<typeof visaEnquirySchema>) {
  if (values.honeypot) {
    return { success: true, message: 'Your visa enquiry has been sent successfully!' };
  }
  try {
    await appendToSheet({
        Purpose: `Visa Enquiry: ${values.destination}`,
        Name: values.name,
        Email: values.email,
        Phone: values.phone,
        Destination: values.destination,
        'Visa Type': values.visaType,
        'Travel Date (Visa)': values.travelDate,
        Message: values.message,
    });
    return { success: true, message: 'Your visa enquiry has been sent successfully!' };
  } catch (error) {
     console.error(error);
    if (error instanceof Error) {
        return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred.' };
  }
}
