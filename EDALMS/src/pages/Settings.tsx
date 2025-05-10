
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Settings as SettingsIcon,
  User,
  Globe,
  CreditCard,
  Link,
  Activity,
  FileText,
  Sparkles,
  GraduationCap,
} from "lucide-react";

// Import settings tab contents
import PlanDetailsContent from "@/components/settings/PlanDetailsContent";
import GeneralSettingsContent from "@/components/settings/GeneralSettingsContent";
import UserProfileContent from "@/components/settings/UserProfileContent";
import DomainAuthContent from "@/components/settings/DomainAuthContent";
import PaymentsContent from "@/components/settings/PaymentsContent";
import IntegrationsContent from "@/components/settings/IntegrationsContent";
import ActivitiesContent from "@/components/settings/ActivitiesContent";
import FormsContent from "@/components/settings/FormsContent";
import AISettingsContent from "@/components/settings/AISettingsContent";
import AcademySettingsContent from "@/components/settings/AcademySettingsContent";

const settingsTabs = [
  { id: "plan", label: "Manage Plan Details", icon: SettingsIcon },
  { id: "general", label: "General Settings", icon: SettingsIcon },
  { id: "profile", label: "User Profile", icon: User },
  { id: "domain", label: "Domain Authentication", icon: Globe },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Link },
  { id: "activities", label: "Activities", icon: Activity },
  { id: "forms", label: "Forms", icon: FileText },
  { id: "ai", label: "AI Settings", icon: Sparkles },
  { id: "academy", label: "Academy Settings", icon: GraduationCap },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("plan");

  // Function to get the active tab label
  const getActiveTabLabel = () => {
    const tab = settingsTabs.find(tab => tab.id === activeTab);
    return tab?.label || "Settings";
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Settings</h1>
      </div>

      <div className="flex flex-col space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
            <TabsList className="bg-transparent border-b w-full rounded-none justify-start h-auto overflow-x-auto">
              {settingsTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`py-3 px-4 rounded-none ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="plan">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Plan Details</CardTitle>
                <CardDescription>Manage your subscription and usage limits</CardDescription>
              </CardHeader>
              <CardContent>
                <PlanDetailsContent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure course behavior and platform features</CardDescription>
              </CardHeader>
              <CardContent>
                <GeneralSettingsContent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Edit your profile information visible to learners</CardDescription>
              </CardHeader>
              <CardContent>
                <UserProfileContent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domain">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Domain Authentication</CardTitle>
                <CardDescription>Manage domains and email verification settings</CardDescription>
              </CardHeader>
              <CardContent>
                <DomainAuthContent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Payments</CardTitle>
                <CardDescription>Configure payment gateways and options</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentsContent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect to third-party services and tools</CardDescription>
              </CardHeader>
              <CardContent>
                <IntegrationsContent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Activities</CardTitle>
                <CardDescription>View and manage user activity logs</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivitiesContent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Forms</CardTitle>
                <CardDescription>Create and manage registration and contact forms</CardDescription>
              </CardHeader>
              <CardContent>
                <FormsContent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>AI Settings</CardTitle>
                <CardDescription>Configure AI assistance for content creation</CardDescription>
              </CardHeader>
              <CardContent>
                <AISettingsContent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academy">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Academy Settings</CardTitle>
                <CardDescription>Customize your academy branding and appearance</CardDescription>
              </CardHeader>
              <CardContent>
                <AcademySettingsContent />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
