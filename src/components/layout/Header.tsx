
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Video, Youtube } from "lucide-react";

const Header = () => {
  const { collapsed } = useSidebar();

  return (
    <header className="h-16 border-b flex items-center px-4 bg-white">
      <SidebarTrigger className="mr-4" />
      
      <div className="flex items-center gap-2">
        <Video className="h-5 w-5 text-primary" />
        <h1 className={`font-semibold text-xl ${collapsed ? "block" : "hidden md:block"}`}>
          TravelCast
        </h1>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <Button size="sm" variant="outline" className="hidden md:flex items-center gap-1">
          <Youtube className="h-4 w-4" />
          <span>Tutorial</span>
        </Button>
        <Button size="sm" className="bg-ocean hover:bg-ocean-dark">
          New Analysis
        </Button>
      </div>
    </header>
  );
};

export default Header;
