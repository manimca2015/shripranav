
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
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { submitEnquiry } from '@/app/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  message: z.string().optional(),
  tourName: z.string(),
});

type EnquiryFormValues = z.infer<typeof formSchema>;

type EnquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tourName: string;
};

export function EnquiryModal({ isOpen, onClose, tourName }: EnquiryModalProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      tourName: tourName,
    },
  });

  async function onSubmit(values: EnquiryFormValues) {
    const result = await submitEnquiry(values);
    
    if (result.success) {
      const isGeneralEnquiry = tourName === 'General Enquiry';
      toast({
        title: 'Enquiry Sent!',
        description: isGeneralEnquiry 
          ? "We've received your message and will be in touch shortly."
          : `Thanks for your interest in ${tourName}. We'll be in touch shortly.`,
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

  const isGeneralEnquiry = tourName === 'General Enquiry';
  const dialogTitle = isGeneralEnquiry ? 'Reach us out' : `Enquire About: ${tourName}`;
  const dialogDescription = isGeneralEnquiry
    ? 'Have a question? Fill out the form below and we will get back to you.'
    : 'Fill out the form below and our team will get back to you with more details.';


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="tourName"
              render={({ field }) => <Input type="hidden" {...field} />}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
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
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 234 567 890" {...field} />
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
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any specific questions?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
