
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { blogPosts } from '@/lib/blog-data';
import { Calendar, User, ArrowRight } from 'lucide-react';

export function Blog() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Insights</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">
              Our Latest <span className="text-secondary">Articles</span>
            </h2>
          </div>
          <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white smooth-transition">
            <Link href="/blogs">View All Articles</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const img = PlaceHolderImages.find(i => i.id === post.image);
            return (
              <Card key={post.slug} className="group border-none shadow-lg hover:shadow-2xl smooth-transition rounded-[32px] overflow-hidden bg-slate-50">
                <div className="relative h-64 overflow-hidden">
                  {img && (
                    <Image
                      src={img.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 smooth-transition"
                      data-ai-hint={img.imageHint}
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {post.date}
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3 h-3 text-secondary" /> {post.author}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-secondary" /> Industry News
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary smooth-transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                    {post.description}
                  </p>
                  <Link 
                    href={`/blogs/${post.slug}`} 
                    className="inline-flex items-center gap-2 text-secondary font-black text-sm uppercase tracking-wider hover:gap-3 smooth-transition"
                  >
                    Read Full Story <ArrowRight className="w-4 h-4" />
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
