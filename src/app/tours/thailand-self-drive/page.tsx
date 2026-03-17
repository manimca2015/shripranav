
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { 
  Star, 
  Users, 
  CalendarCheck, 
  Check, 
  ChevronRight, 
  Clock, 
  Car, 
  ShieldCheck, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import Link from 'next/link';

export default function ThailandItineraryPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'tour-thailand');
  
  // Attraction images mapping
  const attractionImages = [
    { id: 'gallery-thailand-11', label: 'James Bond Island' },
    { id: 'gallery-thailand-8', label: 'Bangkok Temple' },
    { id: 'gallery-thailand-1', label: 'Phraya Nakhon Cave' },
    { id: 'gallery-thailand-4', label: 'Ao Nang Beach' },
  ].map(attr => ({
    ...attr,
    image: PlaceHolderImages.find(p => p.id === attr.id)
  }));

  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* SECTION 1 — HERO */}
        <section className="relative h-[600px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt="Scenic Thailand Coastal View"
              fill
              className="object-cover"
              priority
              data-ai-hint="thailand coastal"
            />
          )}
          
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <div className="max-w-4xl">
              <nav className="flex items-center gap-2 text-white/80 text-sm mb-4">
                <Link href="/" className="hover:text-accent">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Self Drive</span>
                <ChevronRight className="w-3 h-3" />
                <span>International</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">Thailand Self-Drive Experience</span>
              </nav>
              
              <span className="text-accent font-bold tracking-widest text-sm uppercase mb-2 block">
                Wander Thailand's Hidden Roads
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-8">
                THAILAND
              </h1>
              
              {/* Info Bar */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-6 flex flex-wrap items-center justify-between gap-6 shadow-2xl">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs font-bold uppercase">From INR</span>
                  <span className="text-primary text-3xl font-bold font-headline">₹1,60,000</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-sm font-semibold text-primary">
                    <CalendarCheck className="w-4 h-4 text-accent" />
                    May 1 – May 7
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-sm font-semibold text-primary">
                    <Clock className="w-4 h-4 text-accent" />
                    6 Nights / 7 Days
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-sm font-semibold text-primary">
                    <Car className="w-4 h-4 text-accent" />
                    Self Drive
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — STICKY BOOKING BAR */}
        <section className="sticky top-20 z-40 bg-primary border-b border-white/10 shadow-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <p className="text-white/70 text-sm hidden sm:block">Starting from</p>
                <p className="text-2xl font-bold text-accent">₹1,60,000 <span className="text-sm text-white/60 font-normal">per person</span></p>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <Button className="flex-1 md:flex-none bg-accent text-accent-foreground font-bold px-10 hover:bg-accent/90 rounded-full h-12 transition-all shadow-lg hover:shadow-accent/20">
                  Book Now
                </Button>
                <Button variant="outline" className="flex-1 md:flex-none border-white/30 text-white hover:bg-white/10 rounded-full h-12">
                  Enquire
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — CONTENT NAVIGATION */}
        <section className="sticky top-[152px] md:top-[88px] z-30 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <nav className="flex overflow-x-auto gap-8 py-4 no-scrollbar">
              <Link href="#overview" className="whitespace-nowrap text-sm font-bold text-primary border-b-2 border-accent pb-4 -mb-4">
                Overview
              </Link>
              <Link href="#itinerary-brief" className="whitespace-nowrap text-sm font-semibold text-slate-500 hover:text-accent transition-colors">
                Itinerary Brief
              </Link>
            </nav>
          </div>
        </section>

        {/* MAIN CONTENT AREA */}
        <section className="py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              
              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-16">
                
                {/* SECTION 4 — UNIQUE ATTRACTIONS */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-headline font-bold text-primary">Destination Highlights</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                    {attractionImages.map((attr, idx) => (
                      <div key={idx} className="flex-shrink-0 w-full sm:w-auto text-center group">
                        <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-md">
                          {attr.image && (
                            <Image
                              src={attr.image.imageUrl}
                              alt={attr.label}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                        </div>
                        <p className="text-sm font-bold text-slate-700">{attr.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 5 — ITINERARY BRIEF / OVERVIEW */}
                <div id="overview" className="scroll-mt-48 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Itinerary Brief</h2>
                  <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                    <p>
                      Experience Thailand on a <strong>6-night, 7-day self-drive coastal adventure</strong> that combines lively cities, tropical beaches, and scenic highway drives. Starting in Bangkok, this self-drive takes you through <strong>Chumphon, Krabi, and Phuket</strong>, featuring city tours, cultural landmarks, island-hopping excursions, famous beaches such as <strong>Ao Nang, Kata, and Karon</strong>, and a visit to the iconic <strong>James Bond Island</strong>. Covering about <strong>1200 km</strong>, this well-planned route offers a perfect balance of adventure, comfort, and the freedom to explore Thailand's stunning coastal scenery with expert support throughout the journey.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-start gap-4">
                      <div className="bg-accent/10 rounded-xl p-3 text-accent shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary mb-1">Expert Support</h4>
                        <p className="text-sm text-slate-500">Professional assistance at every stage of your drive.</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-start gap-4">
                      <div className="bg-accent/10 rounded-xl p-3 text-accent shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary mb-1">Curated Route</h4>
                        <p className="text-sm text-slate-500">1200 km of pre-scouted scenic coastal highways.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN — SIDEBAR */}
              <div className="lg:col-span-1">
                <div className="sticky top-[220px] space-y-6">
                  {/* Booking Card */}
                  <Card className="border-2 border-accent/20 rounded-3xl overflow-hidden shadow-2xl">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-headline font-bold text-primary mb-6">Book This Tour</h3>
                      
                      <div className="space-y-6 mb-8">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-primary">₹1,60,000</span>
                          <span className="text-slate-500 text-sm">/ per person</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl">
                            <CalendarCheck className="w-4 h-4 text-accent" />
                            May 1 – May 7
                          </div>
                          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl">
                            <Clock className="w-4 h-4 text-accent" />
                            6 Nights / 7 Days
                          </div>
                          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl">
                            <Car className="w-4 h-4 text-accent" />
                            Self Drive
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Button className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 shadow-xl transition-all active:scale-[0.98]">
                          Book Now
                        </Button>
                        <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-slate-200 text-primary font-bold text-lg hover:bg-slate-50">
                          Enquire Now
                        </Button>
                      </div>
                      
                      <div className="mt-6 flex gap-2">
                        <Link href="https://wa.me/917907526773" className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 transition-colors">
                          <WhatsAppIcon className="w-5 h-5" /> WhatsApp
                        </Link>
                        <Link href="tel:+919188922602" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 transition-colors">
                          <Phone className="w-4 h-4" /> Call Us
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Why Book With Us */}
                  <div className="bg-primary rounded-3xl p-8 text-white shadow-xl">
                    <h4 className="text-xl font-headline font-bold mb-6 flex items-center gap-2 text-accent">
                      <ShieldCheck className="w-6 h-6" /> Why Book With Us?
                    </h4>
                    <ul className="space-y-4">
                      {[
                        'Expert local support throughout the journey',
                        'Fully planned 1200 km self-drive route',
                        'Handpicked accommodations en route',
                        'Island-hopping and beach excursions included',
                        '24/7 assistance during your trip',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                          <div className="mt-1 bg-accent/20 p-0.5 rounded-full shrink-0">
                            <Check className="w-3 h-3 text-accent" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
