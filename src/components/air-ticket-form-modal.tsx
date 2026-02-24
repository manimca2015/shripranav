
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { submitAirTicketRequest } from '@/app/air-tickets/actions';


const airTicketFormSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('A valid email is required.'),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  city: z.string().optional(),
  preferredCallDay: z.string().optional(),
  preferredCallMonth: z.string().optional(),
  preferredCallYear: z.string().optional(),
  preferredCallTime: z.string().optional(),
  tripType: z.enum(['one-way', 'round-trip', 'multi-city']),
  from: z.string().min(3, 'Departure city/airport is required.'),
  to: z.string().min(3, 'Arrival city/airport is required.'),
  
  departureDay: z.string({ required_error: 'Day is required.' }),
  departureMonth: z.string({ required_error: 'Month is required.' }),
  departureYear: z.string({ required_error: 'Year is required.' }),

  returnDay: z.string().optional(),
  returnMonth: z.string().optional(),
  returnYear: z.string().optional(),

  adults: z.string().min(1, 'At least one adult is required.'),
  children: z.string().optional(),
  infants: z.string().optional(),
  travelClass: z.enum(['economy', 'premium-economy', 'business', 'first']),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted." }),
  }),
}).superRefine((data, ctx) => {
    // Check if departure date is valid
    const dDay = parseInt(data.departureDay, 10);
    const dMonth = parseInt(data.departureMonth, 10);
    const dYear = parseInt(data.departureYear, 10);
    const departureDate = new Date(dYear, dMonth - 1, dDay);
    if (departureDate.getFullYear() !== dYear || departureDate.getMonth() !== dMonth - 1 || departureDate.getDate() !== dDay) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid departure date.',
            path: ['departureDay'],
        });
    }

    if (data.tripType === 'round-trip') {
        if (!data.returnDay || !data.returnMonth || !data.returnYear) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Return date is required.',
                path: ['returnDay'],
            });
            return;
        }

        const rDay = parseInt(data.returnDay, 10);
        const rMonth = parseInt(data.returnMonth, 10);
        const rYear = parseInt(data.returnYear, 10);
        const returnDate = new Date(rYear, rMonth - 1, rDay);

        if (returnDate.getFullYear() !== rYear || returnDate.getMonth() !== rMonth - 1 || returnDate.getDate() !== rDay) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Invalid return date.',
                path: ['returnDay'],
            });
            return;
        }

        if (returnDate <= departureDate) {
             ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Return date must be after departure date.',
                path: ['returnDay'],
              });
        }
    }
    if (data.preferredCallDay && data.preferredCallMonth && data.preferredCallYear) {
        const pDay = parseInt(data.preferredCallDay, 10);
        const pMonth = parseInt(data.preferredCallMonth, 10);
        const pYear = parseInt(data.preferredCallYear, 10);
        const preferredDate = new Date(pYear, pMonth - 1, pDay);
        if (preferredDate.getFullYear() !== pYear || preferredDate.getMonth() !== pMonth - 1 || preferredDate.getDate() !== pDay) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid preferred call date.', path: ['preferredCallDay'] });
        } else {
            const dayOfWeek = preferredDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please select a weekday (Mon-Fri).', path: ['preferredCallDay'] });
            }
        }
    }
});


type AirTicketFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const years = Array.from({ length: 5 }, (_, i) => (2026 + i).toString());
const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: new Date(0, i).toLocaleString('default', { month: 'long' }) }));
const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM'
];


