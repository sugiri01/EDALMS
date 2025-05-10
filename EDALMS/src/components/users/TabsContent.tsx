
import { UserTable } from "./UserTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "./UserTable";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface LearnersTabContentProps {
  isLoading: boolean;
  filteredLearners: User[];
  onAddUser: (role: "learner" | "trainer" | "admin") => void;
  onUserUpdated: () => void;
}

export const LearnersTabContent = ({ isLoading, filteredLearners, onAddUser, onUserUpdated }: LearnersTabContentProps) => {
  const { user } = useAuth();
  const targetUser = filteredLearners.find(u => u.email === "sudhirgiri.g@gmail.com");
  const isCurrentUserTargetUser = user?.email === "sudhirgiri.g@gmail.com";
  
  return (
    <div className="space-y-6">
      {targetUser && targetUser.role !== 'admin' && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Permission Required</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <span>User sudhirgiri.g@gmail.com needs admin permissions. You can make them an admin by using the "Make Admin" button below.</span>
            {isCurrentUserTargetUser && (
              <span className="font-medium">You are logged in as this user. After making yourself an admin, please log out and log back in.</span>
            )}
          </AlertDescription>
        </Alert>
      )}
      <UserTable 
        users={filteredLearners} 
        isLoading={isLoading} 
        title="Learners" 
        onAddUser={() => onAddUser("learner")}
        onUserUpdated={onUserUpdated}
      />
    </div>
  );
};

interface TrainersTabContentProps {
  isLoading: boolean;
  filteredTrainers: User[];
  onAddUser: (role: "learner" | "trainer" | "admin") => void;
  onUserUpdated: () => void;
}

export const TrainersTabContent = ({ isLoading, filteredTrainers, onAddUser, onUserUpdated }: TrainersTabContentProps) => {
  return (
    <UserTable 
      users={filteredTrainers} 
      isLoading={isLoading} 
      title="Trainers" 
      onAddUser={() => onAddUser("trainer")}
      onUserUpdated={onUserUpdated}
    />
  );
};

export const GroupsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Groups</CardTitle>
        <CardDescription>Create and manage user groups</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">No groups created yet.</p>
      </CardContent>
    </Card>
  );
};
