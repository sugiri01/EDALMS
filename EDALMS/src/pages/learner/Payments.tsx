
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Payments = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Payments</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View your payment history and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The payment history and transaction details will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
