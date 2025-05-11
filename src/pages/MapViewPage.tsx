
import { useState, useEffect } from "react";
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

// Mock data
import { mockAttractions } from "@/lib/mockData";

const MapViewPage = () => {
  const [activeAttraction, setActiveAttraction] = useState(mockAttractions[0]);

  return (
    <div className="container max-w-6xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Map View</h1>
          <p className="text-muted-foreground">
            Explore attractions from Tokyo Hidden Gems video
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
        {/* Attractions sidebar */}
        <Card className="lg:col-span-1 border shadow-sm overflow-hidden">
          <div className="p-3 border-b bg-muted/50">
            <h3 className="font-medium">Attractions</h3>
          </div>
          <ScrollArea className="h-[75vh] lg:h-[80vh]">
            <div className="p-3 space-y-3">
              {mockAttractions.map((attraction) => (
                <div 
                  key={attraction.id}
                  className={`
                    p-3 rounded-md border cursor-pointer transition-all
                    ${activeAttraction.id === attraction.id 
                      ? 'border-ocean bg-ocean-light shadow-sm' 
                      : 'hover:bg-muted/50'
                    }
                  `}
                  onClick={() => setActiveAttraction(attraction)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium truncate mr-2">{attraction.name}</h4>
                    <Badge 
                      className={`
                        text-xs shrink-0
                        ${attraction.category === 'Cultural' && 'bg-lavender hover:bg-lavender-dark text-white'} 
                        ${attraction.category === 'Landmark' && 'bg-ocean hover:bg-ocean-dark text-white'}
                        ${attraction.category === 'Restaurant' && 'bg-amber-500 hover:bg-amber-600 text-white'}
                        ${attraction.category === 'Nature' && 'bg-emerald-500 hover:bg-emerald-600 text-white'}
                      `}
                    >
                      {attraction.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {attraction.description.substring(0, 60)}...
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Map and details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border shadow-sm overflow-hidden">
            <CardContent className="p-0 h-[50vh]">
              <div className="relative h-full bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground opacity-80">
                  <MapPin className="h-10 w-10 mx-auto mb-2" />
                  <p>Interactive map will be shown here</p>
                  <p className="text-sm max-w-md mx-auto mt-2">
                    This is a mock placeholder. In a real implementation, a Mapbox
                    or Google Maps component would display the attraction locations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected attraction details */}
          <Card className="border shadow-sm overflow-hidden">
            <Tabs defaultValue="details">
              <div className="p-3 border-b bg-muted/50 flex justify-between items-center">
                <h3 className="font-medium">{activeAttraction.name}</h3>
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="timeline">Video</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="details" className="mt-0">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img 
                      src={activeAttraction.screenshot} 
                      alt={activeAttraction.name}
                      className="rounded-md h-48 w-full md:w-64 object-cover"
                    />
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold mb-1">{activeAttraction.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {activeAttraction.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          {activeAttraction.category}
                        </Badge>
                        <Badge variant="outline">
                          <Video className="h-3 w-3 mr-1" />
                          {activeAttraction.timestamp.formatted}
                        </Badge>
                      </div>
                      <div className="pt-2">
                        <Button size="sm" className="bg-ocean hover:bg-ocean-dark">
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              <TabsContent value="timeline" className="mt-0">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-full max-w-md">
                      <img 
                        src={activeAttraction.screenshot} 
                        alt={activeAttraction.name}
                        className="rounded-md w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button 
                          variant="outline" 
                          className="bg-black/70 text-white border-white/30 hover:bg-black/90"
                          onClick={() => window.open(`https://youtu.be/dQw4w9WgXcQ?t=${activeAttraction.timestamp.seconds}`, '_blank')}
                        >
                          <Video className="h-5 w-5 mr-2" />
                          Watch Video
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium text-lg">{activeAttraction.name}</h4>
                      <p className="text-muted-foreground text-sm mb-2">
                        Timestamp: {activeAttraction.timestamp.formatted}
                      </p>
                      <Button 
                        onClick={() => window.open(`https://youtu.be/dQw4w9WgXcQ?t=${activeAttraction.timestamp.seconds}`, '_blank')}
                        className="mt-2 bg-ocean hover:bg-ocean-dark"
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Jump to Timestamp
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;
