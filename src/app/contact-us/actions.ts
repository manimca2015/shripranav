
'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  // Here you would typically send an email or save to a database.
  // For this example, we'll just log the values and simulate a success response.
  console.log('Form submitted:', values);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a potential error
  // if (values.name.toLowerCase() === 'error') {
  //   throw new Error('Failed to send message.');
  // }
  
  return { success: true, message: 'Message sent successfully!' };
}
