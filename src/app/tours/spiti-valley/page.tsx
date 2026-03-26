'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { 
  CalendarCheck, 
  Check, 
  Clock, 
  Car, 
  ShieldCheck, 
  MapPin, 
  Star,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import galleryData from '@/lib/gallery-data.json';
import { EnquiryModal } from '@/components/enquiry-modal';
import { BrochureEnquiryModal } from '@/components/brochure-enquiry-modal';
import { tours } from '@/lib/data';

const spitiHighlights = [
  { name: 'Baspa River', imageUrl: '/spiti-valley/Baspa-River.jpg' },
  { name: 'Key Monastery', imageUrl: '/spiti-valley/Key-Monastery.jpg' },
  { name: 'Langza Buddha', imageUrl: '/spiti-valley/Langza-Buddha.jpg' },
  { name: 'Nako Village', imageUrl: '/spiti-valley/Nako-Village.jpg' },
];

export default function SpitiItineraryPage() {
  const [isEnquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [isBrochureModalOpen, setBrochureModalOpen] = useState(false);

  const tour = tours.find(t => t.id === 'spiti-valley');

  const heroImage = PlaceHolderImages.find(p => p.id === 'tour-spiti');

  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        
        <main>
          {/* SECTION 1 — HERO */}
          <section id="hero-itinerary" className="relative h-[850px] lg:h-[800px] w-full overflow-hidden">
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />
            
            {/* Background Image */}
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt="Scenic Spiti Valley View"
                fill
                className="object-cover"
                priority
                data-ai-hint="spiti mountains"
              />
            )}
            
            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-32 lg:pb-40">
              <div className="max-w-4xl">
                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">9 Nights / 10 Days</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10">Self Drive 4x4</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10">Domestic</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 font-headline uppercase tracking-tight leading-none">
                  SPITI VALLEY
                </h1>
                <p className="text-accent font-bold tracking-[0.3em] text-lg uppercase mb-6 block">
                  “The Best Stories Are Never Found on Easy Roads.”
                </p>

                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl leading-relaxed font-light">
                  Step into the wild heart of the Himalayas with the Spiti Summer Self-Drive Expedition — a 10-day adventure where every turn brings raw landscapes and roads that test your spirit.
                </p>
                
                <div className="flex flex-wrap gap-6 items-center text-white">
                  <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent" fill="currentColor" />
                      <span className="font-semibold">4.9/5</span>
                      <span className="text-white/80">(42 reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent" />
                      <span>Max 12 travelers</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <CalendarCheck className="w-5 h-5 text-accent" />
                      <span>Next: April 28, 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2 — BOOKING BAR OVERLAY */}
            <div id="booking-bar" className="absolute bottom-0 left-0 w-full z-30 bg-gradient-to-t from-black/80 via-black/50 to-black/20 backdrop-blur-md border-t border-white/10">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
                    <div className="text-center md:text-left">
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Starting from</p>
                        <p className="text-3xl md:text-4xl font-bold text-accent tracking-tighter">₹1,15,000 <span className="text-xs text-white/60 font-normal tracking-normal uppercase ml-1">per person</span></p>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-white/20" />
                    <div className="text-center md:text-left">
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Next Available</p>
                        <p className="text-white font-bold text-lg tracking-tight">April 28 – May 7, 2026</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 w-full md:w-auto">
                    <Button onClick={() => setBrochureModalOpen(true)} className="flex-1 md:flex-none bg-accent text-accent-foreground font-bold px-8 py-3 h-auto rounded-xl transition-all hover:bg-white hover:text-black border-2 border-transparent hover:border-[#e0af29] text-base">
                      Download Itinerary
                    </Button>
                    <Button onClick={() => setEnquiryModalOpen(true)} variant="outline" className="flex-1 md:flex-none bg-white/10 text-white font-bold px-8 py-3 h-auto rounded-xl border border-white/20 transition-all hover:bg-[#e0af29] hover:text-accent-foreground hover:border-[#e0af29] text-base">
                      Enquire Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3 — CONTENT NAVIGATION */}
          <section id="content-navigation" className="bg-slate-50 border-b border-slate-200 sticky top-[88px] z-40">
            <div className="container mx-auto px-4">
              <nav className="flex overflow-x-auto gap-1 py-2 no-scrollbar">
                <Link href="#overview" className="whitespace-nowrap px-6 py-3 text-sm font-bold text-slate-700 hover:text-accent hover:bg-white rounded-lg transition-all">
                  Itinerary Brief
                </Link>
                <Link href="#highlights" className="whitespace-nowrap px-6 py-3 text-sm font-bold text-slate-700 hover:text-accent hover:bg-white rounded-lg transition-all">
                  Destination Highlights
                </Link>
              </nav>
            </div>
          </section>

          {/* MAIN CONTENT AREA */}
          <section id="main-content" className="py-12 lg:py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                
                {/* LEFT COLUMN */}
                <div className="lg:col-span-2 space-y-12">
                  
                  {/* SECTION 5 — ITINERARY BRIEF */}
                  <div id="overview" className="scroll-mt-48 space-y-8">
                    <h2 className="text-4xl font-headline font-bold text-primary tracking-tight">Itinerary Brief</h2>
                    <div className="prose prose-xl max-w-none text-slate-600 leading-relaxed font-light">
                      <p>
                        Step into the wild heart of the Himalayas with the <strong>Spiti Summer Self-Drive Expedition</strong> — a 10-day adventure where every turn brings raw landscapes, ancient monasteries, remote villages, river crossings, and roads that test your spirit. From the last village of India at Chitkul to the surreal cold desert of Kaza, from the curves of Kinnaur to the towering peaks of Kalpa, this is not just a trip — it's a story you will tell for the rest of your life. <strong>Built for true explorers</strong>, this expedition combines adrenaline, breathtaking scenery, and the unmatched thrill of driving your own 4x4 through one of India’s most dramatic mountain terrains.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex items-start gap-6 group hover:bg-white hover:shadow-xl transition-all duration-500">
                        <div className="bg-accent/10 rounded-xl p-4 text-accent shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary text-lg mb-2">Expert Support</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">Full technical convoy support including lead and sweep vehicles with expert mechanics.</p>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex items-start gap-6 group hover:bg-white hover:shadow-xl transition-all duration-500">
                        <div className="bg-accent/10 rounded-xl p-4 text-accent shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <MapPin className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary text-lg mb-2">Iconic Landmarks</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">Visit the world's highest post office, ancient monasteries, and the Indo-Tibetan border.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4 — UNIQUE ATTRACTIONS */}
                  <div id="highlights" className="scroll-mt-48 space-y-8">
                    <h3 className="text-3xl font-headline font-bold text-primary">Destination Highlights</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {spitiHighlights.map((attr, idx) => (
                        <div key={idx} className="group text-center">
                          <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-lg border border-slate-100">
                            <Image
                              src={attr.imageUrl}
                              alt={attr.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                          <p className="font-bold text-primary text-sm uppercase tracking-wider">{attr.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN — SIDEBAR */}
                <div className="lg:col-span-1">
                  <div className="sticky top-[160px] space-y-6">
                    {/* Booking Card */}
                    <Card className="border-2 border-accent rounded-3xl overflow-hidden shadow-xl bg-white">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-headline font-bold text-primary mb-6">Book This Tour</h3>
                        
                        <div className="space-y-6 mb-8">
                          <div className="flex flex-col">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Starting from</span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-bold text-primary tracking-tight">₹1,15,000</span>
                              <span className="text-slate-500 text-sm font-medium">/ person</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                              <CalendarCheck className="w-5 h-5 text-accent" />
                              April 28 – May 7
                            </div>
                            <div className="flex items-center gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                              <Clock className="w-5 h-5 text-accent" />
                              9 Nights / 10 Days
                            </div>
                            <div className="flex items-center gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                              <Car className="w-5 h-5 text-accent" />
                              Self Drive 4x4
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <Button onClick={() => setBrochureModalOpen(true)} className="w-full h-auto py-4 rounded-xl bg-accent text-accent-foreground font-bold text-base transition-all hover:bg-white hover:text-black border-2 border-transparent hover:border-[#e0af29] shadow-lg">
                            Download Itinerary
                          </Button>
                          <Button onClick={() => setEnquiryModalOpen(true)} variant="outline" className="w-full h-auto py-4 rounded-xl border-2 border-slate-200 text-primary font-bold text-base hover:bg-slate-50 transition-all">
                            Enquire Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Why Book With Us */}
                    <div className="bg-primary rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-accent/10 rounded-full blur-2xl"></div>
                      <h4 className="text-xl font-headline font-bold mb-6 flex items-center gap-3 text-accent">
                        <ShieldCheck className="w-6 h-6" /> Why Book With Us?
                      </h4>
                      <ul className="space-y-4">
                        {[
                          'Expert local support throughout the journey',
                          'Fully planned 4x4 mountain expedition route',
                          'Handpicked premium stays in remote locations',
                          'Cultural interactions and village visits included',
                          '24/7 assistance and mechanical backup',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                            <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
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
      {tour && (
        <>
          <BrochureEnquiryModal 
            isOpen={isBrochureModalOpen}
            onClose={() => setBrochureModalOpen(false)}
            tourName={tour.title}
            brochureUrl={tour.brochureUrl || ''}
          />
          <EnquiryModal 
            isOpen={isEnquiryModalOpen}
            onClose={() => setEnquiryModalOpen(false)}
            tourName={tour.title}
          />
        </>
      )}
    </>
  );
}
