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
            <div className="rounded-lg overflow-hidden border p-4 bg-gradient-to-br from-blue-50 to-green-50">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
                    <div>
                      <p className="font-medium text-sm">Pickup Location</p>
                      <p className="text-xs text-muted-foreground">City Bistro, Mumbai</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">10:30 AM</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">B</div>
                    <div>
                      <p className="font-medium text-sm">Delivery Location</p>
                      <p className="text-xs text-muted-foreground">Hope Shelter, Mumbai</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">11:15 AM</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-lg font-bold text-blue-600">2.5km</p>
                    <p className="text-xs text-muted-foreground">Distance</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <p className="text-lg font-bold text-green-600">45min</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">Status: In Transit</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Driver: Rajesh Kumar | Vehicle: MH-01-AB-1234</p>
                </div>
              </div>
            </div>
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
