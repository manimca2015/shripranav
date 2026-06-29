'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const products = [
  { id: 'prod-tote', title: 'Tote Bags', desc: 'Sustainable & stylish eco-friendly bags.' },
  { id: 'prod-linen', title: 'Bed Linen', desc: 'Premium luxury comfort for a restful sleep.' },
  { id: 'prod-cushion', title: 'Cushion Covers', desc: 'Elegant designs to uplift your interiors.' },
  { id: 'prod-table', title: 'Table & Bath', desc: 'Soft textures for your lifestyle needs.' },
  { id: 'prod-baby', title: 'Baby Garments', desc: 'Gently crafted organic cotton wear.' },
  { id: 'prod-girls', title: 'Girls\' Collection', desc: 'Trendy & comfortable fashion for girls.' },
  { id: 'prod-boys', title: 'Boys\' Collection', desc: 'Durable & cool outfits for active boys.' },
  { id: 'prod-gents', title: 'Gents\' Shirts', desc: 'Sophisticated formal and casual wear.' },
];

export function Products() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Our Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Product Categories</h2>
          <p className="text-slate-600">
            Explore our diverse range of high-quality textile products, manufactured with precision and care for global brands.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((prod) => {
            const img = PlaceHolderImages.find(i => i.id === prod.id);
            return (
              <Card key={prod.id} className="group overflow-hidden rounded-3xl border-none shadow-lg hover:shadow-2xl smooth-transition">
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
                      <Link href={`/products/${prod.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-primary mb-2">{prod.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{prod.desc}</p>
                  <Link href={`/products/${prod.id}`} className="inline-flex items-center gap-2 text-secondary font-bold text-sm hover:gap-3 smooth-transition">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="rounded-full bg-primary hover:bg-secondary text-white px-10 font-bold smooth-transition">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
}