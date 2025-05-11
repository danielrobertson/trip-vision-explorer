
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import { AttractionType } from "@/types";
import AttractionSearch from "@/components/attractions/AttractionSearch";
import AttractionCard from "@/components/attractions/AttractionCard";

interface TripCreationFormProps {
  onTripCreated: (trip: any) => void;
}

const TripCreationForm = ({ onTripCreated }: TripCreationFormProps) => {
  const [tripTitle, setTripTitle] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [selectedAttractions, setSelectedAttractions] = useState<AttractionType[]>([]);
  const { toast } = useToast();

  const handleAddAttraction = (attraction: AttractionType) => {
    // Check if the attraction is already added
    if (selectedAttractions.some(a => a.id === attraction.id)) {
      toast({
        title: "Already added",
        description: "This attraction is already in your trip",
      });
      return;
    }
    setSelectedAttractions([...selectedAttractions, attraction]);
  };

  const handleRemoveAttraction = (attractionId: string) => {
    setSelectedAttractions(selectedAttractions.filter(a => a.id !== attractionId));
  };

  const handleCreateTrip = () => {
    // Validate form
    if (!tripTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a trip title",
      });
      return;
    }

    if (selectedAttractions.length === 0) {
      toast({
        title: "No attractions",
        description: "Please add at least one attraction to your trip",
      });
      return;
    }

    const newTrip = {
      id: `trip-${Date.now()}`,
      title: tripTitle,
      description: tripDescription,
      date: tripDate || new Date().toISOString().split('T')[0],
      thumbnail: selectedAttractions[0]?.screenshot || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
      attractions: selectedAttractions,
    };

    onTripCreated(newTrip);

    // Reset form
    setTripTitle("");
    setTripDescription("");
    setTripDate("");
    setSelectedAttractions([]);
  };

  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="trip-title" className="block text-sm font-medium mb-1">
                Trip Title
              </label>
              <Input
                id="trip-title"
                placeholder="Enter a title for your trip"
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="trip-description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="trip-description"
                placeholder="Describe your trip"
                value={tripDescription}
                onChange={(e) => setTripDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="trip-date" className="block text-sm font-medium mb-1">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="trip-date"
                  type="date"
                  value={tripDate}
                  onChange={(e) => setTripDate(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-medium mb-3">Add Attractions</h3>
        <AttractionSearch onAddAttraction={handleAddAttraction} />
      </div>

      {selectedAttractions.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">
            Selected Attractions ({selectedAttractions.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedAttractions.map((attraction) => (
              <div key={attraction.id} className="relative">
                <AttractionCard attraction={attraction} />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 text-white"
                  onClick={() => handleRemoveAttraction(attraction.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button 
        className="w-full bg-ocean hover:bg-ocean-dark" 
        size="lg"
        onClick={handleCreateTrip}
      >
        Create Trip
      </Button>
    </div>
  );
};

export default TripCreationForm;
