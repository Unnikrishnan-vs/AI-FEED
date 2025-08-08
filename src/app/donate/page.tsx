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
import { HeartHandshake, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { matchFoodSupplyAndDemand } from '@/ai/flows/match-food-supply-and-demand';
import Image from 'next/image';

const donationSchema = z.object({
  foodType: z.string().min(3, 'Food type must be at least 3 characters'),
  quantity: z.coerce.number().positive('Quantity must be a positive number'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  donorLatitude: z.coerce.number().min(-90).max(90),
  donorLongitude: z.coerce.number().min(-180).max(180),
});

type DonationFormValues = z.infer<typeof donationSchema>;

type MatchResult = {
  status: 'success' | 'error';
  data?: {
    recipient: string;
    distance: string;
    notes: string;
  };
  message?: string;
};

export default function DonatePage() {
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      foodType: 'Cooked Meals',
      quantity: 50,
      location: 'Mumbai',
      donorLatitude: 19.076,
      donorLongitude: 72.8777,
    },
  });

  async function onSubmit(data: DonationFormValues) {
    setIsLoading(true);
    setMatchResult(null);
    try {
      const result = await matchFoodSupplyAndDemand({
        ...data,
        recipientNeed: 'meals for 60 people',
        recipientLatitude: 19.075,
        recipientLongitude: 72.87,
      });

      if (result && result.match) {
        setMatchResult({ status: 'success', data: result.match });
      } else {
        throw new Error('No suitable match found.');
      }
    } catch (error) {
      console.error('Donation matching error:', error);
      setMatchResult({
        status: 'error',
        message: 'Unable to find a match at this time. Please try again later.',
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
            <HeartHandshake className="h-12 w-12 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline">
                Donate Food
              </CardTitle>
              <CardDescription>
                Share your surplus food with those in need. Our AI will help match you with the right recipients.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="foodType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Cooked Meals, Bread, Vegetables" {...field} />
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
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 50 servings" {...field} />
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
                          <Input placeholder="e.g., Mumbai, Maharashtra" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="donorLatitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input type="number" step="any" placeholder="19.076" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="donorLongitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input type="number" step="any" placeholder="72.8777" {...field} />
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
                      'Find Recipients'
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
              <div className="rounded-lg overflow-hidden border p-4 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="flex items-center gap-2 text-sm p-2 text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Donation Information</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Active Donors</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">127</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">This Week</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">45kg</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium">Total Impact</span>
                    </div>
                    <span className="text-lg font-bold text-orange-600">2.3k</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">💡 Donation Tips</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Ensure food is properly packaged</li>
                    <li>• Include expiration dates</li>
                    <li>• Specify dietary restrictions</li>
                    <li>• Update location for better matching</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
