
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type TestimonialModalProps = {
  isOpen: boolean;
  onClose: () => void;
  testimonial: Testimonial;
};

const getFallback = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`;
    }
    return name.substring(0, 2);
}

export function TestimonialModal({ isOpen, onClose, testimonial }: TestimonialModalProps) {
  const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            {avatar && (
              <Avatar className="w-16 h-16">
                <AvatarImage src={avatar.imageUrl} alt={testimonial.author} />
                <AvatarFallback>{getFallback(testimonial.author)}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <DialogTitle className="text-xl">{testimonial.author}</DialogTitle>
              <DialogDescription>{testimonial.authorTitle}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto">
          <div className="flex text-yellow-400 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} fill="currentColor" size={20} className={i < testimonial.rating ? 'text-yellow-400' : 'text-slate-300'}/>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {testimonial.text}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
