'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitQuoteRequest } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const quoteSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  company: z.string().optional(),
  phone: z.string().min(10, { message: 'Valid phone is required' }),
  product: z.string().min(2, { message: 'Please specify a product' }),
  message: z.string().min(10, { message: 'Please provide more details' }),
});

export function RequestQuote() {
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
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <section className="py-24 relative bg-slate-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-5xl mx-auto overflow-hidden rounded-[40px] border-none shadow-2xl bg-white">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-16 bg-primary text-white flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Let's Create Something Exceptional</h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Get customized textile solutions tailored to your business needs. Partner with us for global quality and ethical manufacturing.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">✓</div>
                  <span className="font-medium text-white/90">Custom Product Development</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">✓</div>
                  <span className="font-medium text-white/90">Bulk Order Capability</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">✓</div>
                  <span className="font-medium text-white/90">Ethical Sourcing Verified</span>
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-16">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary font-bold">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Full Name" className="rounded-xl border-slate-200 h-12" {...field} />
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
                            <Input placeholder="Your Business Name" className="rounded-xl border-slate-200 h-12" {...field} />
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
                          <FormLabel className="text-primary font-bold">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@company.com" className="rounded-xl border-slate-200 h-12" {...field} />
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
                          <FormLabel className="text-primary font-bold">Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 00000 00000" className="rounded-xl border-slate-200 h-12" {...field} />
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
                        <FormLabel className="text-primary font-bold">Product Requirement</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5000 Bed Linen Sets" className="rounded-xl border-slate-200 h-12" {...field} />
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
                        <FormLabel className="text-primary font-bold">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help you today?" className="rounded-xl border-slate-200 min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-secondary hover:bg-primary text-white h-14 rounded-xl font-bold text-lg transition-all">
                    {form.formState.isSubmitting ? "Sending..." : "Request a Custom Quote"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
