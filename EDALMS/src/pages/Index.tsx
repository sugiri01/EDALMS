
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Only redirect if auth is not loading
    if (!loading) {
      if (user) {
        // User is logged in, navigate to dashboard
        navigate("/dashboard", { replace: true });
      } else {
        // User is not logged in, navigate to auth
        navigate("/auth", { replace: true });
      }
    }
  }, [navigate, loading, user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default Index;
