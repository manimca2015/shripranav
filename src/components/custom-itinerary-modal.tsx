'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { submitCustomItineraryRequest } from '@/app/holiday-packages/actions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { countryCodes } from '@/lib/country-codes';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  countryName: z.string().min(1, { message: 'Required' }),
  phone: z.string().regex(/^\d+$/, { message: 'Phone number must contain only digits.' }).min(10, { message: 'Phone number must be at least 10 digits.' }),
  city: z.string().optional(),
  preferredCallDate: z.string().optional().refine(date => {
    if (!date) return true;
    const day = new Date(date + 'T00:00:00').getDay();
    return day !== 0 && day !== 6;
  }, { message: "Please select a weekday (Monday to Friday only)." }),
  preferredCallTime: z.string().optional(),
  destination: z.string(),
  pax: z.string().optional(),
  travelDates: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted." }),
  }),
});

type CustomItineraryFormValues = z.infer<typeof formSchema>;

type CustomItineraryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
};

const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM'
];

export function CustomItineraryModal({ isOpen, onClose, destination }: CustomItineraryModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  
  const form = useForm<CustomItineraryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      countryName: 'India',
      phone: '',
      city: '',
      preferredCallDate: '',
      preferredCallTime: '',
      destination: destination,
      pax: '',
      travelDates: '',
      message: '',
      honeypot: '',
      consent: false,
    },
  });

  // Reset form when destination changes
  useEffect(() => {
    form.reset({
      name: '',
      email: '',
      countryName: 'India',
      phone: '',
      city: '',
      preferredCallDate: '',
      preferredCallTime: '',
      destination: destination,
      pax: '',
      travelDates: '',
      message: '',
      honeypot: '',
      consent: false,
    });
  }, [destination, form]);

  async function onSubmit(values: CustomItineraryFormValues) {
    const { countryName, phone, ...rest } = values;
    const countryObj = countryCodes.find(c => c.country === countryName);
    const code = countryObj?.code || '+91';
    const combinedPhone = `${code}${phone}`;

    const result = await submitCustomItineraryRequest({ ...rest, phone: combinedPhone });
    if (result.success) {
        toast({
            title: 'Request Sent!',
            description: `Thanks for your interest in a custom trip to ${destination}. We'll be in touch shortly!`,
        });
        onClose();
        form.reset();
        router.push('/thank-you');
    } else {
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: result.message || 'There was a problem with your request. Please try again.',
        });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-2xl max-h-[90vh] sm:max-h-none sm:overflow-y-auto overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Request a Custom Itinerary for {destination}</DialogTitle>
          <DialogDescription>
            Fill out your details and our experts will craft a personalized travel plan for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => <Input type="hidden" {...field} />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name*</FormLabel>
                    <FormControl>
                        <Input placeholder="Your Name" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address*</FormLabel>
                    <FormControl>
                        <Input placeholder="Your Email" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                  <FormLabel>Phone Number*</FormLabel>
                  <div className="flex gap-2">
                      <FormField
                          control={form.control}
                          name="countryName"
                          render={({ field }) => (
                              <FormItem className="w-[80px] shrink-0">
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                          <SelectTrigger className="w-full text-left font-medium">
                                              <span>
                                                  {countryCodes.find(c => c.country === field.value)?.code || '+91'}
                                              </span>
                                          </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="max-h-[300px]">
                                          {countryCodes.map((c) => (
                                              <SelectItem key={c.country} value={c.country}>
                                                  <span className="font-bold">{c.code}</span>
                                                  <span className="ml-2 text-muted-foreground text-xs">({c.country})</span>
                                              </SelectItem>
                                          ))}
                                      </SelectContent>
                                  </Select>
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                              <FormItem className="flex-1">
                                  <FormControl>
                                      <Input placeholder="Phone No" {...field} />
                                  </FormControl>
                              </FormItem>
                          )}
                      />
                  </div>
                  {form.formState.errors.phone && (
                      <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.phone.message}
                      </p>
                  )}
              </div>
              <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                          <Input placeholder="Your City" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="pax"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>No. of People</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 2 Adults" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="travelDates"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Ideal Travel Dates</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., December 2026" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Requests</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about your preferences, interests, or any special requirements." {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preferredCallDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Call Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value || ''}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="preferredCallTime"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Preferred Call Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {timeSlots.map(slot => <SelectItem key={slot} value={slot}>{slot}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                    <FormLabel>
                        I consent to be contacted via Phone, Email, and WhatsApp.
                    </FormLabel>
                    <FormMessage />
                    </div>
                </FormItem>
                )}
            />
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                <FormField
                    control={form.control}
                    name="honeypot"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Do not fill this out</FormLabel>
                        <FormControl>
                            <Input tabIndex={-1} autoComplete="off" {...field} />
                        </FormControl>
                        </FormItem>
                    )}
                />
            </div>
             <DialogFooter>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
