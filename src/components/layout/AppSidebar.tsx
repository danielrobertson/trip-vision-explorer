
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { 
  Video, 
  MapPin, 
  List,
  GalleryHorizontal
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
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Home", 
    url: "/", 
    icon: GalleryHorizontal 
  },
  { 
    title: "Video Analyzer", 
    url: "/analyze", 
    icon: Video 
  },
  { 
    title: "Itinerary", 
    url: "/itinerary", 
    icon: List 
  },
  { 
    title: "Map View", 
    url: "/map", 
    icon: MapPin 
  },
];

const AppSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => 
    path === "/" ? currentPath === path : currentPath.startsWith(path);
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "flex items-center gap-3 p-2 rounded-md bg-primary/10 text-primary font-medium" 
      : "flex items-center gap-3 p-2 rounded-md hover:bg-muted/80 transition-colors";

  return (
    <Sidebar
      className={`border-r transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      collapsible
    >
      <div className="flex h-16 items-center justify-center border-b">
        <h2 className={`font-bold text-ocean-dark text-lg ${collapsed ? "hidden" : "block"}`}>
          TravelCast
        </h2>
        {collapsed && (
          <span className="text-ocean-dark font-bold text-lg">TC</span>
        )}
      </div>

      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupLabel 
            className={`${collapsed ? "sr-only" : "text-sm text-muted-foreground mb-2"}`}
          >
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? "text-primary" : "text-muted-foreground"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
