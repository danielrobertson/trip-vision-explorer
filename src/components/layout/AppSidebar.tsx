
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { 
  Video, 
  Home,
  Map,
  Plus,
  Compass,
  LogIn,
  LogOut,
  User,
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
  useSidebar
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

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
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, signOut } = useAuth();

  const isActive = (path: string) => 
    path === "/" ? currentPath === path : currentPath.startsWith(path);
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-3 p-2 rounded-md transition-colors",
      isActive 
        ? "text-primary font-medium" 
        : "text-muted-foreground hover:text-foreground"
    );

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    // Navigation should work for all users regardless of auth state
    // No prevention of navigation needed here
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Sidebar
      className={cn(
        "border-r transition-all duration-300 bg-background", 
        collapsed ? "w-16" : "w-64 md:w-[240px]"
      )}
      collapsible="icon"
    >
      <div className="flex h-14 items-center justify-start px-4 border-b">
        <Compass className="h-5 w-5 text-primary mr-2" />
        {!collapsed && (
          <h2 className="font-semibold text-foreground text-lg">
            TripTrace
          </h2>
        )}
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs text-muted-foreground px-2 mb-1 mt-2">
              Navigation
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className={`h-4 w-4 ${isActive(item.url) ? "text-primary" : "text-muted-foreground"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs text-muted-foreground px-2 mb-1 mt-4">
              Tools
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {toolsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className={`h-4 w-4 ${isActive(item.url) ? "text-primary" : "text-muted-foreground"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t p-4">
        {user ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(user.user_metadata.full_name || user.email || "")}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-sm font-medium truncate">
                  {user.user_metadata.full_name || user.email?.split('@')[0]}
                </span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
            )}
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={handleSignOut}
              title="Sign out"
              className="ml-auto"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            className={collapsed ? "p-2 w-full" : "w-full"} 
            variant="default"
            onClick={() => navigate("/auth")}
          >
            {collapsed ? <LogIn className="h-4 w-4" /> : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </>
            )}
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
