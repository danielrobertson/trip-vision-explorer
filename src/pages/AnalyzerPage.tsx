
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MapPin, 
  Video, 
  GalleryHorizontal, 
  ArrowRight,
  ArrowLeft 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AttractionCard from "@/components/attractions/AttractionCard";
import TranscriptViewer from "@/components/analyzer/TranscriptViewer";

// Mock data
import { mockAttractions } from "@/lib/mockData";

const AnalyzerPage = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzed, setAnalyzed] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!videoUrl) {
      toast({
        title: "Video URL is required",
        description: "Please enter a valid YouTube video URL",
        variant: "destructive",
      });
      return;
    }

    // Mock analysis process
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
      toast({
        title: "Analysis complete!",
        description: "We've extracted 8 attractions from the video.",
      });
    }, 3000);
  };

  const handleCreateTrip = () => {
    // In a real app, this would send the extracted data to the backend
    // For now we'll just navigate to the trips page
    toast({
      title: "Trip created!",
      description: "Your trip has been created based on the video analysis.",
    });
    
    setTimeout(() => {
      navigate('/trips');
    }, 1500);
  };

  const handleViewMap = () => {
    navigate('/map');
  };

  return (
    <div className="container max-w-6xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Video Analyzer</h1>
          <p className="text-muted-foreground">
            Paste a YouTube URL to extract travel information
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/trips/create')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trip Creator
          </Button>
          
          {analyzed && (
            <Button 
              onClick={handleViewMap}
            >
              <MapPin className="mr-2 h-4 w-4" />
              View on Map
            </Button>
          )}
        </div>
      </div>

      <Card className="overflow-hidden border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="Paste YouTube URL here..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-ocean hover:bg-ocean-dark"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-pulse-light mr-2">
                    <Video className="h-4 w-4" />
                  </div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Video className="mr-2 h-4 w-4" />
                  Analyze Video
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analyzed ? (
        <Tabs defaultValue="attractions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="attractions">
              <MapPin className="h-4 w-4 mr-2" /> Attractions (8)
            </TabsTrigger>
            <TabsTrigger value="transcript">
              <Video className="h-4 w-4 mr-2" /> Transcript
            </TabsTrigger>
          </TabsList>
          <TabsContent value="attractions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAttractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button onClick={handleCreateTrip} className="bg-ocean hover:bg-ocean-dark">
                Create Trip from Video <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="transcript">
            <Card className="border shadow-sm">
              <CardContent className="p-0">
                <ScrollArea className="h-[600px] rounded-md">
                  <TranscriptViewer />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Video className="h-16 w-16 text-muted mb-4" />
          <h2 className="text-2xl font-medium">Ready to analyze</h2>
          <p className="text-muted-foreground max-w-md mt-2">
            Paste a YouTube URL above and click Analyze to extract attractions,
            timestamps, and create an itinerary from the video.
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalyzerPage;
