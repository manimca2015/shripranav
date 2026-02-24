
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
import { submitContactForm } from '@/app/contact-us/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  city: z.string().optional(),
  preferredCallDay: z.string().optional(),
  preferredCallMonth: z.string().optional(),
  preferredCallYear: z.string().optional(),
  preferredCallTime: z.string().optional(),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted." }),
  }),
}).superRefine((data, ctx) => {
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


export function ContactForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      honeypot: '',
      preferredCallYear: '2026',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let preferredCallDate: string | undefined = undefined;
    if (values.preferredCallDay && values.preferredCallMonth && values.preferredCallYear) {
        preferredCallDate = `${values.preferredCallDay.padStart(2, '0')}/${values.preferredCallMonth.padStart(2, '0')}/${values.preferredCallYear}`;
    }

    const result = await submitContactForm({
        ...values,
        preferredCallDate,
    });
    if (result.success) {
      toast({
        title: 'Message Sent!',
        description: "Thanks for reaching out. We'll be in touch shortly.",
      });
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

  const DateSelector = ({ type }: { type: 'preferredCall' }) => {
    const fieldErrors = form.formState.errors;
    const dayError = fieldErrors[`${type}Day` as const];
    const monthError = fieldErrors[`${type}Month` as const];
    const yearError = fieldErrors[`${type}Year` as const];
    
    const labelMap = {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <div className="grid md:grid-cols-2 gap-6">
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
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject*</FormLabel>
              <FormControl>
                <Input placeholder="Inquiry about South Africa tour" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us how we can help you"
                  className="min-h-[120px]"
                  {...field}
                />
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
        <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
}
