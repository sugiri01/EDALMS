
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user, userProfile } = useAuth();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Profile</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>View and edit your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium">Email</h3>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            
            <div>
              <h3 className="text-md font-medium">Full Name</h3>
              <p className="text-gray-600">{userProfile?.full_name || user?.user_metadata?.full_name || 'Not provided'}</p>
            </div>
            
            <div>
              <h3 className="text-md font-medium">Role</h3>
              <p className="text-gray-600">{userProfile?.role || 'User'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
