
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Video, 
  ArrowRight,
  MapPin
} from "lucide-react";
import { AttractionType } from "@/types";

interface AttractionCardProps {
  attraction: AttractionType;
}

const AttractionCard = ({ attraction }: AttractionCardProps) => {
  const { 
    name, 
    description, 
    category, 
    timestamp, 
    screenshot, 
    relevanceScore 
  } = attraction;

  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={screenshot} 
          alt={name} 
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            className={`
              ${category === 'Cultural' && 'bg-lavender hover:bg-lavender-dark text-white'} 
              ${category === 'Landmark' && 'bg-ocean hover:bg-ocean-dark text-white'}
              ${category === 'Restaurant' && 'bg-amber-500 hover:bg-amber-600 text-white'}
              ${category === 'Nature' && 'bg-emerald-500 hover:bg-emerald-600 text-white'}
            `}
          >
            {category}
          </Badge>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute bottom-2 right-2 bg-white hover:bg-gray-100"
          onClick={() => window.open(`https://youtu.be/dQw4w9WgXcQ?t=${timestamp.seconds}`, '_blank')}
        >
          <Clock className="h-4 w-4 mr-1" /> {timestamp.formatted}
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Relevance: {relevanceScore}/10</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-ocean"
          >
            Details <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttractionCard;
