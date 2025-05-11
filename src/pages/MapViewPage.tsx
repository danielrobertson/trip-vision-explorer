
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  MapPin, 
  ArrowRight,
  ArrowLeft 
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttractionCard from "@/components/attractions/AttractionCard";

// Mock data
import { mockAttractions } from "@/lib/mockData";

// Mock trips data
const mockTrips = [
  {
    id: 'trip1',
    title: 'Tokyo Hidden Gems',
    date: '2025-04-10',
    thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    attractions: mockAttractions.slice(0, 3)
  },
  {
    id: 'trip2',
    title: 'Kyoto Temples Tour',
    date: '2025-03-22',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    attractions: mockAttractions.slice(2, 5)
  },
  {
    id: 'trip3',
    title: 'Osaka Food Adventure',
    date: '2025-02-15',
    thumbnail: 'https://images.unsplash.com/photo-1493997181344-712f2f19d87a',
    attractions: mockAttractions.slice(1, 4)
  }
];

const MapViewPage = () => {
  const [selectedTrip, setSelectedTrip] = useState(mockTrips[0]);

  return (
    <div className="container max-w-6xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Map View</h1>
          <p className="text-muted-foreground">
            Explore attractions from your analyzed videos
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trips sidebar */}
        <Card className="lg:col-span-1 border shadow-sm overflow-hidden">
          <div className="p-3 border-b bg-muted/50">
            <h3 className="font-medium">Your Trips</h3>
          </div>
          <ScrollArea className="h-[75vh] lg:h-[45vh]">
            <div className="p-3 space-y-3">
              {mockTrips.map((trip) => (
                <div 
                  key={trip.id}
                  className={`
                    p-3 rounded-md border cursor-pointer transition-all
                    ${selectedTrip.id === trip.id 
                      ? 'border-ocean bg-ocean-light shadow-sm' 
                      : 'hover:bg-muted/50'
                    }
                  `}
                  onClick={() => setSelectedTrip(trip)}
                >
                  <div className="flex gap-3 items-center">
                    <img 
                      src={trip.thumbnail} 
                      alt={trip.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium">{trip.title}</h4>
                      <p className="text-xs text-muted-foreground">{trip.date}</p>
                      <Badge className="mt-1 bg-ocean hover:bg-ocean-dark text-xs">
                        {trip.attractions.length} attractions
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Map and attraction details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map card */}
          <Card className="border shadow-sm overflow-hidden">
            <div className="p-3 border-b bg-muted/50 flex justify-between items-center">
              <h3 className="font-medium">{selectedTrip.title} - Map View</h3>
              <Badge className="bg-ocean">
                {selectedTrip.attractions.length} locations
              </Badge>
            </div>
            <CardContent className="p-0 h-[45vh]">
              <div className="relative h-full bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground opacity-80">
                  <MapPin className="h-10 w-10 mx-auto mb-2" />
                  <p>Interactive map will be shown here</p>
                  <p className="text-sm max-w-md mx-auto mt-2">
                    This is a mock placeholder. In a real implementation, a Mapbox
                    or Google Maps component would display all attractions from "{selectedTrip.title}".
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attraction cards */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">Attractions in {selectedTrip.title}</h3>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTrip.attractions.map((attraction) => (
                <AttractionCard 
                  key={attraction.id} 
                  attraction={attraction} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;
