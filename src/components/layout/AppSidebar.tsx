
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { 
  Video, 
  Home,
  Map,
  User
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { 
    title: "Home", 
    url: "/", 
    icon: Home
  },
  { 
    title: "Video Analyzer", 
    url: "/analyze", 
    icon: Video 
  },
  { 
    title: "Trips", 
    url: "/itinerary", 
    icon: Map 
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => 
    path === "/" ? currentPath === path : currentPath.startsWith(path);
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "flex items-center gap-3 p-2 rounded-md bg-primary/10 text-primary font-medium" 
      : "flex items-center gap-3 p-2 rounded-md hover:bg-muted/80 transition-colors";

  // Mock user state - in a real app, this would come from authentication
  const isSignedIn = false;

  return (
    <Sidebar
      className="border-r transition-all duration-300 w-64 md:w-64"
      collapsible="none"
    >
      <div className="flex h-16 items-center justify-center border-b">
        <h2 className="font-bold text-ocean-dark text-lg">
          TripTrace
        </h2>
      </div>

      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm text-muted-foreground mb-2">
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? "text-primary" : "text-muted-foreground"}`} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t p-4">
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">john@example.com</span>
            </div>
          </div>
        ) : (
          <Button className="w-full bg-ocean hover:bg-ocean-dark" variant="default">
            <User className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
