
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import { tours } from '@/lib/data';
import PhotoGallery from './photo-gallery';
import VideoGallery from './video-gallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Video } from 'lucide-react';

export default function GalleryPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'gallery-hero');

  const getAlbum = (name: string, prefix: string) => {
    const images = PlaceHolderImages.filter(p => p.id.startsWith(prefix));
    if (images.length === 0) {
        return null;
    }
    return {
        destination: name,
        coverImage: images[0],
        images: images
    };
  };

  const photoAlbums: {
      destination: string;
      coverImage: ImagePlaceholder;
      images: ImagePlaceholder[];
  }[] = [
      getAlbum('Jordan', 'gallery-jordan-'),
      getAlbum('Thailand', 'gallery-thailand-'),
      getAlbum('Malaysia', 'gallery-malaysia-')
  ].filter((album): album is { destination: string; coverImage: ImagePlaceholder; images: ImagePlaceholder[] } => album !== null);


  const videoAlbums: {
    destination: string;
    coverImage: ImagePlaceholder | undefined;
    videoUrl: string;
    title: string;
  }[] = [];

  // Group videos by destination
  tours.forEach(tour => {
    if (tour.videoUrl) {
      const thumbId = tour.image;
      const coverImage = PlaceHolderImages.find(p => p.id === thumbId);
      videoAlbums.push({
        destination: tour.destination,
        coverImage: coverImage,
        videoUrl: tour.videoUrl,
        title: tour.title,
      });
    }
  });

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
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-12">
            <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 block mt-16">Our Adventures</span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold leading-tight">Gallery</h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Explore moments captured from our incredible driving adventures around the world.
            </p>
          </div>
        </section>

        <section id="gallery-content" className="py-20 section-bg-subtle">
          <div className="container mx-auto px-4 max-w-7xl">
            <Tabs defaultValue="photos" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-slate-100 rounded-full p-1.5 h-auto">
                  <TabsTrigger
                    value="photos"
                    className="flex items-center gap-2 rounded-full px-8 py-2 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                  >
                    <ImageIcon className="w-5 h-5" />
                    Photo Albums
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="flex items-center gap-2 rounded-full px-8 py-2 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                  >
                    <Video className="w-5 h-5" />
                    Videos
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="photos">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold text-primary mb-2">Photo Albums</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Click on an album to view photos from our expeditions.</p>
                  </div>
                <PhotoGallery albums={photoAlbums} />
              </TabsContent>
              <TabsContent value="videos">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl font-headline font-bold text-primary mb-2">Driving Tour Videos</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Get a front-row seat to the action from our self-drive tours.</p>
                  </div>
                <VideoGallery albums={videoAlbums} />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="testimonials-section" className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <span className="text-accent font-bold tracking-widest text-xs uppercase mb-3 block">Traveler Stories</span>
                    <h2 className="text-4xl font-headline font-bold text-primary mb-4">What Our Adventurers Say</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Real experiences from real travelers</p>
                </div>
                <TestimonialsCarousel />
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
