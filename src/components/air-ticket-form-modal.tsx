'use client';

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
import { countryCodes } from '@/lib/country-codes';


const airTicketFormSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('A valid email is required.'),
  countryName: z.string().min(1, { message: 'Required' }),
  phone: z.string().regex(/^\d+$/, { message: 'Phone number must contain only digits.' }).min(10, { message: 'Phone number must be at least 10 digits.' }),
  city: z.string().optional(),
  preferredCallDate: z.string({ required_error: 'Please select a preferred call date.' }).refine(date => {
    if (!date) return true;
    const day = new Date(date + 'T00:00:00').getDay();
    return day !== 0 && day !== 6;
  }, { message: "Please select a weekday (Monday to Friday only)." }),
  preferredCallTime: z.string({ required_error: 'Please select a preferred call time.' }),
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
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted." }),
  }),
}).superRefine((data, ctx) => {
    if (data.tripType === 'round-trip') {
        if (!data.returnDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Return date is required.',
                path: ['returnDate'],
            });
        } else if (data.departureDate && new Date(data.returnDate) <= new Date(data.departureDate)) {
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
      countryName: 'India',
      phone: '',
      city: '',
      preferredCallDate: '',
      preferredCallTime: '',
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
      consent: false,
    },
  });

  const tripType = form.watch('tripType');
  const departureDate = form.watch('departureDate');

  async function onSubmit(values: z.infer<typeof airTicketFormSchema>) {
    const { countryName, phone, ...rest } = values;
    const countryObj = countryCodes.find(c => c.country === countryName);
    const code = countryObj?.code || '+91';
    const combinedPhone = `${code}${phone}`;

    const result = await submitAirTicketRequest({ ...rest, phone: combinedPhone });
    
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-4xl max-h-[90vh] overflow-y-auto"
      >
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
                        <Input placeholder="John Doe" {...field} value={field.value || ''} />
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
                        <Input placeholder="you@example.com" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <FormLabel>Phone Number*</FormLabel>
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="countryName"
                            render={({ field }) => (
                                <FormItem className="w-[85px] shrink-0">
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
                  name="tripType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trip Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
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
                                <Input placeholder="e.g. New York (JFK)" {...field} value={field.value || ''} />
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
                                <Input placeholder="e.g. London (LHR)" {...field} value={field.value || ''} />
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
                          <FormLabel>Departure Date*</FormLabel>
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
                    {tripType === 'round-trip' && (
                       <FormField
                        control={form.control}
                        name="returnDate"
                        render={({ field }) => (
                           <FormItem>
                            <FormLabel>Return Date*</FormLabel>
                              <FormControl>
                                <Input 
                                  type="date"
                                  {...field}
                                  value={field.value || ''}
                                  min={departureDate || new Date().toISOString().split("T")[0]}
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
                    <FormLabel>Itinerary Details*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your multi-city travel plans. For example:
1. New York (JFK) to London (LHR) on 10/12/2026
2. London (LHR) to Paris (CDG) on 17/12/2026
3. Paris (CDG) to New York (JFK) on 24/12/2026"
                        className="min-h-[60px]"
                        {...field}
                        value={field.value || ''}
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
                        <Input type="number" min="1" {...field} value={field.value || ''} />
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
                        <Input type="number" min="0" {...field} value={field.value || ''} />
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
                        <Input type="number" min="0" {...field} value={field.value || ''} />
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
                            value={field.value || ''}
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
                        <Input placeholder="Your City" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="preferredCallDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Call Date*</FormLabel>
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
                    <FormLabel>Preferred Call Time*</FormLabel>
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
