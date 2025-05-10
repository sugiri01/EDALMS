
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface UserRoleProps {
  userId: string;
  email: string;
  currentRole: string;
  onRoleUpdate: () => void;
}

const UserRole = ({ userId, email, currentRole, onRoleUpdate }: UserRoleProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { refreshUserProfile, user } = useAuth();
  
  const makeAdmin = async () => {
    setIsUpdating(true);
    try {
      console.log(`Updating user ${email} (${userId}) role to admin`);
      
      // Update the role in the profiles table
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);
        
      if (error) {
        console.error("Error updating role in database:", error);
        throw error;
      }
      
      console.log("Role updated successfully in database");
      
      // If this is the current user, refresh their profile to apply changes immediately
      const isCurrentUser = user?.id === userId;
      if (isCurrentUser) {
        console.log("This is the current user - refreshing profile");
        await refreshUserProfile();
        toast.info("You are now an admin. Please log out and log back in for all changes to take effect.");
      }
      
      toast.success(`${email} is now an admin`);
      
      // Add a small delay before refreshing the user list to ensure the DB has updated
      setTimeout(() => {
        onRoleUpdate();
      }, 1000);
    } catch (error: any) {
      console.error("Error making user admin:", error);
      toast.error(`Failed to update role: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Special handling for our target user
  const isTargetUser = email === "sudhirgiri.g@gmail.com";
  
  // Only show the button if user is not already an admin
  if (currentRole === 'admin') {
    return <span className="text-green-600 font-medium">Admin</span>;
  }
  
  return (
    <Button 
      size="sm" 
      variant={isTargetUser ? "default" : "outline"} 
      onClick={makeAdmin} 
      disabled={isUpdating}
      className={isTargetUser ? "text-xs bg-blue-600 hover:bg-blue-700" : "text-xs"}
    >
      {isUpdating ? 'Updating...' : 'Make Admin'}
    </Button>
  );
};

export default UserRole;
