
import { blogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, User } from 'lucide-react';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find((p) => p.id === post.image);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 pt-24">
        <article>
          <header className="relative h-[450px] flex items-center justify-center text-white">
             {postImage && (
              <Image
                src={postImage.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint={postImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-primary/70" />
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-headline font-extrabold leading-tight">{post.title}</h1>
                <div className="mt-6 flex justify-center items-center gap-6 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>By {post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                    </div>
                </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 max-w-3xl py-16">
            <div 
              className="max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
