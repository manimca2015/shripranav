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

const brochureEnquirySchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
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
      phone: '',
      tourName: tourName,
    },
  });

  async function onSubmit(values: FormValues) {
    const result = await submitBrochureEnquiry(values);
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
