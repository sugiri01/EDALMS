
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const IntegrationsContent = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-medium">Configure your integrations</h2>

      {/* Zapier Integration */}
      <div className="border rounded-lg p-4 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="rounded-full bg-orange-100 p-2 h-12 w-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/2c273ba0-9980-48d6-849a-89d1ed7f4834.png" 
              alt="Zapier" 
              className="w-8 h-8" 
            />
          </div>
          <div>
            <h3 className="font-medium">Zapier</h3>
            <p className="text-sm text-gray-600 mt-1">
              Configure zaps to connect your apps and automate workflows. You can now integrate with 
              third-party apps and move information between TrainerCentral and other web apps
              seamlessly.
            </p>
            <div className="bg-yellow-50 border border-yellow-100 rounded px-3 py-2 mt-2 text-sm">
              Note: This integration is available only in Professional plan. 
              <a href="#" className="text-primary ml-1 hover:underline">Upgrade now</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Switch disabled />
          <Button variant="outline" className="text-primary border-primary text-sm" disabled>
            Configure Zap
          </Button>
        </div>
      </div>

      {/* Zoho Flow Integration */}
      <div className="border rounded-lg p-4 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="rounded-full bg-blue-100 p-2 h-12 w-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/03a42f3c-f2c7-45e4-8eae-e99c5b769db0.png" 
              alt="Zoho Flow" 
              className="w-8 h-8" 
            />
          </div>
          <div>
            <h3 className="font-medium">Zoho Flow</h3>
            <p className="text-sm text-gray-600 mt-1">
              Zoho Flow is an integration platform that helps you connect your apps without any code.
              Automate complex business workflows within minutes.
            </p>
            <div className="bg-yellow-50 border border-yellow-100 rounded px-3 py-2 mt-2 text-sm">
              Note: This integration is available only in Professional plan. 
              <a href="#" className="text-primary ml-1 hover:underline">Upgrade now</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Switch disabled />
          <Button variant="outline" className="text-primary border-primary text-sm" disabled>
            Access Zoho Flow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsContent;
