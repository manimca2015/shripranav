
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function BlogPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'blog-hero');

  return (
    <div className="bg-background">
      <Header />
      <main>
        <section className="relative h-[400px] flex items-center justify-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 block mt-16">Our Journal</span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold leading-tight">The Fair Future Blog</h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Stories, tips, and inspiration from our world of driving adventures.
            </p>
          </div>
        </section>

        <section className="py-20 section-bg-subtle">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {blogPosts.map((post) => {
                const image = PlaceHolderImages.find(p => p.id === post.image);
                return (
                  <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
                    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {image && (
                        <div className="relative h-64">
                          <Image
                            src={image.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            data-ai-hint={image.imageHint}
                          />
                        </div>
                      )}
                      <CardContent className="p-6 bg-white flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-headline font-bold text-primary mb-3">{post.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">{post.description}</p>
                        <div className="flex justify-end">
                          <span className="text-sm font-bold text-accent group-hover:underline flex items-center gap-2">
                            Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
