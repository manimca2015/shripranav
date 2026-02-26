'use server';

import { z } from 'zod';
import { appendToSheet } from '@/lib/sheets';

const enquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  city: z.string().optional(),
  preferredCallDate: z.string().optional().refine(date => {
    if (!date) return true; // Optional field is valid if empty
    const day = new Date(date + 'T00:00:00').getDay();
    return day !== 0 && day !== 6;
  }, { message: "Please select a weekday (Monday to Friday only)." }),
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
        const preferredDateTime = (values.preferredCallDate && values.preferredCallTime) 
            ? `${values.preferredCallDate} at ${values.preferredCallTime}` 
            : values.preferredCallDate || values.preferredCallTime || '';

        await appendToSheet({
            Purpose: `Enquiry: ${values.tourName}`,
            'Tour Name': values.tourName,
            Name: values.name,
            Email: values.email,
            Phone: values.phone,
            City: values.city,
            'Preferred Date and Time': preferredDateTime,
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

const brochureEnquirySchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^\d+$/, { message: 'Phone number must contain only digits.' }).min(10, { message: 'Phone number must be at least 10 digits.' }),
  tourName: z.string(),
});

export async function submitBrochureEnquiry(values: z.infer<typeof brochureEnquirySchema>) {
    try {
        await appendToSheet({
            Purpose: 'Brochure Download Request',
            Name: values.name,
            Email: values.email,
            Phone: values.phone,
            Subject: `Downloaded Brochure: ${values.tourName}`,
            'Tour Name': values.tourName,
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
