
import React from "react";

const ActivitiesContent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <img 
        src="/lovable-uploads/48b61d4e-ad0f-4cb7-9a9f-25a0af5dfbc3.png" 
        alt="Activities" 
        className="w-32 h-32 mb-4" 
      />
      <h2 className="text-xl font-medium">Activity logs will be displayed here</h2>
      <p className="text-gray-600 max-w-md mt-2">
        Track all activities performed in your academy to ensure security and audit user actions.
      </p>
    </div>
  );
};

export default ActivitiesContent;
