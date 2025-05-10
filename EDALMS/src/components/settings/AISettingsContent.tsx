
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AISettingsContent = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Open AI Integration</h2>
          <p className="text-sm text-gray-600">
            Open AI's ChatGPT can help you build a course curriculum, generate lesson content, and create tests.
          </p>
        </div>
        <Switch />
      </div>

      <div className="border rounded-lg p-6 space-y-4 bg-gray-50">
        <h3 className="font-medium">ChatGPT Authentication</h3>
        <p className="text-sm text-gray-600">
          By using this integration, you're accepting Open AI's
          <a href="#" className="text-primary ml-1 hover:underline">privacy policy</a>.
        </p>
        
        <div className="space-y-2">
          <label className="block text-sm">Enter your OpenAI Secret API Key:</label>
          <Input type="password" placeholder="sk-..." className="max-w-md" />
        </div>
        
        <Button className="bg-orange-500 hover:bg-orange-600">
          Activate
        </Button>
      </div>
    </div>
  );
};

export default AISettingsContent;
