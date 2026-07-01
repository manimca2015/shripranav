'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitContact } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message is too short'),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitContact(values);
    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "We've received your inquiry and will get back to you shortly.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Contact Hero */}
      <section className="relative pt-48 pb-24 bg-primary text-white overflow-hidden">
        <div className="textile-pattern absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Contact <span className="text-secondary">Shri Pranav</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Have questions about our products or manufacturing process? We're here to help you build your textile vision.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                <h3 className="text-2xl font-black text-primary mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-primary mb-1">Our Address</p>
                      <address className="text-slate-600 not-italic text-sm leading-relaxed">
                        44, Ramakrishnapuram East,<br />
                        Karur, India, 639 001.
                      </address>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-primary mb-1">Phone Number</p>
                      <a href="tel:+919994411009" className="text-slate-600 text-sm hover:text-secondary smooth-transition">
                        +91 99944-11009
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-primary mb-1">Email Addresses</p>
                      <div className="flex flex-col gap-1">
                        <a href="mailto:arjuna@shripranav.com" className="text-slate-600 text-sm hover:text-secondary smooth-transition">
                          arjuna@shripranav.com
                        </a>
                        <a href="mailto:info@shripranav.com" className="text-slate-600 text-sm hover:text-secondary smooth-transition">
                          info@shripranav.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-primary mb-1">Business Hours</p>
                      <p className="text-slate-600 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                      <p className="text-slate-600 text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-secondary text-white rounded-[32px] border-none overflow-hidden">
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold mb-4">Factory Visits</h4>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    Interested in seeing our manufacturing process? Contact us to schedule a guided tour of our state-of-the-art Karur facility.
                  </p>
                  <Button variant="outline" className="w-full rounded-full border-white text-white bg-transparent hover:bg-white hover:text-secondary transition-colors">
                    Learn About Factory
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-8 md:p-12 bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-50">
                <h3 className="text-3xl font-black text-primary mb-2">Send us a Message</h3>
                <p className="text-slate-500 mb-10">We'll get back to you within 24 business hours.</p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary font-bold">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="rounded-xl h-12" {...field} />
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
                            <FormLabel className="text-primary font-bold">Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" className="rounded-xl h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary font-bold">Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 00000 00000" className="rounded-xl h-12" {...field} />
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
                            <FormLabel className="text-primary font-bold">Company (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company Name" className="rounded-xl h-12" {...field} />
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
                          <FormLabel className="text-primary font-bold">Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help?" className="rounded-xl h-12" {...field} />
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
                            <Textarea 
                              placeholder="Describe your requirements in detail..." 
                              className="rounded-xl min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full rounded-xl bg-secondary hover:bg-primary text-white h-14 font-bold text-lg smooth-transition group">
                      {form.formState.isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 smooth-transition" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Location */}
      <section className="h-[450px] w-full relative grayscale hover:grayscale-0 smooth-transition">
        <iframe
          src="https://www.google.com/maps?q=Shri+Pranav+Textiles+Karur+44+Ramakrishnapuram+East&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Google Maps Location"
        ></iframe>
      </section>

      <Footer />
    </main>
  );
}
