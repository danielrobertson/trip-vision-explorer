
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  // If authentication is still loading, show a loading indicator (or nothing)
  if (isLoading) {
    return <div className="h-full w-full flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>;
  }

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // If user is authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
