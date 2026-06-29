'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { productDetails } from '@/lib/product-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft, Send, ShieldCheck, Zap, Leaf } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  
  const product = productDetails.find(p => p.slug === slug || p.id === slug);
  
  if (!product) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center py-48 text-center px-4">
          <h1 className="text-6xl font-black text-primary mb-4">404</h1>
          <p className="text-xl text-slate-600 mb-8">Category not found.</p>
          <Button asChild className="rounded-full bg-secondary">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const img = PlaceHolderImages.find(i => i.id === product.imageId);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Product Hero */}
      <section className="relative pt-48 pb-24 bg-primary text-white overflow-hidden">
        <div className="textile-pattern absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-secondary font-bold mb-8 hover:gap-3 smooth-transition uppercase tracking-widest text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to portfolio
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              {product.title}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </section>

      {/* Product Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
                {img && (
                  <Image
                    src={img.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                    data-ai-hint={img.imageHint}
                    priority
                  />
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[ShieldCheck, Leaf, Zap].map((Icon, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-3xl text-center flex flex-col items-center gap-3">
                    <Icon className="w-8 h-8 text-secondary" />
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                      {i === 0 ? 'Quality' : i === 1 ? 'Eco-Friendly' : 'Durability'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-black text-primary mb-6">Overview</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-6">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <CheckCircle2 className="text-secondary w-5 h-5 shrink-0" />
                      <span className="font-bold text-sm text-primary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-6">Technical Specifications</h3>
                <div className="space-y-3">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="text-primary font-black">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Button className="w-full sm:w-auto rounded-full bg-secondary hover:bg-primary text-white px-12 h-16 font-bold text-lg smooth-transition flex items-center gap-3">
                  Request Bulk Quote <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Banner */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="textile-pattern absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl font-black mb-8">Manufactured for Excellence</h2>
          <p className="text-xl text-white/60 mb-12">
            Every {product.title.toLowerCase()} is produced in our integrated Karur facility, ensuring complete transparency and unmatched quality control.
          </p>
          <Button asChild variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-primary h-14 px-10 font-bold bg-transparent">
            <Link href="/factory">See Our Manufacturing</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
