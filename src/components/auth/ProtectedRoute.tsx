
import React from "react";

// This component is now a simple pass-through without any authentication protection
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Just render the children without any auth checks
  return <>{children}</>;
};

export default ProtectedRoute;
