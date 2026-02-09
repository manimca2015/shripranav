
'use server';

import { z } from 'zod';
import { appendToSheet } from '@/lib/sheets';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email(),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  if (values.honeypot) {
    // This was likely a bot
    return { success: true, message: 'Message sent successfully!' };
  }
  try {
    await appendToSheet({
        Purpose: 'Contact Form Submission',
        Name: values.name,
        Email: values.email,
        Phone: values.phone,
        Subject: values.subject,
        Message: values.message,
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
