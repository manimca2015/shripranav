'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const products = [
  { id: 'prod-tote', slug: 'tote-bags', title: 'Tote Bags', desc: 'Sustainable & stylish eco-friendly bags.' },
  { id: 'prod-linen', slug: 'bed-linen', title: 'Bed Linen', desc: 'Premium luxury comfort for a restful sleep.' },
  { id: 'prod-cushion', slug: 'cushion-covers', title: 'Cushion Covers', desc: 'Elegant designs to uplift your interiors.' },
  { id: 'prod-table', slug: 'table-bath', title: 'Table & Bath', desc: 'Soft textures for your lifestyle needs.' },
  { id: 'prod-baby', slug: 'baby-garments', title: 'Baby Garments', desc: 'Gently crafted organic cotton wear.' },
  { id: 'prod-girls', slug: 'girls-collection', title: 'Girls\' Collection', desc: 'Trendy & comfortable fashion for girls.' },
  { id: 'prod-boys', slug: 'boys-collection', title: 'Boys\' Collection', desc: 'Durable & cool outfits for active boys.' },
  { id: 'prod-gents', slug: 'gents-shirts', title: 'Gents\' Shirts', desc: 'Sophisticated formal and casual wear.' },
];

export function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className={cn("text-center mb-16 max-w-3xl mx-auto transition-all duration-1000", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Our Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Product Categories</h2>
          <p className="text-slate-600">
            Explore our diverse range of high-quality textile products, manufactured with precision and care for global brands.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((prod, index) => {
            const img = PlaceHolderImages.find(i => i.id === prod.id);
            return (
              <Card 
                key={prod.id} 
                className={cn(
                  "group overflow-hidden rounded-3xl border-none shadow-lg hover:shadow-2xl transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-72 overflow-hidden">
                  {img && (
                    <Image
                      src={img.imageUrl}
                      alt={prod.title}
                      fill
                      className="object-cover group-hover:scale-110 smooth-transition"
                      data-ai-hint={img.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end p-6">
                    <Button asChild className="w-full bg-secondary text-white rounded-full font-bold">
                      <Link href={`/products/${prod.slug}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-primary mb-2">{prod.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{prod.desc}</p>
                  <Link href={`/products/${prod.slug}`} className="inline-flex items-center gap-2 text-secondary font-bold text-sm hover:gap-3 smooth-transition">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
