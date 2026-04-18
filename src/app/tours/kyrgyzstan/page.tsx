'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { 
  CalendarCheck, 
  Check, 
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
import GalleryModal from '@/components/gallery-modal';
import { TourLeadForm } from '@/components/tour-lead-form';

const uniqueAttractions = [
  { name: 'Bishkek – Ala-Too Square', id: 'gallery-jordan-2' }, // placeholders used if real ones missing
  { name: 'Issyk-Kul Lake', id: 'gallery-jordan-3' },
  { name: 'Son-Kul Lake', id: 'tour-kyrgyzstan' },
  { name: 'Skazka Canyon', id: 'gallery-jordan-4' },
  { name: 'Altyn Arashan Valley', id: 'gallery-jordan-5' },
];

export default function KyrgyzstanItineraryPage() {
  const [isEnquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [isBrochureModalOpen, setBrochureModalOpen] = useState(false);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  const tour = tours.find(t => t.id === 'kyrgyzstan');

  const heroImage = PlaceHolderImages.find(p => p.id === 'tour-kyrgyzstan');
  
  const attractionImages = useMemo(() => {
    return uniqueAttractions.map(attr => {
        const img = PlaceHolderImages.find(p => p.id === attr.id);
        return { ...img, description: attr.name };
    });
  }, []);

  const openGallery = (index: number) => {
    setGalleryStartIndex(index);
    setGalleryOpen(true);
  };

  return (
    <>
      <div className="bg-white min-h-screen">
        <Header />
        
        <main>
          {/* SECTION 1 — HERO */}
          <section id="hero-itinerary" className="relative h-[650px] lg:h-[800px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />
            
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt="Scenic Kyrgyzstan Mountains"
                fill
                className="object-cover"
                priority
                data-ai-hint="kyrgyzstan mountains"
              />
            )}
            
            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-32 lg:pb-40">
              <div className="max-w-4xl">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">7 Nights / 8 Days</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10">Self Drive 4x4</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10">International</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 font-headline uppercase tracking-tight leading-none">
                  KYRGYZSTAN
                </h1>
                <p className="text-accent font-bold tracking-[0.3em] text-lg uppercase mb-6 block">
                  “Your Road. Your Rules. Your Kyrgyzstan.”
                </p>

                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl leading-relaxed font-light">
                  Explore the stunning mountain passes and pristine lakes of Central Asia. A 7-night self-drive adventure through the wild heart of the silk road.
                </p>
                
                <div className="flex flex-wrap gap-6 items-center text-white">
                  <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent" fill="currentColor" />
                      <span className="font-semibold">4.6/5</span>
                      <span className="text-white/80">(18 reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent" />
                      <span>Max 12 travelers</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <CalendarCheck className="w-5 h-5 text-accent" />
                      <span>Next: TBA</span>
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
                        <p className="text-3xl md:text-4xl font-bold text-accent tracking-tighter">₹2,71,000</p>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-white/20" />
                    <div className="text-center md:text-left">
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Date</p>
                        <p className="text-white font-bold text-lg tracking-tight">TBA</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 w-full md:w-auto">
                    <Button onClick={() => setEnquiryModalOpen(true)} className="flex-1 md:flex-none bg-accent text-accent-foreground font-bold px-8 py-3 h-auto rounded-xl transition-all hover:bg-white hover:text-black border-2 border-transparent hover:border-[#e0af29] text-base">
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
                  Unique Attractions
                </Link>
              </nav>
            </div>
          </section>

          {/* MAIN CONTENT AREA */}
          <section id="main-content" className="py-12 lg:py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                
                <div className="lg:col-span-2 space-y-12">
                  
                  <div id="overview" className="scroll-mt-48 space-y-8">
                    <h2 className="text-4xl font-headline font-bold text-primary tracking-tight">Itinerary Brief</h2>
                    <div className="prose prose-xl max-w-none text-slate-600 leading-relaxed font-light">
                      <p>
                        Step into the wild, untouched landscapes of Central Asia with the Kyrgyzstan Self-Drive Adventure — a 7-night expedition where every road leads to towering mountain ranges, alpine lakes, remote valleys, and experiences rooted in nomadic culture. From the vibrant capital of Bishkek to the red canyon beauty of Kyzyl Oi, from the high-altitude serenity of Son-Kul Lake to the endless blue shores of Issyk-Kul, this journey blends off-road driving, breathtaking scenery, and authentic cultural encounters into one unforgettable experience. Drive your own 4x4 through dramatic passes, hidden gorges, and scenic routes that few travellers ever explore, while discovering traditions like eagle hunting, local hospitality, and life in the highlands. This is not just a trip — it’s a story of adventure, freedom, and exploration that stays with you long after the journey ends.
                      </p>
                      <p className="mt-6 font-bold text-primary">Kyrgyzstan is waiting</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex items-start gap-6 group hover:bg-white hover:shadow-xl transition-all duration-500">
                        <div className="bg-accent/10 rounded-xl p-4 text-accent shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary text-lg mb-2">Expert Support</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">Full technical convoy support including lead and sweep vehicles with expert mechanics for rugged terrain.</p>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex items-start gap-6 group hover:bg-white hover:shadow-xl transition-all duration-500">
                        <div className="bg-accent/10 rounded-xl p-4 text-accent shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <MapPin className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary text-lg mb-2">Iconic Route</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">1900 km of carefully scouted mountain roads through the Tian Shan range.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="highlights" className="scroll-mt-48 space-y-8">
                    <h3 className="text-3xl font-headline font-bold text-primary">Unique Attractions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {attractionImages.map((image, idx) => (
                        <div key={idx} className="group text-center cursor-pointer" onClick={() => openGallery(idx)}>
                          <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg border border-slate-100">
                            {image.imageUrl && (
                              <Image
                                src={image.imageUrl}
                                alt={image.description || 'Attraction image'}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white font-bold text-sm leading-tight drop-shadow-md">{image.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-[160px] space-y-6">
                    <Card className="border-2 border-accent rounded-3xl overflow-hidden shadow-xl bg-white">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-headline font-bold text-primary mb-1">Plan Your Trip</h3>
                        <p className="text-slate-500 text-sm mb-6">Drop your details and let's craft your perfect mountain expedition.</p>
                        
                        <div className="pt-4">
                          <TourLeadForm tourName="Kyrgyzstan Self-Drive Adventure" />
                        </div>
                      </CardContent>
                    </Card>

                    <div className="bg-primary rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-accent/10 rounded-full blur-2xl"></div>
                      <h4 className="text-xl font-headline font-bold mb-6 flex items-center gap-3 text-accent">
                        <ShieldCheck className="w-6 h-6" /> Why Book With Us?
                      </h4>
                      <ul className="space-y-4">
                        {[
                          'Expert local support throughout the journey',
                          'Fully planned 1900 km high-altitude route',
                          'Handpicked premium hotels and traditional yurts',
                          'Nomadic cultural interactions included',
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
          <GalleryModal
            images={attractionImages as any}
            isOpen={isGalleryOpen}
            onClose={() => setGalleryOpen(false)}
            startIndex={galleryStartIndex}
          />
        </>
      )}
    </>
  );
}