export function AirTicketFormModal({ isOpen, onClose }: AirTicketFormModalProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof airTicketFormSchema>>({
    resolver: zodResolver(airTicketFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      tripType: 'round-trip',
      from: '',
      to: '',
      departureYear: '2026',
      returnYear: '2026',
      preferredCallYear: '2026',
      adults: '1',
      children: '0',
      infants: '0',
      travelClass: 'economy',
      message: '',
      honeypot: '',
    },
  });

  const tripType = form.watch('tripType');

  async function onSubmit(values: z.infer<typeof airTicketFormSchema>) {
    const departureDate = `${values.departureDay.padStart(2, '0')}/${values.departureMonth.padStart(2, '0')}/${values.departureYear}`;
    
    let returnDate: string | undefined = undefined;
    if (values.tripType === 'round-trip' && values.returnDay && values.returnMonth && values.returnYear) {
        returnDate = `${values.returnDay.padStart(2, '0')}/${values.returnMonth.padStart(2, '0')}/${values.returnYear}`;
    }

    let preferredCallDate: string | undefined = undefined;
    if (values.preferredCallDay && values.preferredCallMonth && values.preferredCallYear) {
        preferredCallDate = `${values.preferredCallDay.padStart(2, '0')}/${values.preferredCallMonth.padStart(2, '0')}/${values.preferredCallYear}`;
    }

    const result = await submitAirTicketRequest({
        ...values,
        departureDate,
        returnDate,
        preferredCallDate,
    });
    
    if (result.success) {
      toast({
        title: 'Request Sent!',
        description: "We've received your flight request and will be in touch shortly with a quote.",
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

  const DateSelector = ({ type }: { type: 'departure' | 'return' | 'preferredCall' }) => {
    const fieldErrors = form.formState.errors;
    const dayError = fieldErrors[`${type}Day` as const];
    const monthError = fieldErrors[`${type}Month` as const];
    const yearError = fieldErrors[`${type}Year` as const];
    
    const labelMap = {
        departure: 'Departure Date*',
        return: 'Return Date*',
        preferredCall: 'Preferred Call Date'
    }

    const errorMessage = dayError?.message || monthError?.message || yearError?.message;

    return (
        <div className="space-y-2">
        <FormLabel>{labelMap[type]}</FormLabel>
        <div className="grid grid-cols-3 gap-2">
            <FormField
            control={form.control}
            name={`${type}Day` as const}
            render={({ field }) => (
                <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger><SelectValue placeholder="Day" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {days.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                    </SelectContent>
                </Select>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name={`${type}Month` as const}
            render={({ field }) => (
                <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {months.map(month => <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>)}
                    </SelectContent>
                </Select>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name={`${type}Year` as const}
            render={({ field }) => (
                <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {years.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                    </SelectContent>
                </Select>
                </FormItem>
            )}
            />
        </div>
         {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
        </div>
    );
};


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request an Air Ticket Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and our travel experts will find the best flight options for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name*</FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                        <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone Number*</FormLabel>
                    <FormControl>
                        <Input placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="tripType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trip Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                              field.onChange(value);
                              if (value === 'one-way') {
                                  form.setValue('returnDay', undefined);
                                  form.setValue('returnMonth', undefined);
                                  form.setValue('returnYear', '2026');
                              }
                          }}
                          defaultValue={field.value}
                          className="flex space-x-4 pt-2"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="round-trip" />
                            </FormControl>
                            <FormLabel className="font-normal">Round-trip</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="one-way" />
                            </FormControl>
                            <FormLabel className="font-normal">One-way</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="multi-city" />
                            </FormControl>
                            <FormLabel className="font-normal">Multi-city</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
            {tripType !== 'multi-city' ? (
                <>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>From*</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. New York (JFK)" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>To*</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. London (LHR)" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <DateSelector type="departure" />
                    {tripType === 'round-trip' && (
                       <DateSelector type="return" />
                    )}
                 </div>
                </>
            ) : (
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Itinerary Details*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your multi-city travel plans. For example:&#10;1. New York (JFK) to London (LHR) on 10/12/2026&#10;2. London (LHR) to Paris (CDG) on 17/12/2026&#10;3. Paris (CDG) to New York (JFK) on 24/12/2026"
                        className="min-h-[60px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>For multi-city trips, please detail your required flights in the message box.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Adults*</FormLabel>
                    <FormControl>
                        <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Children</FormLabel>
                    <FormControl>
                        <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="infants"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Infants</FormLabel>
                    <FormControl>
                        <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                  control={form.control}
                  name="travelClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="premium-economy">Premium</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="first">First</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

            {tripType !== 'multi-city' && (
                 <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="Any special requests or preferences?"
                            className="min-h-[60px]"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            )}

            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                        <Input placeholder="Your City" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid md:grid-cols-2 gap-6">
                <DateSelector type="preferredCall" />
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

            {/* Honeypot field */}
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
                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Request'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
