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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
import { submitVisaEnquiry } from '@/app/visa-services/actions';
import { useRouter } from 'next/navigation';
import { countryCodes } from '@/lib/country-codes';

const visaEnquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  countryName: z.string().min(1, { message: 'Required' }),
  phone: z.string().regex(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits.' }),
  city: z.string().optional(),
  preferredCallDate: z.string().optional().refine(date => {
    if (!date) return true;
    const day = new Date(date + 'T00:00:00').getDay();
    return day !== 0 && day !== 6;
  }, { message: "Please select a weekday (Monday to Friday only)." }),
  preferredCallTime: z.string().optional(),
  destination: z.string().min(1, { message: 'Please select a destination.' }),
  visaType: z.enum(['tourist', 'business', 'student', 'other'], { required_error: 'Please select a visa type.' }),
  submissionLocation: z.string().min(1, { message: 'Please enter your location.' }),
  travelDate: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted." }),
  }),
});

type VisaEnquiryFormValues = z.infer<typeof visaEnquirySchema>;

type VisaEnquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  destination?: string;
};

const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM'
];

const destinations = [
    'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Oman', 'Bahrain', 'Kuwait', 'Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Indonesia', 'Schengen Area', 'United Kingdom', 'United States', 'Canada', 'Australia', 'New Zealand', 'Turkey', 'Egypt', 'Other'
];

export function VisaEnquiryModal({ isOpen, onClose, destination }: VisaEnquiryModalProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<VisaEnquiryFormValues>({
    resolver: zodResolver(visaEnquirySchema),
    defaultValues: {
      name: '',
      email: '',
      countryName: 'India',
      phone: '',
      city: '',
      preferredCallDate: '',
      preferredCallTime: '',
      destination: destination || '',
      visaType: 'tourist',
      submissionLocation: '',
      travelDate: '',
      message: '',
      honeypot: '',
      consent: false,
    },
  });

  async function onSubmit(values: VisaEnquiryFormValues) {
    const { countryName, phone, ...rest } = values;
    const countryObj = countryCodes.find(c => c.country === countryName);
    const code = countryObj?.code || '+91';
    const combinedPhone = `${code}${phone}`;

    const result = await submitVisaEnquiry({ 
        ...rest, 
        phone: combinedPhone,
    });
    
    if (result.success) {
        toast({
            title: 'Enquiry Sent!',
            description: `Thanks for your interest in a visa for ${values.destination}. We'll be in touch shortly!`,
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
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Visa Enquiry</DialogTitle>
          <DialogDescription>
            Fill out your details below and our visa experts will assist you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Country*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {destinations.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="submissionLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Location*</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
             <div className="grid grid-cols-2 gap-4">
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
                                      <Input placeholder="10 Digit Phone No" {...field} />
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
            <div className="grid grid-cols-2 gap-4">
               <FormField
                  control={form.control}
                  name="visaType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visa Type*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tourist">Tourist</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Travel Date</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., December 2024" {...field} value={field.value || ''} />
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
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any other details we should know?" {...field} value={field.value || ''} />
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
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
                  {form.formState.isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
