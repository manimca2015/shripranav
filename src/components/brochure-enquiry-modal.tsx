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
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { submitBrochureEnquiry } from '@/app/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryCodes } from '@/lib/country-codes';

const brochureEnquirySchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  countryName: z.string().min(1, { message: 'Required' }),
  phone: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit phone number' }),
  tourName: z.string(),
});

type FormValues = z.infer<typeof brochureEnquirySchema>;

type BrochureEnquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tourName: string;
  brochureUrl: string;
};

export function BrochureEnquiryModal({ isOpen, onClose, tourName, brochureUrl }: BrochureEnquiryModalProps) {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(brochureEnquirySchema),
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

    const result = await submitBrochureEnquiry({
        name: rest.name,
        email: rest.email,
        phone: combinedPhone,
        tourName: rest.tourName
    });
    
    if (result.success) {
        const link = document.createElement('a');
        link.href = brochureUrl;
        link.setAttribute('download', brochureUrl.split('/').pop() || 'itinerary.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        onClose();
        form.reset();
        toast({
            title: 'Request Successful!',
            description: "Your brochure download should start automatically.",
        });
    } else {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: result.message || 'There was a problem with your request.',
        });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Itinerary</DialogTitle>
          <DialogDescription>
            Provide your details to receive the full itinerary for <strong>{tourName}</strong>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
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
                    <Input placeholder="Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                                    <Input 
                                      placeholder="10 Digit Phone No" 
                                      {...field} 
                                      onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        field.onChange(val);
                                      }}
                                    />
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
            <DialogFooter>
              <Button type="submit" className="w-full bg-primary text-white font-bold h-12 rounded-xl hover:bg-accent transition-colors" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Download PDF'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
