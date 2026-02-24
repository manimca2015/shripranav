
'use server';

import { z } from 'zod';
import { appendToSheet } from '@/lib/sheets';

const enquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  city: z.string().optional(),
  preferredCallDate: z.string().optional(),
  preferredCallTime: z.string().optional(),
  message: z.string().optional(),
  tourName: z.string(),
  honeypot: z.string().optional(),
  consent: z.boolean(),
});

export async function submitEnquiry(values: z.infer<typeof enquirySchema>) {
    if (values.honeypot) {
        return { success: true };
    }
    try {
        await appendToSheet({
            Purpose: `Enquiry: ${values.tourName}`,
            'Tour Name': values.tourName,
            Name: values.name,
            Email: values.email,
            Phone: values.phone,
            City: values.city,
            'Preferred Call Date': values.preferredCallDate,
            'Preferred Call Time': values.preferredCallTime,
            Message: values.message,
            Consent: values.consent,
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: 'An unknown error occurred.' };
    }
}
