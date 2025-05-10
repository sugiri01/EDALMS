
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const AcademySettingsContent = () => {
  const [activeTab, setActiveTab] = useState("app-customization");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-transparent border-b w-full rounded-none justify-start gap-4 h-auto mb-6 overflow-x-auto">
          <TabsTrigger 
            value="app-customization" 
            className={`pb-2 rounded-none border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
          >
            App Customization
          </TabsTrigger>
          <TabsTrigger 
            value="languages" 
            className={`pb-2 rounded-none border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
          >
            Languages
          </TabsTrigger>
          <TabsTrigger 
            value="common-label" 
            className={`pb-2 rounded-none border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
          >
            Common label
          </TabsTrigger>
          <TabsTrigger 
            value="domain" 
            className={`pb-2 rounded-none border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
          >
            Domain
          </TabsTrigger>
          <TabsTrigger 
            value="publish" 
            className={`pb-2 rounded-none border-b-2 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
          >
            Publish
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="app-customization" className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Code</h2>
            <p className="text-sm text-gray-600 mb-4">Add header and footer code for your learner webapp.</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Header Code</label>
                  <span className="text-xs text-gray-500">10000 characters left</span>
                </div>
                <Textarea 
                  placeholder="Any tracking code that you wish to add to your learner webapp."
                  className="min-h-[120px]"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Footer Code</label>
                  <span className="text-xs text-gray-500">10000 characters left</span>
                </div>
                <Textarea 
                  placeholder="Any tracking code that you wish to add to your learner webapp."
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="languages" className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
              <p className="text-sm">
                Note: If you make any changes here, you need to republish so that the content will be shown in sites.
              </p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Republish
            </Button>
          </div>
          
          <p className="text-sm">
            To reach a global audience, make sure you customize this site in as many languages as possible.
          </p>
          
          <div className="border rounded-lg p-3 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">English (English)</span>
              <span className="text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded">Default</span>
            </div>
            <div>
              <span className="text-sm">Region: United States</span>
            </div>
          </div>
          
          <Button variant="outline" className="text-primary border-dashed border-primary flex items-center gap-2">
            <span>+</span>
            <span>Add Language</span>
          </Button>
        </TabsContent>
        
        <TabsContent value="domain" className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Learner Domain</h2>
            
            <div className="border rounded-lg p-4 mb-4">
              <h3 className="font-medium">TrainerCentral Domain</h3>
              <p className="text-sm text-gray-600 mb-4">
                TrainerCentral offers a default learner domain URL (shown below). Your learners can access the academy using this URL.
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <Input value="https://eda1.trainercentralsite.in" readOnly className="bg-gray-50" />
                <span className="text-xs bg-gray-100 py-0.5 px-2 rounded">Default</span>
                <Button variant="outline" size="sm" className="border-primary text-primary">
                  Edit
                </Button>
              </div>
              
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex items-center gap-3">
                <span className="text-orange-500">🔒</span>
                <p className="text-sm text-gray-700">
                  Upgrade now to customize the way your sessions are branded and add credibility to your training organization. TrainerCentral allows you to map your domain at anytime thereby boosting visibility to target audiences.
                </p>
              </div>
              
              <Button className="bg-orange-500 hover:bg-orange-600 mt-4">
                Upgrade now
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Admin Domain</h3>
              <p className="text-sm text-gray-600 mb-4">
                TrainerCentral offers a default admin domain URL (shown below) to host your academy website. Your admins and trainers can access the academy using this URL.
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <Input value="https://eda1.trainercentral.in" readOnly className="bg-gray-50" />
                <span className="text-xs bg-gray-100 py-0.5 px-2 rounded">Default</span>
                <Button variant="outline" size="sm" className="border-primary text-primary">
                  Edit
                </Button>
              </div>
              
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex items-center gap-3">
                <span className="text-orange-500">🔒</span>
                <p className="text-sm text-gray-700">
                  Upgrade now to customize the way your sessions are branded and add credibility to your training organization. TrainerCentral allows you to map your domain at anytime thereby boosting visibility to target audiences.
                </p>
              </div>
              
              <Button className="bg-orange-500 hover:bg-orange-600 mt-4">
                Upgrade now
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="publish" className="space-y-6">
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-green-600 mb-2">
                Your Academy "EdAthena Academy" is now online!
              </h2>
              <p className="text-sm text-gray-600">
                Once you take your academy offline, it can no longer be accessed by your learners or future prospects.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">Website URL:</span>
                <a href="#" className="text-primary hover:underline text-sm">https://eda1.trainercentralsite.in/clientapp</a>
                <button className="text-xs text-primary">Copy link</button>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline">Edit site</Button>
                <Button variant="outline">Access Site</Button>
                <Button variant="ghost">
                  <span>⋯</span>
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">
                Share your academy across social platform
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Wish to promote your training academy across all your networks? Click on the button below to share.
              </p>
              
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">f</div>
                  <span>Share on Facebook</span>
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <div className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">x</div>
                  <span>Share on Twitter</span>
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">in</div>
                  <span>Share on LinkedIn</span>
                </Button>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline">Embed courses widget</Button>
              <Button variant="outline">Embed featured course widget</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="common-label" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Common label</h2>
            <div className="flex gap-2">
              <Button variant="outline">English (English) - United States</Button>
              <Button variant="outline" className="flex items-center justify-center px-2">
                <span>↓</span>
              </Button>
            </div>
          </div>
          
          <div className="flex border rounded">
            <div className="w-1/4 bg-gray-50 border-r p-3">
              <div className="font-medium mb-4">Site</div>
              <div className="text-sm text-primary">Learner App</div>
            </div>
            
            <div className="w-3/4 p-3">
              <div className="border-b pb-4 mb-4">
                <h3 className="font-medium mb-2">Cookie Bar</h3>
                <p className="text-sm text-gray-600 mb-2">
                  We have organised all the cookies used in this website under various categories. You may choose to accept or decline by using the toggle button in each of the following categories. Please note that we use a cookie to remember your preference.
                </p>
                <Textarea rows={3} className="w-full mt-2" />
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="font-medium mb-2">Cookie Policy</h3>
                <Textarea rows={3} className="w-full" />
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="font-medium mb-2">Essential</h3>
                <Textarea rows={3} className="w-full" />
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="font-medium mb-2">Type</h3>
                <Textarea rows={3} className="w-full" />
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="font-medium mb-2">Close</h3>
                <Textarea rows={3} className="w-full" />
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="font-medium mb-2"></h3>
                <p className="text-sm text-gray-600">
                  You can learn more about how cookies are used by visiting the privacy policy
                </p>
                <Textarea rows={3} className="w-full mt-2" />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Manage preferences</h3>
                <Textarea rows={3} className="w-full" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademySettingsContent;
