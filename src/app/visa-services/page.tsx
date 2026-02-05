
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Check, FileText, Globe, Plane, Briefcase, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const countryVisaPages = [
  { name: 'UAE', imageId: 'holiday-dubai' },
  { name: 'Schengen', imageId: 'holiday-europe' },
  { name: 'UK', imageId: 'flag-uk' },
  { name: 'USA', imageId: 'flag-usa' },
  { name: 'Thailand', imageId: 'holiday-thailand' },
  { name: 'Malaysia', imageId: 'flag-malaysia' },
  { name: 'Singapore', imageId: 'holiday-singapore' },
  { name: 'More Countries', imageId: 'flag-generic' },
];


export default function VisaServicesPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'visa-services-hero');

  return (
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
            <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 block">Hassle-Free</span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold leading-tight">Visa Services</h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Your trusted partner for seamless visa processing for destinations worldwide.
            </p>
          </div>
        </section>

        <section className="py-20 section-bg-subtle">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Plane className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary">Tourist Visa</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Expert assistance for all your leisure travel visa needs, ensuring a smooth start to your vacation.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary">Business Visa</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Reliable and efficient visa services for corporate travel, meetings, and conferences.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary">Student Visa Assistance</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Guidance and support for students aspiring to study abroad, from application to approval.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-headline font-bold text-primary mb-2">Visa Document Checklist</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">General documents required for most visa applications. Requirements may vary by country.</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary">Passport</h4>
                    <p className="text-muted-foreground text-sm">Original passport with at least 6 months validity from the date of intended travel.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary">Application Form</h4>
                    <p className="text-muted-foreground text-sm">Completed and signed visa application form.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary">Photographs</h4>
                    <p className="text-muted-foreground text-sm">Recent passport-sized photographs as per embassy specifications.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary">Financial Documents</h4>
                    <p className="text-muted-foreground text-sm">Bank statements, ITR, and other proof of sufficient funds.</p>
                  </div>
                </li>
                 <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <Check className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary">Travel Itinerary</h4>
                    <p className="text-muted-foreground text-sm">Flight bookings, hotel reservations, and a day-wise plan.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 section-bg-subtle">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-headline font-bold text-primary mb-2">Destinations We Specialize In</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">We provide expert visa assistance for a wide range of countries. Here are some of our most popular destinations.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {countryVisaPages.map(({ name, imageId }) => {
                const image = PlaceHolderImages.find(p => p.id === imageId);
                return (
                  <a href="#" key={name} className="group block">
                    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative h-64">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={`Visa for ${name}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-2xl font-headline font-bold text-white">{name}</h3>
                        </div>
                      </div>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-primary text-white">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                 <h2 className="text-4xl font-headline font-bold mb-6">Get Started with Your Visa Application</h2>
                 <p className="text-lg text-slate-300 mb-8">Our team of experts is ready to assist you at every step. Contact us today for a free consultation.</p>
                 <Button asChild size="lg" className="bg-accent text-accent-foreground font-bold text-lg px-10 py-4 h-auto rounded-full hover:bg-accent/90">
                    <Link href="/contact-us">Contact Us Now</Link>
                 </Button>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
