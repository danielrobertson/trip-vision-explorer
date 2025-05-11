
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { 
  Clock, 
  MapPin, 
  ArrowLeft, 
  GalleryHorizontal,
  Video,
  ArrowDown,
  Share,
  ExternalLink,
  Link 
} from "lucide-react";

// Mock data
import { mockAttractions } from "@/lib/mockData";
import { AttractionType } from "@/types";

const ItineraryPage = () => {
  const [viewType, setViewType] = useState<'timeline' | 'day'>('timeline');

  const exportToGoogleMaps = () => {
    // Create a Google Maps URL with all attractions
    const baseUrl = "https://www.google.com/maps/dir/?api=1";
    const origin = encodeURIComponent(mockAttractions[0].name);
    const destination = encodeURIComponent(mockAttractions[mockAttractions.length - 1].name);
    
    // Create waypoints from all attractions except first and last
    const waypoints = mockAttractions
      .slice(1, -1)
      .map(attr => encodeURIComponent(attr.name))
      .join('|');
    
    // Build the URL
    let googleMapsUrl = `${baseUrl}&origin=${origin}&destination=${destination}`;
    if (waypoints) {
      googleMapsUrl += `&waypoints=${waypoints}`;
    }
    
    // Open in new tab
    window.open(googleMapsUrl, '_blank');
    
    toast("Trip exported to Google Maps", {
      description: "The trip has been opened in a new tab with all locations as pins.",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Toast dismissed"),
      },
    });
  };

  const createGoogleMapsList = () => {
    // Create a CSV with all attractions for import into Google Maps
    const csvContent = [
      "name,description,latitude,longitude",
      ...mockAttractions.map(attr => {
        const lat = attr.coordinates?.lat || 0;
        const lng = attr.coordinates?.lng || 0;
        return `"${attr.name}","${attr.description}",${lat},${lng}`;
      })
    ].join('\n');
    
    // Create a blob and download it
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tripTrace-locations.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast("Trip locations exported", {
      description: "CSV file downloaded. You can import this into Google Maps or other mapping apps.",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Toast dismissed"),
      },
    });
  };

  const shareDirectLink = () => {
    // Create a shareable link
    const shareUrl = window.location.href;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast("Link copied to clipboard", {
        description: "Share this link to let others view this trip.",
      });
    }).catch(() => {
      toast("Failed to copy link", {
        description: "Please try copying the URL manually.",
      });
    });
  };

  return (
    <div className="container max-w-6xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Itinerary</h1>
          <p className="text-muted-foreground">
            Tokyo Hidden Gems - Travel Plan
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button>
            <GalleryHorizontal className="mr-2 h-4 w-4" />
            Save Itinerary
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white hover:bg-gray-100"
          onClick={exportToGoogleMaps}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Open in Google Maps
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white hover:bg-gray-100"
          onClick={createGoogleMapsList}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Export Locations (CSV)
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white hover:bg-gray-100"
          onClick={shareDirectLink}
        >
          <Link className="mr-2 h-4 w-4" />
          Copy Link
        </Button>
      </div>

      <Tabs 
        defaultValue="timeline" 
        className="w-full"
        onValueChange={(value) => setViewType(value as 'timeline' | 'day')}
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="day">Day Planner</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" onClick={() => window.location.href = '/map'}>
            <MapPin className="mr-2 h-4 w-4" />
            View on Map
          </Button>
        </div>

        <TabsContent value="timeline" className="mt-0">
          <TimelineView attractions={mockAttractions} />
        </TabsContent>
        
        <TabsContent value="day" className="mt-0">
          <DayPlannerView attractions={mockAttractions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const TimelineView = ({ attractions }: { attractions: AttractionType[] }) => {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-lavender-light"></div>
      
      <div className="space-y-6">
        {attractions.map((attraction, index) => (
          <div key={attraction.id} className="flex">
            <div className="mr-8 relative">
              <div className="w-16 h-16 flex items-center justify-center z-10 relative">
                <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{index + 1}</span>
                </div>
              </div>
            </div>
            
            <Card className="flex-1 border shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <img 
                    src={attraction.screenshot} 
                    alt={attraction.name}
                    className="h-48 md:h-full w-full object-cover"
                  />
                  <Badge 
                    className={`
                      absolute top-2 left-2
                      ${attraction.category === 'Cultural' && 'bg-lavender hover:bg-lavender-dark text-white'} 
                      ${attraction.category === 'Landmark' && 'bg-ocean hover:bg-ocean-dark text-white'}
                      ${attraction.category === 'Restaurant' && 'bg-amber-500 hover:bg-amber-600 text-white'}
                      ${attraction.category === 'Nature' && 'bg-emerald-500 hover:bg-emerald-600 text-white'}
                    `}
                  >
                    {attraction.category}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute bottom-2 right-2 bg-white hover:bg-gray-100"
                    onClick={() => window.open(`https://youtu.be/dQw4w9WgXcQ?t=${attraction.timestamp.seconds}`, '_blank')}
                  >
                    <Clock className="h-4 w-4 mr-1" /> {attraction.timestamp.formatted}
                  </Button>
                </div>
                
                <CardContent className="p-4 md:w-2/3">
                  <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                  <p className="text-muted-foreground mb-4">{attraction.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      <MapPin className="h-3 w-3 mr-1" />
                      {attraction.location}
                    </Badge>
                    
                    <Badge variant="outline">
                      <Video className="h-3 w-3 mr-1" />
                      Watch in video
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`https://youtu.be/dQw4w9WgXcQ?t=${attraction.timestamp.seconds}`, '_blank')}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Watch Clip
                    </Button>
                    <Button size="sm" className="bg-ocean hover:bg-ocean-dark">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const DayPlannerView = ({ attractions }: { attractions: AttractionType[] }) => {
  // Split attractions into days (mock implementation)
  const day1 = attractions.slice(0, 4);
  const day2 = attractions.slice(4);

  return (
    <div className="space-y-8">
      <DayCard day={1} attractions={day1} />
      <DayCard day={2} attractions={day2} />
    </div>
  );
};

const DayCard = ({ day, attractions }: { day: number, attractions: AttractionType[] }) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <Card className="border shadow-sm overflow-hidden">
      <div 
        className="p-4 border-b bg-muted/30 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-bold text-lg">Day {day}</h3>
        <Button variant="ghost" size="sm">
          <ArrowDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      
      {expanded && (
        <CardContent className="p-4">
          <div className="space-y-4">
            {attractions.map((attraction, index) => (
              <div key={attraction.id} className="flex gap-4 p-3 rounded-md border">
                <div className="shrink-0 w-12 h-12 bg-lavender-light rounded-full flex items-center justify-center">
                  <span className="font-medium">{index + 1}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img 
                      src={attraction.screenshot} 
                      alt={attraction.name}
                      className="h-32 md:w-48 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{attraction.name}</h4>
                        <Badge 
                          className={`
                            ${attraction.category === 'Cultural' && 'bg-lavender hover:bg-lavender-dark text-white'} 
                            ${attraction.category === 'Landmark' && 'bg-ocean hover:bg-ocean-dark text-white'}
                            ${attraction.category === 'Restaurant' && 'bg-amber-500 hover:bg-amber-600 text-white'}
                            ${attraction.category === 'Nature' && 'bg-emerald-500 hover:bg-emerald-600 text-white'}
                          `}
                        >
                          {attraction.category}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground my-2">{attraction.description.substring(0, 120)}...</p>
                      
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`https://youtu.be/dQw4w9WgXcQ?t=${attraction.timestamp.seconds}`, '_blank')}
                        >
                          <Video className="h-4 w-4 mr-1" />
                          Watch
                        </Button>
                        <Button size="sm" className="bg-ocean hover:bg-ocean-dark">
                          <MapPin className="h-4 w-4 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ItineraryPage;
