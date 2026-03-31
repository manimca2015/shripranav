'use server';

import { z } from 'zod';
import { appendToSheet } from '@/lib/sheets';

const visaEnquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  city: z.string().optional(),
  preferredCallDate: z.string().optional().refine(date => {
    if (!date) return true;
    const day = new Date(date + 'T00:00:00').getDay();
    return day !== 0 && day !== 6;
  }, { message: "Please select a weekday (Monday to Friday only)." }),
  preferredCallTime: z.string().optional(),
  destination: z.string(),
  visaType: z.enum(['tourist', 'business', 'student', 'other']),
  travelDate: z.string().optional(),
  submissionLocation: z.string().optional(),
  itinerary: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  consent: z.boolean(),
});

export async function submitVisaEnquiry(values: z.infer<typeof visaEnquirySchema>) {
  if (values.honeypot) {
    return { success: true, message: 'Your visa enquiry has been sent successfully!' };
  }
  try {
    const preferredDateTime = (values.preferredCallDate && values.preferredCallTime) 
        ? `${values.preferredCallDate} at ${values.preferredCallTime}` 
        : values.preferredCallDate || values.preferredCallTime || '';
    
    // Format the subject line specifically for Column G (Subject)
    const subjectLine = values.itinerary 
      ? `Visa Enquiry: ${values.itinerary}` 
      : `Visa Enquiry: ${values.destination}`;

    await appendToSheet({
        Purpose: `Visa Enquiry: ${values.destination}`,
        Subject: subjectLine, // This maps to Column G
        Name: values.name,
        Email: values.email,
        Phone: values.phone,
        City: values.city,
        'Preferred Date and Time': preferredDateTime,
        Destination: values.destination,
        'Visa Type': values.visaType,
        'Travel Date (Visa)': values.travelDate,
        'Submission Location': values.submissionLocation,
        'Tour Name': values.itinerary,
        Message: values.message,
        Consent: values.consent,
    }, process.env.TAB_VISA || 'Visa Submissions');
    
    return { success: true, message: 'Your visa enquiry has been sent successfully!' };
  } catch (error) {
     console.error(error);
    if (error instanceof Error) {
        return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred.' };
  }
}
