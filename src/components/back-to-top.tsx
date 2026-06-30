'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={cn(
        'fixed bottom-8 right-8 z-50 transition-all duration-300 transform',
        /* 
           Using scrollbar-gutter: stable on html helps, but we also ensure 
           transitions here don't fight with Radix UI body adjustments.
        */
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      )}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="w-12 h-12 rounded-full bg-secondary hover:bg-primary text-white shadow-2xl transition-all hover:-translate-y-1 active:scale-95 border-none"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </div>
  );
}
