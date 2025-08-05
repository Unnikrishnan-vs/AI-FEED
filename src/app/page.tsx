import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <UtensilsCrossed className="w-20 h-20 mx-auto text-primary" />
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground mt-6" style={{ maxWidth: '24ch', margin: '1.5rem auto' }}>
          End Hunger with AI-FEED
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect surplus food with those in need using AI
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="font-bold text-lg py-6 px-8">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
