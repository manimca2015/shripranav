'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TourListings } from '@/components/tour-listings';
import { tours } from '@/lib/data';
import type { Tour } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Users, MapPin, Hotel, Truck, Headset, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { FeaturedTourCard } from '@/components/featured-tour-card';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import GalleryModal from '@/components/gallery-modal';
import galleryData from '@/lib/gallery-data.json';
import { EnquiryModal } from '@/components/enquiry-modal';
import StreamingVideo from '@/components/streaming-video';
import useEmblaCarousel from 'embla-carousel-react';

const heroContent = {
  subheading: "India's Premium Driving Holiday Experts",
  heading: <>Self-Drive <br/><span className="text-accent">Adventures</span> Worldwide</>,
  paragraph: "Experience the world's most iconic driving routes with expert convoy management, luxury accommodations, and 24/7 ground support."
};

const heroSliderImages = [
  'tours-hero',
  'mega-tour-sa',
  'tour-spiti',
  'tour-jordan'
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEnquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImagePlaceholder[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  // Hero Slider
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => {
      clearInterval(interval);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const heroImages = useMemo(() => 
    heroSliderImages.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean) as ImagePlaceholder[], 
  []);
  
  const { bentoGalleryImages, bottomGalleryImage } = useMemo(() => {
    const jordanAlbum = galleryData.photoAlbums.find(a => a.destination === 'Jordan');
    const thailandAlbum = galleryData.photoAlbums.find(a => a.destination === 'Thailand');
    const malaysiaAlbum = galleryData.photoAlbums.find(a => a.destination === 'Malaysia');

    const getNonCoverImage = (album: any, usedIds: string[]): string | undefined => {
        if (!album) return undefined;
        return album.imageIds.find((id: string) => id !== album.coverImageId && !usedIds.includes(id));
    }
    
    let usedIds: string[] = [];
    
    const image1 = getNonCoverImage(jordanAlbum, usedIds);
    if(image1) usedIds.push(image1);

    const image2 = getNonCoverImage(thailandAlbum, usedIds);
    if(image2) usedIds.push(image2);

    const image3 = getNonCoverImage(malaysiaAlbum, usedIds);
    if(image3) usedIds.push(image3);
    
    const image4 = getNonCoverImage(jordanAlbum, usedIds);
    if(image4) usedIds.push(image4);

    const image5 = getNonCoverImage(thailandAlbum, usedIds);
    if(image5) usedIds.push(image5);

    const bentoConfigs = [
        { id: image1, className: 'md:col-span-2 md:row-span-2', label: "The Deserts of Jordan" },
        { id: image2, className: 'md:col-span-1 md:row-span-1', label: "Adventures in Thailand" },
        { id: image3, className: 'md:col-span-1 md:row-span-1', label: "Exploring Malaysian Highlands" },
        { id: image4, className: 'md:col-span-1 md:row-span-1', label: "Ancient Jordanian History" },
        { id: image5, className: 'md:col-span-1 md:row-span-1', label: "Cultural Stops in Thailand" },
    ].filter(config => config.id);

    const bentoImages = bentoConfigs.map(item => {
        const image = PlaceHolderImages.find(p => p.id === item.id);
        return { ...item, ...image };
    });
    
    const bottomImageId = getNonCoverImage(malaysiaAlbum, usedIds);
    
    let bottomImage: (ImagePlaceholder & { label?: string }) | undefined;

    if (bottomImageId) {
        const foundImage = PlaceHolderImages.find(p => p.id === bottomImageId);
        if (foundImage) {
            bottomImage = {
                ...foundImage,
                label: 'Scenic Malaysian Roads'
            };
        }
    }
    
    return { bentoGalleryImages: bentoImages, bottomGalleryImage: bottomImage };
  }, []);

  const featuredTourIds = ['jordan', 'south-africa', 'thailand'];
  const featuredTours = useMemo(() => 
      featuredTourIds.map(id => tours.find(t => t.id === id)).filter((t): t is Tour => !!t), 
    [featuredTourIds]
  );

  const allGalleryImages: ImagePlaceholder[] = [...bentoGalleryImages, bottomGalleryImage].filter(
    (img): img is ImagePlaceholder => !!(img && img.imageUrl)
  );

  const openModal = (imageIndex: number) => {
    setSelectedImages(allGalleryImages);
    setStartIndex(imageIndex);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <section id="hero-section" className="relative w-full h-screen overflow-hidden">
            {/* Image Slider Background */}
            <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
                <div className="flex h-full">
                    {heroImages.map((image, index) => (
                        <div key={image.id} className="relative flex-[0_0_100%] h-full">
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                priority={index === 0}
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent"></div>
            </div>

             <div className="relative z-10 h-full flex flex-col justify-end md:justify-center">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                    <div className="max-w-3xl pt-32 pb-16 md:py-0">
                        <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 block text-sm md:text-base">{heroContent.subheading}</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold text-white leading-tight mb-8">{heroContent.heading}</h1>
                        <p className="text-base md:text-lg text-primary-foreground/90 mb-10 leading-relaxed max-w-xl">{heroContent.paragraph}</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" className="bg-accent text-accent-foreground px-6 sm:px-10 py-3 sm:py-4 h-auto rounded-full font-bold text-sm md:text-base hover:bg-accent/90 transition-all shadow-xl-accent btn-hover-lift">
                            <a href="#upcoming-convoys-2026">Upcoming Experiences 2026</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-12 right-12 z-20 flex gap-4">
                <Button
                    size="icon"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-accent hover:text-accent-foreground rounded-full h-12 w-12"
                    onClick={scrollPrev}
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                    size="icon"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-accent hover:text-accent-foreground rounded-full h-12 w-12"
                    onClick={scrollNext}
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-6 h-6" />
                </Button>
            </div>

            <div className="absolute bottom-12 left-12 z-20 hidden md:flex items-center gap-2">
                {heroImages.map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-500 ${selectedIndex === i ? 'w-8 bg-accent' : 'w-2 bg-white/30'}`}
                    />
                ))}
            </div>
        </section>

        <section id="about-fair-future" className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 block">Premium Positioning</span>
                    <h2 className="text-5xl font-headline font-bold text-primary mb-6 leading-tight">We Don't Cater to the Masses</h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">Fair Future Travels & Vacations is India's leading premium driving holiday specialist. Since our inception, we've been crafting extraordinary self-drive expeditions across the globe's most breathtaking landscapes.</p>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">Our meticulously planned convoys combine the thrill of adventure driving with the comfort of luxury travel. Every route is pre-scouted, every hotel hand-picked, and every detail managed by our expert team.</p>
                    <div className="flex gap-6 mb-8 md:mb-0">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                                <ShieldCheck className="text-accent text-xl" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary">24/7</p>
                                <p className="text-sm text-slate-500">Ground Support</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                                <Users className="text-accent text-xl" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary">500+</p>
                                <p className="text-sm text-slate-500">Happy Travelers</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-primary group">
                    <StreamingVideo
                        src="/videos/desktop/desktop.m3u8"
                        poster="/videos/Malaysia_Expedition.webp"
                        autoplay={true}
                        maxLoops={3}
                        muted={true}
                        controls
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>

        <section id="upcoming-convoys-2026" className="relative py-20 min-h-[900px] flex flex-col justify-center overflow-hidden section-bg-subtle">
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
          <div className="container mx-auto px-4 relative z-10 max-w-7xl">
            <div className="flex flex-col items-center mb-12 space-y-8">
              <div className="text-center space-y-3">
                  <span className="text-accent font-semibold tracking-widest text-xs uppercase">Your Next Adventure Awaits</span>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">Upcoming Experiences</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto font-light">Join our curated journeys across the globe. Experience the thrill of the open road.</p>
              </div>
              <TourListings tours={tours} />
            </div>
            <div className="mt-16 text-center">
              <Link href="/tours" className="inline-flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors border-b-2 border-transparent hover:border-accent pb-0.5">
                  View All Experiences <ArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </section>

        <section id="featured-mega-tours" className="py-24 px-4 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 block">Signature Expeditions</span>
                    <h2 className="text-5xl font-headline font-bold text-primary mb-6">Featured Mega Tours</h2>
                    <p className="text-slate-600 text-lg max-w-3xl mx-auto">Our most popular and comprehensive driving adventures, designed for the ultimate road trip experience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredTours.map(tour => <FeaturedTourCard key={tour.id} tour={tour} />)}
                </div>
            </div>
        </section>
        
        <section id="features" className="relative py-24 bg-primary overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/10 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent/5 rounded-full opacity-30 blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="text-center mb-20">
                    <span className="text-accent font-semibold tracking-[0.2em] text-sm uppercase mb-3 block">Premium Service</span>
                    <h2 className="text-4xl md:text-5xl font-headline text-primary-foreground font-bold mb-6">Why Choose Fair Future?</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        We deliver unmatched expertise, safety, and luxury in every driving expedition we organize, ensuring your journey is as memorable as the destination.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
                        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                            <ShieldCheck className="text-2xl text-accent group-hover:text-accent-foreground transition-colors" />
                        </div>
                        <h3 className="text-xl font-headline text-primary-foreground font-semibold mb-3">Safety Convoy System</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                            Professional lead and sweep vehicles with expert convoy managers ensure your safety throughout the journey with real-time monitoring.
                        </p>
                    </div>

                    <div className="group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
                        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                            <MapPin className="text-2xl text-accent group-hover:text-accent-foreground transition-colors" />
                        </div>
                        <h3 className="text-xl font-headline text-primary-foreground font-semibold mb-3">Pre-Planned Routes</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                            Every route is meticulously scouted and curated to showcase the best landscapes and driving experiences available in the region.
                        </p>
                    </div>

                    <div className="group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
                        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                            <Users className="text-2xl text-accent group-hover:text-accent-foreground transition-colors" />
                        </div>
                        <h3 className="text-xl font-headline text-primary-foreground font-semibold mb-3">Expert Management</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                            Experienced convoy managers handle all logistics, briefings, and on-ground coordination seamlessly so you can focus on driving.
                        </p>
                    </div>

                    <div className="group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
                        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                            <Hotel className="text-2xl text-accent group-hover:text-accent-foreground transition-colors" />
                        </div>
                        <h3 className="text-xl font-headline text-primary-foreground font-semibold mb-3">Luxury Hotels</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                            Stay in hand-picked 4 and 5-star properties that offer comfort and exceptional service at every destination stop.
                        </p>
                    </div>

                    <div className="group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
                        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                            <Truck className="text-2xl text-accent group-hover:text-accent-foreground transition-colors" />
                        </div>
                        <h3 className="text-xl font-headline text-primary-foreground font-semibold mb-3">Verified 4x4 Vehicles</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                            Drive top-quality, fully serviced 4x4 vehicles equipped for any terrain and weather condition you might encounter.
                        </p>
                    </div>

                    <div className="group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
                        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                            <Headset className="text-2xl text-accent group-hover:text-accent-foreground transition-colors" />
                        </div>
                        <h3 className="text-xl font-headline text-primary-foreground font-semibold mb-3">24x7 Ground Team</h3>
                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                            Round-the-clock support with mechanical assistance, medical backup, and emergency response systems ready to deploy.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="testimonials" className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <span className="text-accent font-semibold tracking-[0.2em] text-sm uppercase mb-3 block">Trusted By Travelers</span>
                    <h2 className="text-4xl md:text-5xl font-headline text-primary font-bold mb-4">What Our Clients Say</h2>
                    <div className="flex items-center justify-center gap-2 text-yellow-400 text-lg">
                        <Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" />
                        <span className="text-slate-600 text-sm font-medium ml-2"><span className="font-bold text-primary">4.9/5</span> from 250+ Google Reviews</span>
                    </div>
                </div>

                <TestimonialsCarousel />
            </div>
        </section>

        <section id="gallery" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-accent font-bold text-sm tracking-[0.2em] uppercase">Gallery</span>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mt-4 mb-4">
                        From Our Adventurers' Lens
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        A glimpse into the incredible journeys and memories made by our community of explorers.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
                    {bentoGalleryImages.map((image, index) => (
                        image.imageUrl && (
                            <div key={image.id} className={`${image.className} rounded-2xl overflow-hidden relative group cursor-pointer`} onClick={() => openModal(index)}>
                                <Image
                                    src={image.imageUrl}
                                    alt={image.description || 'Gallery image'}
                                    fill
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    data-ai-hint={image.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white font-medium">{image.label}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 h-[300px]">
                    {bottomGalleryImage && bottomGalleryImage.imageUrl && (
                        <div className="rounded-2xl overflow-hidden relative group cursor-pointer" onClick={() => openModal(bentoGalleryImages.length)}>
                            <Image
                                src={bottomGalleryImage.imageUrl}
                                alt={bottomGalleryImage.description || 'Gallery image'}
                                fill
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                data-ai-hint={bottomGalleryImage.imageHint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-medium">{bottomGalleryImage.label}</p>
                            </div>
                        </div>
                    )}
                    <div className="rounded-2xl overflow-hidden relative group flex items-center justify-center bg-primary">
                        <div className="text-center">
                            <h3 className="text-2xl font-headline text-white mb-2">Want to See More?</h3>
                            <Link href="/gallery" className="text-accent font-bold hover:underline">
                                Explore Our Gallery <ArrowRight className="inline-block ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section
          id="cta-section"
          className="relative py-24 px-4 bg-cover bg-center text-white"
          style={{ backgroundImage: "url('/cta-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 leading-tight">Ready to Start Your <span className="text-accent">Driving Adventure?</span></h2>
            <p className="text-lg md:text-xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed">Join our exclusive community of driving enthusiasts. Speak with our expedition experts today or reach out via WhatsApp.</p>
            <div className="flex flex-wrap justify-center gap-6 mb-16">
                <Button asChild size="lg" className="bg-white text-primary px-12 py-5 h-auto rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl btn-hover-lift">
                    <Link href="https://wa.me/917907526773" target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon className="mr-3 w-6 h-6"/> WhatsApp Us
                    </Link>
                </Button>
                <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-12 py-5 h-auto rounded-full font-bold text-lg hover:bg-[#e0af29] hover:text-primary hover:border-[#e0af29] transition-all btn-hover-lift"
                    onClick={() => setEnquiryModalOpen(true)}
                >
                    Enquire Now
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-12 border-t border-white/20">
                <div className="space-y-2">
                    <div className="text-5xl font-bold text-accent">500+</div>
                    <p className="text-slate-300">Happy Travelers</p>
                </div>
                <div className="space-y-2">
                    <div className="text-5xl font-bold text-accent">25+</div>
                    <p className="text-slate-300">Countries Covered</p>
                </div>
                <div className="space-y-2">
                    <div className="text-5xl font-bold text-accent">100%</div>
                    <p className="text-slate-300">Safety Record</p>
                </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      {modalOpen && (
        <GalleryModal
          images={selectedImages}
          isOpen={modalOpen}
          onClose={closeModal}
          startIndex={startIndex}
        />
      )}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        tourName="General Enquiry"
      />
    </div>
  );
}
