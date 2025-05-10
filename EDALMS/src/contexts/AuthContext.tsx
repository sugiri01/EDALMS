
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  role?: string;
  full_name?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: () => boolean;
  isLearner: () => boolean;
  isTrainer: () => boolean;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Function to fetch user profile data including role
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return { role: 'user', full_name: user?.user_metadata?.full_name || 'User' }; // Default fallback profile
      }

      console.log("Fetched user profile:", data);
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return { role: 'user', full_name: user?.user_metadata?.full_name || 'User' }; // Default fallback profile
    }
  };
  
  // Function to refresh user profile data - can be called manually when needed
  const refreshUserProfile = async () => {
    if (!user) return;
    
    try {
      const profileData = await fetchUserProfile(user.id);
      console.log("Manually refreshing user profile:", profileData);
      setUserProfile(profileData);
    } catch (error) {
      console.error("Error refreshing user profile:", error);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    const setupAuth = async () => {
      setLoading(true);
      try {
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log("Auth state changed:", event, session?.user?.email);
            
            if (mounted) {
              setSession(session);
              setUser(session?.user ?? null);

              // Fetch user profile and role after authentication
              if (session?.user) {
                // Use setTimeout to avoid potential auth deadlock
                setTimeout(async () => {
                  if (mounted) {
                    const profileData = await fetchUserProfile(session.user.id);
                    console.log("Setting user profile from auth change:", profileData);
                    setUserProfile(profileData);
                    setLoading(false);
                  }
                }, 0);
              } else {
                setUserProfile(null);
                setLoading(false);
              }
            }
          }
        );

        // THEN check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);

          if (session?.user) {
            const profileData = await fetchUserProfile(session.user.id);
            console.log("Setting user profile from existing session:", profileData);
            setUserProfile(profileData || { role: 'user', full_name: session.user.user_metadata?.full_name || 'User' });
          }

          setLoading(false);
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    setupAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      return { error };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to check if user is an admin - ensure it doesn't crash if userProfile is null
  const isAdmin = () => {
    console.log("Checking if user is admin. UserProfile:", userProfile);
    return userProfile?.role === 'admin';
  };

  // Function to check if user is a learner
  const isLearner = () => {
    return userProfile?.role === 'learner';
  };

  // Function to check if user is a trainer
  const isTrainer = () => {
    return userProfile?.role === 'trainer';
  };

  const value = {
    user,
    session,
    userProfile,
    signIn,
    signUp,
    signOut,
    loading,
    isAdmin,
    isLearner,
    isTrainer,
    refreshUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
