
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Video, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="py-12 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Travel Smarter with <span className="text-ocean">TravelCast</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Transform travel videos into custom itineraries. Extract attractions, create maps, and plan your perfect trip with AI-powered insights.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-ocean hover:bg-ocean-dark"
            onClick={() => navigate('/analyze')}
          >
            <Video className="mr-2 h-5 w-5" />
            Analyze a Video
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/map')}
          >
            <MapPin className="mr-2 h-5 w-5" />
            View Map
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Video className="h-10 w-10 text-ocean" />}
            title="Analyze Travel Videos"
            description="Paste any YouTube travel video URL and our AI will transcribe and analyze the content."
          />
          <FeatureCard 
            icon={<MapPin className="h-10 w-10 text-ocean" />}
            title="Extract Locations"
            description="Automatically identify and map attractions, restaurants, and points of interest."
          />
          <FeatureCard 
            icon={<ArrowRight className="h-10 w-10 text-ocean" />}
            title="Create Itineraries"
            description="Generate customized travel itineraries with screenshots, timestamps, and directions."
          />
        </div>
      </section>

      {/* Recent Analyses */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Analyses</h2>
          <Button variant="ghost" className="text-ocean" onClick={() => navigate('/analyze')}>
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnalysisCard 
            title="Tokyo Hidden Gems"
            date="May 9, 2025"
            locations={8}
            thumbnail="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80"
            onClick={() => navigate('/analyze')}
          />
          <AnalysisCard 
            title="Barcelona Food Tour"
            date="May 7, 2025"
            locations={12}
            thumbnail="https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&q=80"
            onClick={() => navigate('/analyze')}
          />
          <AnalysisCard 
            title="New York City Walking Tour"
            date="May 5, 2025"
            locations={15}
            thumbnail="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80"
            onClick={() => navigate('/analyze')}
          />
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center space-y-4">
        <div className="mx-auto w-fit p-3 rounded-full bg-lavender-light">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

interface AnalysisCardProps {
  title: string;
  date: string;
  locations: number;
  thumbnail: string;
  onClick: () => void;
}

const AnalysisCard = ({ title, date, locations, thumbnail, onClick }: AnalysisCardProps) => {
  return (
    <Card 
      className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <p className="text-sm">{date}</p>
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center mt-2 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{locations} locations</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HomePage;
