
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { AttractionType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { mockAttractions } from "@/lib/mockData";

interface AttractionSearchProps {
  onAddAttraction: (attraction: AttractionType) => void;
}

const AttractionSearch = ({ onAddAttraction }: AttractionSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AttractionType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Enter a location or attraction name to search",
      });
      return;
    }

    setIsSearching(true);

    // Mock search functionality - in a real app this would call an API
    setTimeout(() => {
      const results = mockAttractions.filter(attraction => 
        attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast({
          title: "No attractions found",
          description: "Try a different search term",
        });
      }
    }, 800);
  };

  const handleAddAttraction = (attraction: AttractionType) => {
    onAddAttraction(attraction);
    toast({
      title: "Attraction added",
      description: `${attraction.name} has been added to your trip`,
    });
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search for attractions, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch}
            disabled={isSearching}
          >
            <Search className="h-4 w-4 mr-2" />
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-3 mt-4">
            <h3 className="text-sm font-medium">Search Results</h3>
            {searchResults.map((attraction) => (
              <div key={attraction.id} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <p className="font-medium">{attraction.name}</p>
                  <p className="text-sm text-muted-foreground">{attraction.location}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleAddAttraction(attraction)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttractionSearch;
