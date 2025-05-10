
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UserProfileContent = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 border rounded">
          <div className="bg-blue-900 w-full h-full flex items-center justify-center text-white font-bold">
            EDA
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Change photo</Button>
            <Button size="sm" variant="outline">Remove</Button>
          </div>
          <div className="text-sm text-gray-500">Maximum size: 1MB</div>
          <div className="text-sm text-gray-500">Preferred minimum resolution: 100*100</div>
          <div className="text-sm text-primary cursor-pointer hover:underline">(or) Take a photo</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" defaultValue="EdAthena" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" placeholder="Last name" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">Organization</Label>
        <Input id="organization" placeholder="Your organization name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input id="occupation" placeholder="E.g. Home-based teacher, Corporate trainer" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Add your skills:</Label>
        <Input id="skills" placeholder="Enter your skills..." />
        <p className="text-xs text-gray-500">Note: To separate skills, press enter or tab or use commas.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="aboutMe">About me</Label>
        <Textarea 
          id="aboutMe" 
          placeholder="Tell learners about yourself - your skills, credentials, achievements, certificates, and anything else you want them to know." 
          className="min-h-[100px]"
        />
        <div className="text-right text-xs text-gray-500">Characters left: 2000</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" placeholder="Eg: https://www.xyz.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter</Label>
          <Input id="twitter" placeholder="Eg: https://www.x.com/xyz" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="facebook">Facebook</Label>
          <Input id="facebook" placeholder="Eg: https://www.facebook.com/xyz" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" placeholder="Eg: https://www.linkedin.com/xyz" />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Reset</Button>
        <Button className="bg-orange-500 hover:bg-orange-600">Save</Button>
      </div>
    </div>
  );
};

export default UserProfileContent;
