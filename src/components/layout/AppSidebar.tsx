
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { 
  Video, 
  Home,
  Map,
  Plus,
  Compass
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
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const primaryNavItems = [
  { 
    title: "Home", 
    url: "/", 
    icon: Home
  },
  { 
    title: "My Trips", 
    url: "/trips", 
    icon: Map 
  },
];

const toolsNavItems = [
  { 
    title: "Create Trip", 
    url: "/trips/create", 
    icon: Plus 
  },
  { 
    title: "Video Analyzer", 
    url: "/analyze", 
    icon: Video 
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => 
    path === "/" ? currentPath === path : currentPath.startsWith(path);
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "flex items-center gap-3 p-2 rounded-md text-primary font-medium" 
      : "flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors";

  // Mock user state - in a real app, this would come from authentication
  const isSignedIn = false;

  return (
    <Sidebar
      className="border-r transition-all duration-300 w-64 md:w-[240px] bg-background"
      collapsible="none"
    >
      <div className="flex h-14 items-center justify-start px-4 border-b">
        <Compass className="h-5 w-5 text-primary mr-2" />
        <h2 className="font-semibold text-foreground text-lg">
          TripTrace
        </h2>
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground px-2 mb-1 mt-2">
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className={`h-4 w-4 ${isActive(item.url) ? "text-primary" : "text-muted-foreground"}`} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground px-2 mb-1 mt-4">
            Tools
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {toolsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className={`h-4 w-4 ${isActive(item.url) ? "text-primary" : "text-muted-foreground"}`} />
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
          <Button className="w-full" variant="default">
            Sign In
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
