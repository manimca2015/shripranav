import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center bg-slate-50 py-20 px-4">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg text-center max-w-lg mx-auto border border-slate-200">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">
            Thank You!
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Your submission has been received. Our team will get in touch with you shortly.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground rounded-full px-8">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
