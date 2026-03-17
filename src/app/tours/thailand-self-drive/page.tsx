
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { 
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
import { Card, CardContent } from '@/components/ui/card';

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
      
      <main>
        {/* SECTION 1 — HERO */}
        <section className="relative h-[650px] lg:h-[750px] w-full overflow-hidden">
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
          
          {/* Background Image */}
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
          
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-16 lg:pb-24">
            <div className="max-w-5xl">
              {/* Breadcrumb Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <Link href="/" className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity">Home</Link>
                <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] border border-white/20">Self Drive</span>
                <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] border border-white/20">International</span>
                <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] border border-white/20">Thailand</span>
              </div>
              
              <span className="text-accent font-bold tracking-[0.3em] text-sm md:text-base uppercase mb-4 block">
                Wander Thailand's Hidden Roads
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline font-black text-white mb-8 leading-[0.9] tracking-tighter">
                THAILAND
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed font-light">
                Explore Thailand on a 6-night, 7-day self-drive coastal adventure that combines lively cities, tropical beaches, and scenic highway drives.
              </p>
              
              {/* Floating Info Bar */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 flex flex-wrap items-center justify-between gap-8 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">From INR</span>
                    <span className="text-primary text-4xl font-black font-headline leading-none">₹1,60,000</span>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-slate-100" />
                </div>
                
                <div className="flex flex-wrap items-center gap-6 lg:gap-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <CalendarCheck className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">Date</p>
                      <p className="text-base font-bold text-primary">May 1 – May 7</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">Duration</p>
                      <p className="text-base font-bold text-primary">6 Nights / 7 Days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <Car className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">Drive Type</p>
                      <p className="text-base font-bold text-primary">Self Drive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — STICKY BOOKING BAR */}
        <section className="sticky top-20 z-40 bg-primary border-b border-white/10 shadow-xl py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <p className="text-white/70 text-sm hidden sm:block">Starting from</p>
                <p className="text-2xl font-bold text-accent">₹1,60,000 <span className="text-sm text-white/60 font-normal">per person</span></p>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <Button className="flex-1 md:flex-none bg-accent text-accent-foreground font-bold px-10 hover:bg-accent/90 rounded-full h-12 transition-all shadow-lg">
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
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
              
              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-20">
                
                {/* SECTION 4 — UNIQUE ATTRACTIONS */}
                <div className="space-y-8">
                  <h3 className="text-3xl font-headline font-bold text-primary">Destination Highlights</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {attractionImages.map((attr, idx) => (
                      <div key={idx} className="group text-center">
                        <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 shadow-lg border border-slate-100">
                          {attr.image && (
                            <Image
                              src={attr.image.imageUrl}
                              alt={attr.label}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          )}
                        </div>
                        <p className="text-sm font-bold text-slate-800 tracking-tight">{attr.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 5 — ITINERARY BRIEF / OVERVIEW */}
                <div id="overview" className="scroll-mt-48 space-y-8">
                  <h2 className="text-4xl font-headline font-bold text-primary tracking-tight">Itinerary Brief</h2>
                  <div className="prose prose-xl max-w-none text-slate-600 leading-relaxed font-light">
                    <p>
                      Experience Thailand on a <strong className="font-bold text-primary text-2xl lg:text-3xl block my-6">6-night, 7-day self-drive coastal adventure</strong> that combines lively cities, tropical beaches, and scenic highway drives. Starting in Bangkok, this self-drive takes you through <strong>Chumphon, Krabi, and Phuket</strong>, featuring city tours, cultural landmarks, island-hopping excursions, famous beaches such as <strong>Ao Nang, Kata, and Karon</strong>, and a visit to the iconic <strong>James Bond Island</strong>. Covering about <strong>1200 km</strong>, this well-planned route offers a perfect balance of adventure, comfort, and the freedom to explore Thailand's stunning coastal scenery with expert support throughout the journey.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex items-start gap-6 group hover:bg-white hover:shadow-xl transition-all duration-500">
                      <div className="bg-accent/10 rounded-2xl p-4 text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-lg mb-2">Expert Support</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">Professional mechanical and logistical assistance at every stage of your drive.</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex items-start gap-6 group hover:bg-white hover:shadow-xl transition-all duration-500">
                      <div className="bg-accent/10 rounded-2xl p-4 text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-lg mb-2">Curated Route</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">1200 km of pre-scouted scenic coastal highways designed for driving enthusiasts.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN — SIDEBAR */}
              <div className="lg:col-span-1">
                <div className="sticky top-[220px] space-y-8">
                  {/* Booking Card */}
                  <Card className="border-none rounded-[40px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] bg-white">
                    <CardContent className="p-10">
                      <h3 className="text-2xl font-headline font-bold text-primary mb-8">Book This Tour</h3>
                      
                      <div className="space-y-8 mb-10">
                        <div className="flex flex-col">
                          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Starting from</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-primary tracking-tighter">₹1,60,000</span>
                            <span className="text-slate-500 text-sm font-medium">/ person</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <CalendarCheck className="w-5 h-5 text-accent" />
                            May 1 – May 7
                          </div>
                          <div className="flex items-center gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <Clock className="w-5 h-5 text-accent" />
                            6 Nights / 7 Days
                          </div>
                          <div className="flex items-center gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <Car className="w-5 h-5 text-accent" />
                            Self Drive
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Button className="w-full h-16 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 shadow-xl transition-all transform active:scale-[0.98]">
                          Book Now
                        </Button>
                        <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-slate-200 text-primary font-bold text-lg hover:bg-slate-50 transition-all">
                          Enquire Now
                        </Button>
                      </div>
                      
                      <div className="mt-8 flex gap-3">
                        <Link href="https://wa.me/917907526773" className="flex-1 bg-[#25D366] hover:bg-[#20bd5c] text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#25D366]/20">
                          <WhatsAppIcon className="w-6 h-6" /> WhatsApp
                        </Link>
                        <Link href="tel:+919188922602" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-600/20">
                          <Phone className="w-5 h-5" /> Call Us
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Why Book With Us */}
                  <div className="bg-primary rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-700"></div>
                    <h4 className="text-xl font-headline font-bold mb-8 flex items-center gap-3 text-accent">
                      <ShieldCheck className="w-7 h-7" /> Why Book With Us?
                    </h4>
                    <ul className="space-y-6">
                      {[
                        'Expert local support throughout the journey',
                        'Fully planned 1200 km self-drive route',
                        'Handpicked accommodations en route',
                        'Island-hopping and beach excursions included',
                        '24/7 assistance during your trip',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-slate-300 font-light leading-relaxed">
                          <div className="mt-1 bg-accent/20 p-1 rounded-full shrink-0">
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
