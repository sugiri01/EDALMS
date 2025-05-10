
import React from "react";
import { Button } from "@/components/ui/button";

const PaymentsContent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
      <img 
        src="/lovable-uploads/6e087a36-5ff1-4d43-ad39-cf9fd66178be.png" 
        alt="Payments" 
        className="w-24 h-24 mb-4" 
      />
      <h2 className="text-xl font-medium">Upgrade to higher plans to configure payments.</h2>
      <p className="text-gray-600 max-w-md">
        You can monetize your trainings and receive payments from your participants.
      </p>
      <Button className="bg-orange-500 hover:bg-orange-600 mt-4">
        Upgrade now
      </Button>
    </div>
  );
};

export default PaymentsContent;
