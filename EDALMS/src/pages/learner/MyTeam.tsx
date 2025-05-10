
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MyTeam = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">My Team</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>View and manage your team members</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The team management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTeam;
