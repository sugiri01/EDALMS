
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  // Pre-fill the email field if it's our target user
  useEffect(() => {
    const targetEmail = "sudhirgiri.g@gmail.com";
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("email") === targetEmail) {
      setEmail(targetEmail);
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          console.error("Sign up error:", error);
          throw error;
        }
        toast.success("Account created successfully! Please verify your email.");
      } else {
        // Special case for the admin user
        if (email === "sudhirgiri.g@gmail.com") {
          console.log("Admin login attempt: sudhirgiri.g@gmail.com");
        }
        
        const { error } = await signIn(email, password);
        if (error) {
          console.error("Sign in error:", error);
          throw error;
        }
        
        // Force a profile refresh to get the latest role
        await refreshUserProfile();
        
        console.log("Login successful, redirecting to:", from);
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-secondary">EDATHENA</h1>
          <p className="text-gray-600 mt-2">Learning Management System</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {isSignUp ? "Create an Account" : "Sign In"}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="w-full"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-white"
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </Button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary text-sm hover:underline"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>

            {email === "sudhirgiri.g@gmail.com" && !isSignUp && (
              <div className="mt-4 text-sm bg-blue-50 p-3 rounded-md text-blue-800">
                <p className="font-medium">Note for sudhirgiri.g@gmail.com:</p>
                <p>After logging in, you'll need to go to the Users page and set your role as admin.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
