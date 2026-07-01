
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { productDetails } from '@/lib/product-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function ProductsListingPage() {
  const qualityImg = PlaceHolderImages.find(i => i.id === 'quality-standards');

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 bg-primary text-white overflow-hidden">
        <div className="textile-pattern absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            Our Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Textile <span className="text-secondary">Excellence</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore our diverse range of high-quality textile products, manufactured with precision and care for global brands since 1995.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-bold">Products</span>
          </nav>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {productDetails.map((product) => {
              const img = PlaceHolderImages.find(i => i.id === product.imageId);
              return (
                <Card key={product.id} className="group border-none shadow-xl hover:shadow-2xl smooth-transition rounded-[40px] overflow-hidden bg-white">
                  <div className="relative h-80 overflow-hidden">
                    {img && (
                      <Image
                        src={img.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 smooth-transition"
                        data-ai-hint={img.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm">
                      {product.specs[0].value.split(',')[0]}
                    </div>
                  </div>
                  <CardContent className="p-10">
                    <h3 className="text-3xl font-black text-primary mb-4 group-hover:text-secondary smooth-transition">
                      {product.title}
                    </h3>
                    <p className="text-slate-600 mb-8 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="space-y-3 mb-10">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild className="w-full rounded-full bg-slate-900 hover:bg-secondary text-white h-14 font-bold group/btn">
                      <Link href={`/products/${product.slug}`} className="flex items-center justify-center gap-2">
                        View Category Details <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 smooth-transition" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Banner */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="textile-pattern absolute inset-0 opacity-10" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">Uncompromising Quality Standards</h2>
                <p className="text-xl text-white/70 mb-10 leading-relaxed">
                  Every product in our portfolio undergoes rigorous quality checks and adheres to international safety and sustainability certifications.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center font-bold">ISO</div>
                    <span className="font-bold">9001:2015</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center font-bold">OEKO</div>
                    <span className="font-bold">TEX Standard</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl">
                {qualityImg && (
                  <Image
                    src={qualityImg.imageUrl}
                    alt="Quality Assurance"
                    fill
                    className="object-cover"
                    data-ai-hint={qualityImg.imageHint}
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-8">Ready to Start a Project?</h2>
          <p className="text-xl text-slate-600 mb-12">
            Get in touch for bulk inquiries, custom product development, or to learn more about our manufacturing capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-secondary hover:bg-primary text-white h-16 px-12 font-bold text-lg">
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white h-16 px-12 font-bold text-lg">
              <Link href="/factory">Factory Infrastructure</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
