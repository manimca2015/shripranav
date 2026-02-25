
'use server';

import { z } from 'zod';
import { appendToSheet } from '@/lib/sheets';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email(),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  city: z.string().optional(),
  preferredCallDate: z.string().optional().refine(date => {
    if (!date) return true; // Optional field is valid if empty
    const day = new Date(date + 'T00:00:00').getDay();
    return day !== 0 && day !== 6;
  }, { message: "Please select a weekday (Monday to Friday only)." }),
  preferredCallTime: z.string().optional(),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted." }),
  }),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  if (values.honeypot) {
    // This was likely a bot
    return { success: true, message: 'Message sent successfully!' };
  }
  try {
    const preferredDateTime = (values.preferredCallDate && values.preferredCallTime) 
        ? `${values.preferredCallDate} at ${values.preferredCallTime}` 
        : values.preferredCallDate || values.preferredCallTime || '';
    
    await appendToSheet({
        Purpose: 'Contact Form Submission',
        Name: values.name,
        Email: values.email,
        Phone: values.phone,
        City: values.city,
        'Preferred Date and Time': preferredDateTime,
        Subject: values.subject,
        Message: values.message,
        Consent: values.consent,
    });
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
        return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred.' };
  }
}
