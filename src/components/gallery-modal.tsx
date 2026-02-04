'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

type GalleryModalProps = {
  images: ImagePlaceholder[];
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
};

export default function GalleryModal({
  images,
  isOpen,
  onClose,
  startIndex = 0,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    if (isOpen && thumbnailContainerRef.current) {
        const activeThumbnail = thumbnailContainerRef.current.children[currentIndex] as HTMLElement;
        if(activeThumbnail) {
            activeThumbnail.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }
  }, [currentIndex, isOpen]);

  if (!isOpen) {
    return null;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen bg-black/90 border-none p-0 flex flex-col items-center justify-center">
        <DialogTitle className="sr-only">Image Gallery</DialogTitle>
        <DialogDescription className="sr-only">
            {currentImage?.description || 'A modal showing a larger version of a gallery image.'}
        </DialogDescription>
        <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 hover:text-white"
        >
            <X className="h-8 w-8" />
            <span className="sr-only">Close</span>
        </Button>
        
        <div className="relative w-full flex-1 flex items-center justify-center pt-16 pb-4">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 h-14 w-14 text-white hover:bg-white/20 hover:text-white"
            >
                <ChevronLeft className="h-10 w-10" />
                <span className="sr-only">Previous Image</span>
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 h-14 w-14 text-white hover:bg-white/20 hover:text-white"
            >
                <ChevronRight className="h-10 w-10" />
                <span className="sr-only">Next Image</span>
            </Button>
            
            <div className="relative w-[90vw] h-full">
                {currentImage && (
                     <Image
                        src={currentImage.imageUrl}
                        alt={currentImage.description}
                        fill
                        className="object-contain"
                        data-ai-hint={currentImage.imageHint}
                    />
                )}
            </div>
        </div>

        <div className="w-full max-w-[90vw] mx-auto h-[140px] flex items-center justify-center pb-4">
             <div ref={thumbnailContainerRef} className="flex gap-4 overflow-x-auto hide-scroll">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => setCurrentIndex(index)}
                        className="relative w-28 h-20 rounded-md overflow-hidden shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                    >
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                        />
                        <div className={cn(
                            "absolute inset-0 transition-all duration-300",
                            currentIndex === index ? 'border-2 border-white' : 'bg-black/50 hover:bg-black/20'
                        )} />
                    </button>
                ))}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
