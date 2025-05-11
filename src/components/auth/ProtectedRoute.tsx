
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // If authentication is still loading, show a loading indicator
  if (isLoading) {
    return <div className="h-full w-full flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>;
  }

  // If user is not authenticated, save the current path and redirect to login
  if (!user) {
    // Store the path the user was trying to access
    localStorage.setItem("redirectAfterAuth", location.pathname);
    return <Navigate to="/auth" />;
  }

  // If user is authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
