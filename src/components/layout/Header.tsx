
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const showNewButton = !location.pathname.includes("/trips/create");
  
  return (
    <header className="h-14 border-b flex items-center px-4 bg-background">
      <SidebarTrigger className="mr-4 text-muted-foreground hover:text-foreground" />
      
      <h1 className="font-medium text-lg text-foreground">
        {location.pathname === "/" && "Home"}
        {location.pathname === "/trips" && "My Trips"}
        {location.pathname === "/trips/create" && "Create Trip"}
        {location.pathname === "/analyze" && "Video Analyzer"}
      </h1>
      
      {showNewButton && (
        <div className="ml-auto flex items-center gap-4">
          <Button 
            size="sm" 
            variant="default"
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
