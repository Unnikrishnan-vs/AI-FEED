import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Leaf, TrendingUp, MapPin, Trophy, User } from 'lucide-react';
import Image from 'next/image';

const dashboardData = {
  badges: [{ name: 'Zero-Waste Hero', amount: '50kg' }],
  leaderboard: [
    { rank: 1, donor: 'City Bistro', amount: '50kg' },
    { rank: 2, donor: 'Green Hotel', amount: '45kg' },
    { rank: 3, donor: 'The Grand Eatery', amount: '32kg' },
    { rank: 4, donor: 'Corner Cafe', amount: '25kg' },
    { rank: 5, donor: 'Daily Bread', amount: '20kg' },
  ],
  metrics: {
    donated: '10kg',
    co2Saved: '5kg',
    mealsProvided: 20,
  },
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-8 h-8 text-primary"/>
        <h1 className="text-3xl font-bold font-headline">Your Dashboard</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Metrics */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary" /> Your Impact This Week
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <Card className="p-4">
              <p className="text-2xl font-bold">{dashboardData.metrics.donated}</p>
              <p className="text-sm text-muted-foreground">Food Donated</p>
            </Card>
            <Card className="p-4">
              <p className="text-2xl font-bold">{dashboardData.metrics.co2Saved}</p>
              <p className="text-sm text-muted-foreground">CO2 Saved</p>
            </Card>
            <Card className="p-4">
              <p className="text-2xl font-bold">{dashboardData.metrics.mealsProvided}</p>
              <p className="text-sm text-muted-foreground">Meals Provided</p>
            </Card>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="text-primary" /> Your Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.badges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-accent/20"
              >
                <Leaf className="w-16 h-16 text-accent" />
                <p className="font-bold text-lg mt-2">{badge.name}</p>
                <Badge variant="secondary" className="mt-1">
                  You donated {badge.amount}!
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Delivery Route Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="text-primary" /> Recent Delivery Route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden border">
              <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Delivery route map"
                className="w-full h-auto"
                data-ai-hint="map delivery route"
              />
            </div>
             <CardDescription className="text-center mt-2">
                City Bistro to Hope Shelter
             </CardDescription>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="text-primary" /> Leaderboard
            </CardTitle>
            <CardDescription>Top donors on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.leaderboard.map((entry) => (
                  <TableRow key={entry.rank}>
                    <TableCell className="font-medium text-center">{entry.rank}</TableCell>
                    <TableCell>{entry.donor}</TableCell>
                    <TableCell className="text-right">{entry.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
