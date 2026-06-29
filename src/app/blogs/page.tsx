'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { blogPosts } from '@/lib/blog-data';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 bg-primary text-white overflow-hidden">
        <div className="textile-pattern absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            Our Journal
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Insights & <span className="text-secondary">Innovation</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Stay updated with the latest trends in sustainable manufacturing, textile technology, and our journey of excellence.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content */}
            <div className="lg:w-full">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => {
                  const img = PlaceHolderImages.find(i => i.id === post.image);
                  return (
                    <Card key={post.slug} className="group border-none shadow-lg hover:shadow-2xl smooth-transition rounded-[32px] overflow-hidden bg-white">
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
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black text-primary mb-6">Never Miss an Update</h2>
          <p className="text-slate-600 mb-10 text-lg">Subscribe to our newsletter and get the latest industry news and company updates directly in your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="rounded-full h-14 px-8 border-slate-200 focus:ring-secondary"
            />
            <Button className="bg-secondary hover:bg-primary text-white font-bold h-14 rounded-full px-10 transition-all">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
