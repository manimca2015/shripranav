
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import GalleryModal from '@/components/gallery-modal';
import { ImageIcon } from 'lucide-react';

type PhotoGalleryProps = {
  albums: {
    destination: string;
    coverImage: ImagePlaceholder;
    images: ImagePlaceholder[];
  }[];
};

export default function PhotoGallery({ albums }: PhotoGalleryProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<ImagePlaceholder[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shuffledAlbums, setShuffledAlbums] = useState(albums);

  useEffect(() => {
    // Shuffle albums on client-side to avoid hydration mismatch
    setShuffledAlbums([...albums].sort(() => Math.random() - 0.5));
  }, [albums]);

  const openModal = (images: ImagePlaceholder[]) => {
    setSelectedAlbum(images);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAlbum(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {shuffledAlbums.map((album) => (
          <button
            key={album.destination}
            onClick={() => openModal(album.images)}
            className="group block text-left"
          >
            <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full">
              <div className="relative h-64">
                <Image
                  src={album.coverImage.imageUrl}
                  alt={album.coverImage.description}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={album.coverImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-headline font-bold text-white">{album.destination}</h3>
                  <div className="flex items-center text-xs text-white/80 mt-1">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    <span>{album.images.length} Photos</span>
                  </div>
                </div>
              </div>
            </Card>
          </button>
        ))}
      </div>
      {selectedAlbum && (
        <GalleryModal
          images={selectedAlbum}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}
