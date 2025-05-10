
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CourseData {
  id: string;
}

const SettingsTab = () => {
  const course = useOutletContext<CourseData>();
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3 mb-6">
          <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-white">General</TabsTrigger>
          <TabsTrigger value="certificate" className="data-[state=active]:bg-primary data-[state=active]:text-white">Certificate</TabsTrigger>
          <TabsTrigger value="registration" className="data-[state=active]:bg-primary data-[state=active]:text-white">Registration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Featured course</h3>
            <div className="flex items-start space-x-2">
              <Checkbox id="featured" />
              <div>
                <label htmlFor="featured" className="font-medium cursor-pointer text-sm">Feature this course</label>
                <p className="text-sm text-gray-600">This course will be displayed in the 'Featured' section in your Course Listing webpage.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Course compliance</h3>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="mandate-order" />
              <div>
                <label htmlFor="mandate-order" className="font-medium cursor-pointer text-sm">Mandate lesson order</label>
                <p className="text-sm text-gray-600">Learners can only access the lessons in order.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="exclude-live" />
              <div>
                <label htmlFor="exclude-live" className="font-medium cursor-pointer text-sm">Exclude live lessons from mandated lesson order</label>
                <p className="text-sm text-gray-600">It is not necessary for learners to complete live lessons to proceed to further lessons.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="enforce-percentage" />
              <div>
                <label htmlFor="enforce-percentage" className="font-medium cursor-pointer text-sm">Enforce lesson completion based on percentage</label>
                <p className="text-sm text-gray-600">Only when learners complete a specific percentage of the course materials will they be allowed to complete the lesson.</p>
                <p className="text-sm text-gray-600">Kindly note that only files uploaded from TrainerCentral/WorkDrive library (PDF and video files) can be tracked for course completion.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="enforce-grades" />
              <div>
                <label htmlFor="enforce-grades" className="font-medium cursor-pointer text-sm">Enforce lesson completion based on test grades</label>
                <p className="text-sm text-gray-600">Only when learners achieve the specified test grade will they be allowed to complete the lesson.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="exclude-metrics" />
              <div>
                <label htmlFor="exclude-metrics" className="font-medium cursor-pointer text-sm">Exclude live lessons from course completion metrics</label>
                <p className="text-sm text-gray-600">Live lessons will not be considered in calculating the course completion percentage.</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800">
              <p>If you check this box while your course is in progress, you'll have to recalculate the course completion percentage.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Course access</h3>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="private-course" />
              <div>
                <label htmlFor="private-course" className="font-medium cursor-pointer text-sm">Make this course private</label>
                <p className="text-sm text-gray-600">Visitors will see a message encouraging them to email you and request access to this course.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="hide-course" />
              <div>
                <label htmlFor="hide-course" className="font-medium cursor-pointer text-sm">Make this course hidden</label>
                <p className="text-sm text-gray-600">Courses set as hidden will not appear as a course card on your site landing page and are only accessible with a direct link to the course landing page.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Estimation</h3>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="duration" />
              <div>
                <label htmlFor="duration" className="font-medium cursor-pointer text-sm">Set estimated course duration</label>
                <p className="text-sm text-gray-600">This time duration will be displayed on the course landing page and across all your course and sales widgets.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Reviews</h3>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="ratings" defaultChecked />
              <div>
                <label htmlFor="ratings" className="font-medium cursor-pointer text-sm">Enable course ratings and reviews</label>
                <p className="text-sm text-gray-600">Allows your learners to share their feedback about the course.</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="certificate" className="space-y-8">
          <div className="bg-white border rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Enable certificate</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Enable this option to issue certificates to your learners after completion.
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Certificate template</label>
              <Select defaultValue="default">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select certificate template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default template</SelectItem>
                  <SelectItem value="modern">Modern template</SelectItem>
                  <SelectItem value="classic">Classic template</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="completion" />
              <div>
                <label htmlFor="completion" className="font-medium cursor-pointer text-sm">Issue certificate on course completion</label>
                <p className="text-sm text-gray-600">Certificate will be issued when learner completes all lessons.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="expiry" />
              <div>
                <label htmlFor="expiry" className="font-medium cursor-pointer text-sm">Set certificate expiry date</label>
                <p className="text-sm text-gray-600">Certificate will expire after the specified period.</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="registration" className="space-y-8">
          <div className="bg-white border rounded-lg p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Registration settings</h3>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="auto-approve" />
                <div>
                  <label htmlFor="auto-approve" className="font-medium cursor-pointer text-sm">Auto-approve registrations</label>
                  <p className="text-sm text-gray-600">Automatically approve new registrations without manual review.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="restrict-emails" />
                <div>
                  <label htmlFor="restrict-emails" className="font-medium cursor-pointer text-sm">Restrict registration to specific email domains</label>
                  <p className="text-sm text-gray-600">Only allow registrations from specific email domains (e.g., company.com).</p>
                </div>
              </div>
              
              <div className="pl-6 mt-2">
                <label className="block text-sm mb-1">Allowed email domains (comma separated)</label>
                <Input placeholder="example.com, company.org" className="max-w-md" />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="max-seats" />
                <div>
                  <label htmlFor="max-seats" className="font-medium cursor-pointer text-sm">Limit maximum number of seats</label>
                  <p className="text-sm text-gray-600">Set a maximum number of learners who can register for this course.</p>
                </div>
              </div>
              
              <div className="pl-6 mt-2">
                <label className="block text-sm mb-1">Maximum seats</label>
                <Input type="number" defaultValue="100" className="max-w-md" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTab;
