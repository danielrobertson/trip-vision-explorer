
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock transcript data
const mockTranscript = [
  {
    id: 1,
    timestamp: '00:00:15',
    speaker: 'Host',
    text: "Welcome to our Tokyo travel guide! Today we're exploring the hidden gems of this amazing city that most tourists miss.",
    isHighlighted: false
  },
  {
    id: 2,
    timestamp: '00:00:32',
    speaker: 'Host',
    text: "Let's start with the beautiful Senso-ji Temple in Asakusa. This is Tokyo's oldest temple, dating back to 645 AD.",
    isHighlighted: true
  },
  {
    id: 3,
    timestamp: '00:01:05',
    speaker: 'Host',
    text: "The huge red lantern at the entrance is called Kaminarimon or 'Thunder Gate' and is a perfect spot for photos.",
    isHighlighted: false
  },
  {
    id: 4,
    timestamp: '00:01:45',
    speaker: 'Host',
    text: "After visiting the temple, I recommend walking down Nakamise Shopping Street for some traditional Japanese snacks and souvenirs.",
    isHighlighted: true
  },
  {
    id: 5,
    timestamp: '00:02:30',
    speaker: 'Host',
    text: "For lunch, we're heading to Tsukiji Outer Market. Even though the main fish market moved to Toyosu, this area still has amazing food stalls.",
    isHighlighted: true
  },
  {
    id: 6,
    timestamp: '00:03:15',
    speaker: 'Host',
    text: "I'm trying this fresh sushi at a small restaurant called Sushi Dai. The wait can be long but it's absolutely worth it.",
    isHighlighted: false
  },
  {
    id: 7,
    timestamp: '00:04:20',
    speaker: 'Host',
    text: "Next, we're going to the Tokyo Metropolitan Government Building in Shinjuku for free panoramic views of the city.",
    isHighlighted: true
  },
  {
    id: 8,
    timestamp: '00:05:10',
    speaker: 'Host',
    text: "From here you can see Mt. Fuji on a clear day, and the observation decks are open until late evening for night views.",
    isHighlighted: false
  },
  {
    id: 9,
    timestamp: '00:06:30',
    speaker: 'Host',
    text: "For the evening, let's explore Shibuya Crossing, the busiest pedestrian crossing in the world. It's especially impressive at night.",
    isHighlighted: true
  },
  {
    id: 10,
    timestamp: '00:07:45',
    speaker: 'Host',
    text: "And that's our quick tour of some must-visit spots in Tokyo! In the next video, we'll explore more of Japan's amazing cuisine. Don't forget to subscribe!",
    isHighlighted: false
  }
];

const TranscriptViewer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [transcript, setTranscript] = useState(mockTranscript);
  
  const filteredTranscript = transcript.filter(
    (entry) =>
      entry.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.timestamp.includes(searchQuery)
  );

  return (
    <div className="p-4">
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search transcript..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {filteredTranscript.map((entry) => (
          <div 
            key={entry.id} 
            className={`p-3 rounded-md border ${entry.isHighlighted ? 'bg-lavender-light border-lavender' : 'bg-white'}`}
          >
            <div className="flex justify-between items-start mb-1">
              <Badge 
                variant="outline" 
                className="text-xs"
              >
                {entry.timestamp}
              </Badge>
              {entry.isHighlighted && (
                <Badge className="bg-lavender text-white text-xs">
                  Point of Interest
                </Badge>
              )}
            </div>
            <p className="text-sm">{entry.text}</p>
            
            <div className="flex justify-end mt-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs"
                onClick={() => window.open(`https://youtu.be/dQw4w9WgXcQ?t=${entry.timestamp.replace(':', 'm').replace(':', 's')}`, '_blank')}
              >
                <Video className="h-3 w-3 mr-1" />
                Jump to timestamp
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptViewer;
