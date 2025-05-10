
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye } from "lucide-react";

const FormsContent = () => {
  const [activeTab, setActiveTab] = useState("all-forms");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-transparent border-b w-full rounded-none justify-start gap-4 h-auto mb-6">
          <TabsTrigger 
            value="all-forms" 
            className={`pb-2 rounded-none border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
          >
            All Forms
          </TabsTrigger>
          <TabsTrigger 
            value="master-fields" 
            className={`pb-2 rounded-none border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
          >
            Master Fields
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-forms" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Forms</h2>
            <Button className="bg-orange-500 hover:bg-orange-600">
              New form
            </Button>
          </div>

          {/* Form cards */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Signup form</h3>
                  <p className="text-sm text-gray-500">Default Sign up form</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-gray-500 flex items-center gap-1">
                    <Eye size={16} />
                    <span>Entries</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-orange-500 border-orange-500 flex items-center gap-1">
                    <Eye size={16} />
                    <span>Preview</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Contact us form</h3>
                  <p className="text-sm text-gray-500">Default Contact us form</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-gray-500 flex items-center gap-1">
                    <Eye size={16} />
                    <span>Entries</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-orange-500 border-orange-500 flex items-center gap-1">
                    <Eye size={16} />
                    <span>Preview</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="master-fields" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">Master Fields</h2>
              <p className="text-sm text-gray-600">Master fields are customized fields that you can incorporate in all your forms. The information received from the forms can be viewed under each learner's reports.</p>
            </div>
            <Button variant="outline" className="text-primary border-primary">
              Manage master fields
            </Button>
          </div>

          <div className="border rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">First name*</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Last name*</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email*</label>
              <input type="email" className="w-full border rounded-md p-2" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Password*</label>
              <input type="password" className="w-full border rounded-md p-2" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Address</label>
              <textarea className="w-full border rounded-md p-2 h-24"></textarea>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">City</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">State</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Country</label>
              <select className="w-full border rounded-md p-2 bg-white">
                <option value="">Select country</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Phone number</label>
              <input type="tel" className="w-full border rounded-md p-2" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Zip/Pincode</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormsContent;
