
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Lock, MapPin, ArrowRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for trips
const mockTrips = [
  {
    id: "tokyo-trip",
    title: "Tokyo Hidden Gems",
    description: "Explore the lesser-known spots in Tokyo captured from a local's perspective",
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80",
    date: "2023-10-15",
    attractions: 8,
    duration: "10:25"
  },
  {
    id: "kyoto-trip",
    title: "Kyoto in Autumn",
    description: "Traditional temples and autumn foliage in Japan's cultural capital",
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80",
    date: "2023-09-27",
    attractions: 6,
    duration: "8:12"
  },
  {
    id: "osaka-trip",
    title: "Osaka Food Tour",
    description: "Street food adventures in Japan's kitchen - from takoyaki to okonomiyaki",
    thumbnail: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80",
    date: "2023-09-10",
    attractions: 5,
    duration: "7:45"
  },
  {
    id: "hokkaido-trip",
    title: "Hokkaido Winter Wonderland",
    description: "Snow festivals, hot springs and winter sports in Japan's northern island",
    thumbnail: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&q=80",
    date: "2023-01-15",
    attractions: 7,
    duration: "9:30",
    locked: true
  },
  {
    id: "okinawa-trip",
    title: "Okinawa Beaches",
    description: "Crystal clear waters and tropical vibes in Japan's southern paradise",
    thumbnail: "https://images.unsplash.com/photo-1524397057410-1e775ed476f3?auto=format&fit=crop&q=80",
    date: "2023-07-08",
    attractions: 6,
    duration: "6:20",
    locked: true
  }
];

const TripsPage = () => {
  const navigate = useNavigate();
  const [featuredTrip, ...otherTrips] = mockTrips;
  const [tripSource, setTripSource] = useState<"all" | "video" | "manual">("all");
  
  // In a real app, this would come from user authentication/subscription state
  const freeTripsLimit = 3;
  const userIsPremium = false;

  // Filter trips based on the selected source
  const filteredTrips = tripSource === "all" 
    ? otherTrips 
    : otherTrips.filter((_, index) => tripSource === "video" ? index % 2 === 0 : index % 2 === 1);
  
  return (
    <div className="container max-w-6xl space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Trips</h1>
          <p className="text-muted-foreground">
            Your travel itineraries
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate('/analyze')} 
          >
            <Video className="mr-2 h-4 w-4" />
            Video Analysis
          </Button>
          <Button 
            onClick={() => navigate('/trips/create')} 
            className="bg-ocean hover:bg-ocean-dark"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Trip
          </Button>
        </div>
      </div>
      
      {/* Featured/Latest Trip */}
      <div className="relative">
        <h2 className="text-xl font-semibold mb-4">Latest Trip</h2>
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
            <img 
              src={featuredTrip.thumbnail} 
              alt={featuredTrip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{featuredTrip.title}</h3>
              <p className="text-white/90 max-w-2xl mb-4">{featuredTrip.description}</p>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  <Video className="h-3 w-3 mr-1" /> {featuredTrip.duration}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  <MapPin className="h-3 w-3 mr-1" /> {featuredTrip.attractions} Locations
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  Added {featuredTrip.date}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="bg-lavender hover:bg-lavender-dark text-white"
                  onClick={() => navigate(`/itinerary`)}
                >
                  View Itinerary <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                  onClick={() => navigate(`/map`)}
                >
                  <MapPin className="mr-2 h-4 w-4" /> View on Map
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Trip List with Tabs */}
      <div className="space-y-5">
        <Tabs defaultValue="all" onValueChange={(v) => setTripSource(v as "all" | "video" | "manual")}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Trips</h2>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="video">From Videos</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherTrips.map((trip, index) => {
                const isLocked = !userIsPremium && index >= (freeTripsLimit - 1);
                return renderTripCard(trip, isLocked, navigate);
              })}
            </div>
          </TabsContent>

          <TabsContent value="video" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherTrips.filter((_, index) => index % 2 === 0).map((trip, index) => {
                const isLocked = !userIsPremium && index >= Math.floor(freeTripsLimit / 2);
                return renderTripCard(trip, isLocked, navigate);
              })}
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherTrips.filter((_, index) => index % 2 === 1).map((trip, index) => {
                const isLocked = !userIsPremium && index >= Math.floor(freeTripsLimit / 2);
                return renderTripCard(trip, isLocked, navigate);
              })}
            </div>
          </TabsContent>
        </Tabs>
        
        {!userIsPremium && (
          <Card className="bg-lavender/10 border-lavender/30 p-6 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-lavender-dark">Upgrade to Premium</h3>
                <p className="text-muted-foreground">Unlock unlimited trips and additional features</p>
              </div>
              <Button className="bg-lavender hover:bg-lavender-dark text-white">
                Get Premium
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// Helper function to render trip cards
const renderTripCard = (trip: any, isLocked: boolean, navigate: Function) => (
  <Card key={trip.id} className={`overflow-hidden border ${isLocked ? 'opacity-90' : ''}`}>
    <div className="relative">
      <img 
        src={trip.thumbnail} 
        alt={trip.title}
        className="h-48 w-full object-cover"
      />
      {isLocked && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <Lock className="h-8 w-8 text-white mb-2" />
          <span className="text-white font-medium">Premium Content</span>
        </div>
      )}
    </div>
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-2">{trip.title}</h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{trip.description}</p>
      <div className="flex justify-between items-end">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            <Video className="h-3 w-3 mr-1" /> {trip.duration}
          </Badge>
          <Badge variant="outline">
            <MapPin className="h-3 w-3 mr-1" /> {trip.attractions}
          </Badge>
        </div>
        
        {isLocked ? (
          <Button size="sm" className="bg-ocean hover:bg-ocean-dark">
            Unlock
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => navigate(`/itinerary`)}
            >
              View Trip
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/map`)}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export default TripsPage;
