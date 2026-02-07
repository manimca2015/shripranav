
'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Stream from '@cloudflare/stream-react';

type VideoModalProps = {
  videoUrl: string;
  posterUrl?: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export default function VideoModal({
  videoUrl,
  posterUrl,
  isOpen,
  onClose,
  title = "Tour Video"
}: VideoModalProps) {
  if (!isOpen) {
    return null;
  }

  const videoId = videoUrl.match(/cloudflarestream\.com\/([a-f0-9]+)/)?.[1];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen bg-black/90 border-none p-0 flex items-center justify-center">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">A modal showing a video of the tour: {title}.</DialogDescription>
        <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 hover:text-white"
        >
            <X className="h-8 w-8" />
            <span className="sr-only">Close</span>
        </Button>
        
        <div className="relative w-[90vw] h-[85vh]">
             {videoId ? (
                <Stream
                    src={videoId}
                    poster={posterUrl}
                    className="w-full h-full"
                    controls
                    autoPlay
                />
             ) : (
                <video
                    controls
                    autoPlay
                    className="w-full h-full"
                    poster={posterUrl}
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
             )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
