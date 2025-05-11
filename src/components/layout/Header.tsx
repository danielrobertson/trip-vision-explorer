
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Video } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 border-b flex items-center px-4 bg-white">
      <SidebarTrigger className="mr-4" />
      
      <div className="flex items-center gap-2">
        <Video className="h-5 w-5 text-primary" />
        <h1 className="font-semibold text-xl hidden md:block">
          TripTrace
        </h1>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <Button size="sm" className="bg-ocean hover:bg-ocean-dark">
          New Analysis
        </Button>
      </div>
    </header>
  );
};

export default Header;
