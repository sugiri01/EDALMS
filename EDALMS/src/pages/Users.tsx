
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { supabaseAdmin, supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Import refactored components
import { UserForm } from "@/components/users/UserForm";
import { User } from "@/components/users/UserTable";
import { SearchFilters } from "@/components/users/SearchFilters";
import { LearnersTabContent, TrainersTabContent, GroupsTabContent } from "@/components/users/TabsContent";

// Define type for auth user data
interface AuthUser {
  id: string;
  email?: string;
}

const Users = () => {
  const [activeTab, setActiveTab] = useState("learners");
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [learners, setLearners] = useState<User[]>([]);
  const [trainers, setTrainers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<"learner" | "trainer" | "admin">("learner");
  const { refreshUserProfile } = useAuth();

  // Updated fetchUsers function to correctly handle profile data with the added email field
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("Fetching profiles from database...");
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, role, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching profiles:", error);
        throw error;
      }

      console.log(`Fetched ${profiles?.length || 0} profiles:`, profiles);

      // Check if profiles array exists and has items
      if (!profiles || profiles.length === 0) {
        console.log("No profiles found in database");
        setLearners([]);
        setTrainers([]);
        setIsLoading(false);
        return;
      }

      // For any missing emails, try to get them from auth
      const profilesWithMissingEmails = profiles.filter(profile => !profile.email);
      
      if (profilesWithMissingEmails.length > 0) {
        console.log("Some profiles are missing emails. Fetching from auth...");
        
        // Get user email data from auth using supabaseAdmin
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        
        if (authError) {
          console.error("Error fetching auth users:", authError);
          // Continue with profiles data only, emails might be missing
        }
        
        // Create a map of user IDs to emails for quick lookup
        if (authData?.users) {
          const userEmailMap: Record<string, string> = {};
          
          authData.users.forEach((user: AuthUser) => {
            if (user && typeof user.id === 'string' && typeof user.email === 'string') {
              userEmailMap[user.id] = user.email;
            }
          });
          
          // Update profiles with missing emails
          for (let profile of profiles) {
            if (!profile.email && userEmailMap[profile.id]) {
              profile.email = userEmailMap[profile.id];
              
              // Update the email in the database for future queries
              await supabase
                .from('profiles')
                .update({ email: profile.email })
                .eq('id', profile.id);
            }
          }
        }
      }
      
      // Map profiles to User objects
      const mappedUsers = profiles.map(profile => {
        return {
          id: profile.id,
          name: profile.full_name || 'Unknown',
          email: profile.email || `${profile.id.substring(0, 8)}@example.com`,
          role: profile.role || 'learner',
          joined: new Date(profile.created_at || '').toLocaleDateString(),
          lastLogin: profile.updated_at 
            ? new Date(profile.updated_at).toLocaleString() 
            : 'Never'
        };
      });

      console.log("Processed users:", mappedUsers);
      
      // Special check for our target user
      const targetUser = mappedUsers.find(u => u.email === "sudhirgiri.g@gmail.com");
      if (targetUser) {
        console.log("Target user found:", targetUser);
      } else {
        console.log("Target user not found in the data");
      }

      const fetchedLearners = mappedUsers.filter(user => user.role === 'learner');
      const fetchedTrainers = mappedUsers.filter(user => user.role === 'trainer');
      
      console.log(`Found ${fetchedLearners.length} learners and ${fetchedTrainers.length} trainers`);
      
      setLearners(fetchedLearners);
      setTrainers(fetchedTrainers);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Ensure user profile is refreshed when accessing the Users page
    refreshUserProfile();
    fetchUsers();
  }, [refreshUserProfile, fetchUsers]);

  const handleOpenAddUserDialog = (role: "learner" | "trainer" | "admin") => {
    setSelectedRole(role);
    setAddUserDialogOpen(true);
  };

  const handleUserAdded = () => {
    setAddUserDialogOpen(false);
    toast.success("User added successfully! Refreshing list...");
    
    // Add a delay before fetching users to ensure the database has updated
    setTimeout(() => {
      fetchUsers();
    }, 1500); // Increased delay to ensure database updates are complete
  };

  // Filter users based on search value
  const filteredLearners = learners.filter(user => 
    user.name.toLowerCase().includes(searchValue.toLowerCase()) || 
    user.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredTrainers = trainers.filter(user => 
    user.name.toLowerCase().includes(searchValue.toLowerCase()) || 
    user.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Log the current state for debugging
  console.log("Current state:", {
    learners: learners.length,
    trainers: trainers.length,
    filteredLearners: filteredLearners.length,
    filteredTrainers: filteredTrainers.length,
    isLoading
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-secondary">Users</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
            Create Group
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2" onClick={() => setAddUserDialogOpen(true)}>
            <Plus size={18} />
            Add User
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <TabsList className="bg-transparent h-auto p-0">
            <TabsTrigger 
              value="learners" 
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none"
            >
              Learners
            </TabsTrigger>
            <TabsTrigger 
              value="trainers" 
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none"
            >
              Trainers
            </TabsTrigger>
            <TabsTrigger 
              value="groups" 
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none"
            >
              Groups
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg mt-6">
          <SearchFilters 
            searchValue={searchValue} 
            onSearchChange={setSearchValue} 
          />
          
          {activeTab === "learners" && (
            <LearnersTabContent 
              isLoading={isLoading} 
              filteredLearners={filteredLearners} 
              onAddUser={handleOpenAddUserDialog}
              onUserUpdated={fetchUsers}
            />
          )}
          
          {activeTab === "trainers" && (
            <TrainersTabContent 
              isLoading={isLoading} 
              filteredTrainers={filteredTrainers} 
              onAddUser={handleOpenAddUserDialog}
              onUserUpdated={fetchUsers} 
            />
          )}
          
          {activeTab === "groups" && (
            <GroupsTabContent />
          )}
        </div>
      </Tabs>
      
      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedRole === "learner" ? "Add Learner" : selectedRole === "trainer" ? "Add Trainer" : "Add Admin"}
            </DialogTitle>
            <DialogDescription>
              Enter the details of the new {selectedRole}.
            </DialogDescription>
          </DialogHeader>
          
          <UserForm 
            onClose={() => setAddUserDialogOpen(false)}
            onSuccess={handleUserAdded}
            defaultRole={selectedRole}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
