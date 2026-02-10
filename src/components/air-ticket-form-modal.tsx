
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
  tripType: z.enum(['one-way', 'round-trip', 'multi-city']),
  from: z.string().min(3, 'Departure city/airport is required.'),
  to: z.string().min(3, 'Arrival city/airport is required.'),
  departureDate: z.string({ required_error: "Departure date is required."}),
  returnDate: z.string().optional(),
  adults: z.string().min(1, 'At least one adult is required.'),
  children: z.string().optional(),
  infants: z.string().optional(),
  travelClass: z.enum(['economy', 'premium-economy', 'business', 'first']),
  message: z.string().optional(),
  honeypot: z.string().optional(),
}).superRefine((data, ctx) => {
    const validateDate = (dateStr: string, path: ('departureDate' | 'returnDate')[]) => {
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Date must be in DD/MM/YYYY format.',
                path,
            });
            return null;
        }
        const [day, month, year] = dateStr.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid date.', path });
            return null;
        }
        if (year < 2026) {
             ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Year must be 2026 or later.', path });
             return null;
        }
        return date;
    }

    if (data.departureDate) {
        validateDate(data.departureDate, ['departureDate']);
    } else {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Departure date is required.',
            path: ['departureDate'],
        });
    }

    if (data.tripType === 'round-trip') {
        if (!data.returnDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Return date is required for a round-trip.',
                path: ['returnDate'],
            });
            return;
        }
        const departureDate = validateDate(data.departureDate, ['departureDate']);
        const returnDate = validateDate(data.returnDate, ['returnDate']);

        if (departureDate && returnDate && returnDate <= departureDate) {
             ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Return date must be after departure date.',
                path: ['returnDate'],
              });
        }
    }
});


type AirTicketFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

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
      departureDate: '',
      returnDate: '',
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
    const result = await submitAirTicketRequest(values);
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

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let formattedValue = rawValue;

    if (rawValue.length > 4) {
      formattedValue = `${rawValue.slice(0, 2)}/${rawValue.slice(2, 4)}/${rawValue.slice(4, 8)}`;
    } else if (rawValue.length > 2) {
      formattedValue = `${rawValue.slice(0, 2)}/${rawValue.slice(2)}`;
    }
    
    field.onChange(formattedValue);
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
                                  form.setValue('returnDate', '');
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
                            <FormLabel>From</FormLabel>
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
                            <FormLabel>To</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. London (LHR)" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="departureDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Departure Date</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="DD/MM/YYYY" 
                              {...field}
                              onChange={(e) => handleDateInputChange(e, field)}
                              maxLength={10}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {tripType === 'round-trip' && (
                        <FormField
                        control={form.control}
                        name="returnDate"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Return Date</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="DD/MM/YYYY"
                                  {...field}
                                  onChange={(e) => handleDateInputChange(e, field)}
                                  maxLength={10}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                        />
                    )}
                 </div>
                </>
            ) : (
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Itinerary Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your multi-city travel plans. For example:&#10;1. New York (JFK) to London (LHR) on 2024-12-10&#10;2. London (LHR) to Paris (CDG) on 2024-12-17&#10;3. Paris (CDG) to New York (JFK) on 2024-12-24"
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
                    <FormLabel>Adults</FormLabel>
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
