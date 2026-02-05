'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Plane,
  Tag,
  Users,
  GraduationCap,
  Briefcase,
  UserCheck,
  Headset,
  CalendarCheck,
  GitMerge,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AirTicketFormModal } from '@/components/air-ticket-form-modal';

const services = [
  {
    icon: Plane,
    title: 'Domestic & International Tickets',
    description: 'Seamless booking for flights anywhere in the world, whether for a quick domestic trip or a long-haul international journey.',
  },
  {
    icon: Tag,
    title: 'Best Price Guarantee',
    description: 'We work tirelessly to find you the most competitive fares, ensuring you get the best value for your money.',
  },
  {
    icon: Users,
    title: 'Group Bookings',
    description: 'Specialized arrangements and discounted fares for groups of 10 or more, perfect for family, friends, or corporate outings.',
  },
  {
    icon: GraduationCap,
    title: 'Student Fares',
    description: 'Exclusive discounts and flexible booking options for students traveling for education or leisure.',
  },
  {
    icon: Briefcase,
    title: 'Corporate Bookings',
    description: 'Efficient and reliable travel management for businesses, with customized reporting and dedicated support.',
  },
];

const whyBookWithUs = [
  {
    icon: UserCheck,
    title: 'Expert Assistance',
    description: 'Our experienced travel consultants are here to help you find the best flights and navigate complex itineraries.',
  },
  {
    icon: Headset,
    title: '24/7 Customer Support',
    description: 'We provide round-the-clock support for any queries, changes, or emergencies during your travel.',
  },
  {
    icon: CalendarCheck,
    title: 'Flexible Options',
    description: 'We offer a variety of booking options, including flexible dates and refundable tickets, to suit your needs.',
  },
  {
    icon: GitMerge,
    title: 'Multi-Airline Bookings',
    description: 'We can combine flights from different airlines to create the most convenient and cost-effective travel plan.',
  },
];


export default function AirTicketsPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const heroImage = PlaceHolderImages.find(p => p.id === 'air-tickets-hero');

  return (
    <>
      <div className="bg-background">
        <Header />
        <main>
          <section className="relative h-[400px] flex items-center justify-center text-white">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-primary/50" />
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-12">
              <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 block">Effortless Travel</span>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold leading-tight">Air Tickets</h1>
              <p className="mt-4 text-lg md:text-xl text-white/90">
                Your one-stop solution for booking flights worldwide with competitive pricing and expert support.
              </p>
            </div>
          </section>

          <section className="py-20 section-bg-subtle">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-headline font-bold text-primary mb-2">Our Air Ticketing Services</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">We offer a comprehensive range of services to meet all your air travel needs.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className={cn(
                      'md:col-span-2 lg:col-span-2',
                      services.length % 3 === 2 && index === 3 && 'lg:col-start-2',
                      services.length % 2 === 1 &&
                        index === services.length - 1 &&
                        'md:col-start-2'
                    )}
                  >
                    <Card className="text-center hover:shadow-xl transition-shadow duration-300 h-full">
                      <CardHeader>
                        <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                          <service.icon className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="text-2xl font-headline font-bold text-primary">{service.title}</h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{service.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-headline font-bold text-primary mb-2">Why Book With Us?</h2>
                 <p className="text-muted-foreground max-w-2xl mx-auto">Enjoy a seamless and stress-free booking experience.</p>
              </div>
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                {whyBookWithUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <item.icon className="w-12 h-12 text-accent mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-primary text-lg">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          <section className="py-24 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
              <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
                   <h2 className="text-4xl font-headline font-bold mb-6 text-white">Ready to Fly?</h2>
                   <p className="text-lg text-slate-300 mb-8">Contact our travel experts today to get the best deals on your next flight. Your journey starts here.</p>
                   <Button 
                      size="lg" 
                      className="bg-accent text-accent-foreground font-bold text-lg px-10 py-4 h-auto rounded-full hover:bg-accent/90"
                      onClick={() => setModalOpen(true)}
                    >
                      Contact Us for a Quote
                   </Button>
              </div>
          </section>

        </main>
        <Footer />
      </div>
      <AirTicketFormModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
