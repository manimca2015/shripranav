
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
import { useToast } from '@/hooks/use-toast';
import { submitEnquiry } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { countryCodes } from '@/lib/country-codes';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  countryName: z.string().min(1, { message: 'Required' }),
  phone: z.string().regex(/^\d+$/, { message: 'Digits only.' }).min(10, { message: 'At least 10 digits.' }),
  tourName: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function TourLeadForm({ tourName }: { tourName: string }) {
  const { toast } = useToast();
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      countryName: 'India',
      phone: '',
      tourName: tourName,
    },
  });

  async function onSubmit(values: FormValues) {
    const { countryName, phone, ...rest } = values;
    const countryObj = countryCodes.find(c => c.country === countryName);
    const code = countryObj?.code || '+91';
    const combinedPhone = `${code}${phone}`;

    // Pass required fields for submitEnquiry action
    const result = await submitEnquiry({ 
        ...rest, 
        phone: combinedPhone,
        consent: true,
        city: 'N/A (Inline Form)'
    });
    
    if (result.success) {
      toast({
        title: 'Form Submitted!',
        description: `We've received your request for ${tourName}.`,
      });
      router.push('/thank-you');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.message || 'Submission failed. Please try again.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs uppercase font-bold text-slate-400">Full Name*</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} className="rounded-xl bg-slate-50 border-slate-100 h-12" />
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
              <FormLabel className="text-xs uppercase font-bold text-slate-400">Email Address*</FormLabel>
              <FormControl>
                <Input placeholder="Your Email" {...field} className="rounded-xl bg-slate-50 border-slate-100 h-12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormLabel className="text-xs uppercase font-bold text-slate-400">Phone Number*</FormLabel>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="countryName"
              render={({ field }) => (
                <FormItem className="w-[85px] shrink-0">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full text-left font-medium rounded-xl bg-slate-50 border-slate-100 h-12">
                        <span>{countryCodes.find(c => c.country === field.value)?.code || '+91'}</span>
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
                    <Input placeholder="Phone No" {...field} className="rounded-xl bg-slate-50 border-slate-100 h-12" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {form.formState.errors.phone && (
            <p className="text-xs font-medium text-destructive">{form.formState.errors.phone.message}</p>
          )}
        </div>
        <Button 
          type="submit" 
          disabled={form.formState.isSubmitting}
          className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-bold hover:bg-primary hover:text-white transition-all shadow-lg"
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Enquire Now'}
        </Button>
        <p className="text-[10px] text-slate-400 text-center">
          By submitting, you agree to be contacted via Phone, Email or WhatsApp.
        </p>
      </form>
    </Form>
  );
}
