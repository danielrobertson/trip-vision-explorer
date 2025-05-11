
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, Compass } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const showNewButton = !location.pathname.includes("/trips/create");
  
  return (
    <header className="h-16 border-b flex items-center px-4 bg-white shadow-sm">
      <SidebarTrigger className="mr-4" />
      
      <div className="flex items-center gap-2">
        <Compass className="h-5 w-5 text-ocean" />
        <h1 className="font-semibold text-xl hidden md:block text-gray-800">
          TripTrace
        </h1>
      </div>
      
      {showNewButton && (
        <div className="ml-auto flex items-center gap-4">
          <Button 
            size="sm" 
            className="bg-ocean hover:bg-ocean-dark"
            onClick={() => window.location.href = '/trips/create'}
          >
            <Plus className="mr-1 h-4 w-4" />
            New Trip
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
