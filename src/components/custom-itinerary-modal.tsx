
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
import { submitCustomItineraryRequest } from '@/app/holiday-packages/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  destination: z.string(),
  pax: z.string().optional(),
  travelDates: z.string().optional(),
  message: z.string().optional(),
});

type CustomItineraryFormValues = z.infer<typeof formSchema>;

type CustomItineraryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
};

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
      <DialogContent className="sm:max-w-lg">
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
            <div className="grid grid-cols-2 gap-4">
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
            </div>
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
             <div className="grid grid-cols-2 gap-4">
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
                  <FormLabel>Additional Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about your preferences, interests, or any special requirements." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
