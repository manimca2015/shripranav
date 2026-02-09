
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import VideoModal from '@/components/video-modal';
import { VideoIcon } from 'lucide-react';

type Video = {
  id: string;
  title: string;
  coverImage: ImagePlaceholder | undefined;
};

type Album = {
  destination: string;
  coverImage: ImagePlaceholder;
  videos: Video[];
};

type VideoGalleryProps = {
  albums: Album[];
};

export default function VideoGallery({ albums }: VideoGalleryProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Video[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shuffledAlbums, setShuffledAlbums] = useState(albums);

  useEffect(() => {
    // Shuffle albums on client-side to avoid hydration mismatch
    setShuffledAlbums([...albums].sort(() => Math.random() - 0.5));
  }, [albums]);


  const openModal = (videos: Video[]) => {
    setSelectedAlbum(videos);
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
            onClick={() => openModal(album.videos)}
            className="group block text-left"
          >
            <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full">
              <div className="relative h-64">
                {album.coverImage ? (
                   <Image
                    src={album.coverImage.imageUrl}
                    alt={album.destination}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint={album.coverImage.imageHint}
                  />
                ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                        <VideoIcon className="w-16 h-16 text-slate-400"/>
                    </div>
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-headline font-bold text-white">{album.destination}</h3>
                    <div className="flex items-center text-xs text-white/80 mt-1">
                        <VideoIcon className="w-4 h-4 mr-2" />
                        <span>{album.videos.length} Videos</span>
                    </div>
                </div>
              </div>
            </Card>
          </button>
        ))}
      </div>
      {selectedAlbum && (
        <VideoModal
          videos={selectedAlbum}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}
