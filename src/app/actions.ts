'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  company: z.string().optional(),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContact(values: z.infer<typeof contactSchema>) {
  // In a real app, you would send an email or save to a database here.
  // For this prototype, we'll simulate a successful submission.
  console.log('Contact form submission:', values);
  
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An unknown error occurred.' };
  }
}
