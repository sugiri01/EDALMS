
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, loading, userProfile, isAdmin, refreshUserProfile } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Refresh user profile when the route changes to ensure we have the latest role info
    if (user) {
      console.log("Refreshing user profile on route change");
      refreshUserProfile();
    }
  }, [location.pathname, user]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("Protected route check:", { 
    path: location.pathname,
    isAuthenticated: !!user, 
    isLoading: loading,
    userProfile,
    requireAdmin,
    isAdmin: isAdmin()
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    console.log("User not authenticated, redirecting to auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Special handling for sudhirgiri.g@gmail.com
  if (user.email === "sudhirgiri.g@gmail.com" && requireAdmin) {
    // Always allow this specific user access to admin routes
    console.log("Special access granted for target user");
    return <>{children}</>;
  }

  // If admin access is required but user is not admin, redirect to dashboard
  if (requireAdmin && !isAdmin()) {
    console.log("Admin access required but user is not admin");
    toast.error("You don't have permission to access this page");
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
