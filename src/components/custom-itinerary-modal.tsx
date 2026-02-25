
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  city: z.string().optional(),
  preferredCallDate: z.string().optional(),
  preferredCallTime: z.string().optional(),
  destination: z.string(),
  pax: z.string().optional(),
  travelDates: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted." }),
  }),
}).superRefine((data, ctx) => {
    if (data.preferredCallDate) {
        const dayOfWeek = new Date(data.preferredCallDate.replace(/-/g, '/')).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please select a weekday (Mon-Fri).', path: ['preferredCallDate'] });
        }
    }
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
      phone: '',
      destination: destination,
      pax: '',
      travelDates: '',
      message: '',
      honeypot: '',
    },
  });

  async function onSubmit(values: CustomItineraryFormValues) {
    const result = await submitCustomItineraryRequest(values);
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="pax"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>No. of People</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 2 Adults" {...field} />
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
                        <Input placeholder="e.g., December 2024" {...field} />
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
                    <Textarea placeholder="Tell us about your preferences, interests, or any special requirements." {...field} />
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
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Call Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value.replace(/-/g, '/')), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value.replace(/-/g, '/')) : undefined}
                            onSelect={(date) =>
                              field.onChange(date ? format(date, "yyyy-MM-dd") : undefined)
                            }
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                              date.getDay() === 0 ||
                              date.getDay() === 6
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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

    