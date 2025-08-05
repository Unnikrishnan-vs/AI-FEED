'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HelpingHand, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { matchFoodSupplyAndDemand } from '@/ai/flows/match-food-supply-and-demand';
import Image from 'next/image';

const requestSchema = z.object({
  need: z.string().min(3, 'Need must be at least 3 characters'),
  quantity: z.coerce.number().positive('Quantity must be a positive number'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

type RequestFormValues = z.infer<typeof requestSchema>;

type MatchResult = {
  status: 'success' | 'error';
  data?: {
    recipient: string; // The AI flow returns recipient name, we will adapt it to show donor name
    distance: string;
    notes: string;
  };
  message?: string;
};

export default function ReceivePage() {
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      need: 'Meals for 60 people',
      quantity: 60,
      location: 'Mumbai',
      latitude: 19.075,
      longitude: 72.87,
    },
  });

  async function onSubmit(data: RequestFormValues) {
    setIsLoading(true);
    setMatchResult(null);
    try {
      const result = await matchFoodSupplyAndDemand({
        recipientNeed: data.need,
        recipientLatitude: data.latitude,
        recipientLongitude: data.longitude,
        // Mock donor data for matching
        foodType: 'cooked meals',
        quantity: 50,
        donorLatitude: 19.076,
        donorLongitude: 72.8777,
      });

      if (result && result.match) {
        // The AI returns a 'recipient' field. We'll simulate it's a donor for this page's context.
        setMatchResult({
          status: 'success',
          data: { ...result.match, recipient: 'City Bistro' },
        });
      } else {
        throw new Error('No suitable match found.');
      }
    } catch (error) {
      console.error(error);
      setMatchResult({
        status: 'error',
        message: 'No match found. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <HelpingHand className="h-12 w-12 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline">
                Receive Food
              </CardTitle>
              <CardDescription>
                Fill out the form to request food and get matched with a donor.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="need"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Need</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Meals for 60 people" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity (servings)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 60" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Mumbai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input type="number" step="any" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input type="number" step="any" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                   </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Finding Match...
                      </>
                    ) : (
                      'Find Match'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="flex flex-col space-y-4 justify-center">
              {matchResult && (
                <Alert
                  variant={
                    matchResult.status === 'success'
                      ? 'default'
                      : 'destructive'
                  }
                  className={matchResult.status === 'success' ? "bg-green-100 border-green-400" : ""}
                >
                  {matchResult.status === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle className="font-bold">
                    {matchResult.status === 'success'
                      ? 'Match Found!'
                      : 'Match Not Found'}
                  </AlertTitle>
                  <AlertDescription>
                    {matchResult.status === 'success' && matchResult.data ? (
                      <>
                        Matched with <strong>{matchResult.data.recipient}</strong>! ({matchResult.data.distance} away).
                        <p className="mt-2 text-xs">{matchResult.data.notes}</p>
                      </>
                    ) : (
                      matchResult.message
                    )}
                  </AlertDescription>
                </Alert>
              )}
              <div className="rounded-lg overflow-hidden border p-1">
                <div className="flex items-center gap-2 text-sm p-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Recipient's Location</span>
                </div>
                <Image
                  src="https://placehold.co/300x200.png"
                  width={300}
                  height={200}
                  alt="Recipient location map"
                  className="w-full h-auto"
                  data-ai-hint="map recipient location"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
