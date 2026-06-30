'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { submitQuoteRequest } from '@/app/actions';
import { Send } from 'lucide-react';

const quoteSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  company: z.string().optional(),
  phone: z.string().min(10, { message: 'Valid phone is required' }),
  product: z.string().min(2, { message: 'Please specify a product' }),
  message: z.string().min(10, { message: 'Please provide more details' }),
});

type QuoteRequestModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QuoteRequestModal({ isOpen, onOpenChange }: QuoteRequestModalProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      product: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof quoteSchema>) {
    const result = await submitQuoteRequest(values);
    if (result.success) {
      toast({
        title: "Request Sent!",
        description: "We'll get back to you with a custom quote shortly.",
      });
      form.reset();
      onOpenChange(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-[32px] overflow-hidden p-0 border-none">
        <div className="bg-primary p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black mb-2">Request a Quote</DialogTitle>
            <DialogDescription className="text-white/70">
              Provide your details and requirements for a tailored textile solution.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="p-8 bg-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company" className="rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">Email*</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@company.com" className="rounded-xl" {...field} />
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
                      <FormLabel className="text-primary font-bold">Phone*</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" className="rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-bold">Product Requirement*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5000 Cotton Tote Bags" className="rounded-xl" {...field} />
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
                    <FormLabel className="text-primary font-bold">Message/Specifications*</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us more about your needs..." className="rounded-xl min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-secondary hover:bg-primary text-white h-12 rounded-xl font-bold transition-all group">
                {form.formState.isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Submit Request <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
