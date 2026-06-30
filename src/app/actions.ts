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

const quoteSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  company: z.string().optional(),
  phone: z.string().min(10, { message: 'Valid phone is required' }),
  product: z.string().min(2, { message: 'Please specify a product' }),
  message: z.string().min(10, { message: 'Please provide more details' }),
});

export async function submitContact(values: z.infer<typeof contactSchema>) {
  console.log('Contact form submission:', values);
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An unknown error occurred.' };
  }
}

export async function submitQuoteRequest(values: z.infer<typeof quoteSchema>) {
  console.log('Quote request submission:', values);
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to submit request.' };
  }
}
