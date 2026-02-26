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
} from "@/components/ui/select"

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+1', country: 'Canada' },
  { code: '+44', country: 'UK' },
  { code: '+971', country: 'UAE' },
  { code: '+65', country: 'Singapore' },
  { code: '+60', country: 'Malaysia' },
  { code: '+66', country: 'Thailand' },
  { code: '+61', country: 'Australia' },
  { code: '+64', country: 'New Zealand' },
  { code: '+974', country: 'Qatar' },
  { code: '+968', country: 'Oman' },
  { code: '+965', country: 'Kuwait' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+973', country: 'Bahrain' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
  { code: '+41', country: 'Switzerland' },
  { code: '+31', country: 'Netherlands' },
  { code: '+353', country: 'Ireland' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+45', country: 'Denmark' },
  { code: '+358', country: 'Finland' },
  { code: '+48', country: 'Poland' },
  { code: '+90', country: 'Turkey' },
  { code: '+972', country: 'Israel' },
  { code: '+81', country: 'Japan' },
  { code: '+82', country: 'South Korea' },
  { code: '+86', country: 'China' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+84', country: 'Vietnam' },
  { code: '+62', country: 'Indonesia' },
  { code: '+63', country: 'Philippines' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+977', country: 'Nepal' },
  { code: '+960', country: 'Maldives' },
  { code: '+27', country: 'South Africa' },
  { code: '+254', country: 'Kenya' },
  { code: '+234', country: 'Nigeria' },
  { code: '+20', country: 'Egypt' },
  { code: '+55', country: 'Brazil' },
  { code: '+52', country: 'Mexico' },
  { code: '+54', country: 'Argentina' },
  { code: '+7', country: 'Russia' },
  { code: '+351', country: 'Portugal' },
  { code: '+30', country: 'Greece' },
  { code: '+43', country: 'Austria' },
  { code: '+32', country: 'Belgium' },
  { code: '+420', country: 'Czech Republic' },
  { code: '+36', country: 'Hungary' },
  { code: '+40', country: 'Romania' },
  { code: '+380', country: 'Ukraine' },
  { code: '+92', country: 'Pakistan' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+212', country: 'Morocco' },
];

const brochureEnquirySchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  countryName: z.string().min(1, { message: 'Required' }),
  phone: z.string().regex(/^\d+$/, { message: 'Phone number must contain only digits.' }).min(10, { message: 'Phone number must be at least 10 digits.' }),
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
        // Trigger download
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
                                            {/* We find the code based on the selected country name */}
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
            <DialogFooter>
              <Button type="submit" className="w-full bg-primary text-white font-bold h-12 rounded-xl" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Download PDF'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}