
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Rewards = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Rewards</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Rewards</CardTitle>
          <CardDescription>View and redeem your rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The rewards system will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rewards;
