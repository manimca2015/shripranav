'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { blogPosts } from '@/lib/blog-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center py-48 text-center px-4">
          <h1 className="text-6xl font-black text-primary mb-4">404</h1>
          <p className="text-xl text-slate-600 mb-8">Article not found.</p>
          <Button asChild className="rounded-full bg-secondary">
            <Link href="/blogs">Back to Journal</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const img = PlaceHolderImages.find(i => i.id === post.image);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Article Hero */}
      <section className="relative pt-48 pb-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-secondary font-bold mb-8 hover:gap-3 smooth-transition uppercase tracking-widest text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to journal
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight mb-8">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold">{post.author}</p>
                  <p className="text-xs">Author</p>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-[40px] overflow-hidden mb-16 shadow-2xl">
              {img && (
                <Image
                  src={img.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint={img.imageHint}
                />
              )}
            </div>
            
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-8">
              <p className="text-2xl font-medium text-slate-900 leading-snug">
                {post.description}
              </p>
              <div className="h-px bg-slate-100 w-full my-12" />
              <p>{post.content}</p>
              <p>
                As we look towards the future of textile manufacturing, Shri Pranav continues to lead the way with investments in water-recycling technologies and worker-centric management models. Our commitment to sustainability isn't just about the environment; it's about building a resilient ecosystem where every thread tells a story of integrity and care.
              </p>
              <h2 className="text-3xl font-black text-primary mt-12 mb-6">Innovation is at Our Core</h2>
              <p>
                By integrating AI-driven quality checks and solar-powered weaving units, we ensure that our products meet the highest global standards while maintaining a minimal carbon footprint. This balance of technology and craftsmanship is what sets Shri Pranav apart in a competitive global market.
              </p>
            </div>

            {/* Share & Tags */}
            <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <span className="font-bold text-primary">Share:</span>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                    <button key={i} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-secondary hover:text-white smooth-transition">
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
              <Button asChild className="rounded-full bg-primary hover:bg-secondary">
                <Link href="/blogs">Discover More Articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
