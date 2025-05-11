
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { toast } from "@/components/ui/sonner";
import { Video, Plus, ArrowLeft } from "lucide-react";
import TripCreationForm from "@/components/trips/TripCreationForm";

const CreateTripPage = () => {
  const [creationMethod, setCreationMethod] = useState<"manual" | "video">("manual");
  const navigate = useNavigate();
  const { toast: useToastFn } = useToast();

  const handleTripCreated = (trip: any) => {
    // In a real app, this would send the trip data to an API
    console.log("Trip created:", trip);
    
    toast("Trip created successfully", {
      description: `Your trip "${trip.title}" has been created!`,
    });
    
    // Navigate to the trips page after a short delay
    setTimeout(() => {
      navigate('/trips');
    }, 1500);
  };

  return (
    <div className="container max-w-6xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Create New Trip</h1>
          <p className="text-muted-foreground">
            Build your perfect itinerary
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

      <Tabs defaultValue="manual" onValueChange={(v) => setCreationMethod(v as "manual" | "video")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="manual">
            <Plus className="h-4 w-4 mr-2" /> Create Manually
          </TabsTrigger>
          <TabsTrigger value="video">
            <Video className="h-4 w-4 mr-2" /> From Video Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <TripCreationForm onTripCreated={handleTripCreated} />
        </TabsContent>
        
        <TabsContent value="video" className="space-y-4">
          <div className="text-center py-8">
            <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">Video Analysis</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Go to the Video Analyzer page to extract attractions from a travel video
              and automatically create a trip itinerary.
            </p>
            <Button 
              onClick={() => navigate('/analyze')}
              className="bg-ocean hover:bg-ocean-dark"
            >
              <Video className="mr-2 h-4 w-4" />
              Go to Video Analyzer
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateTripPage;
