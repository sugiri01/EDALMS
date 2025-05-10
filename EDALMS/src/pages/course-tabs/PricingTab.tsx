
import { useOutletContext, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CourseData {
  id: string;
}

const PricingTab = () => {
  const course = useOutletContext<CourseData>();
  const location = useLocation();
  const activeSubTab = location.hash ? location.hash.substring(1) : "tickets";

  return (
    <div>
      <Tabs defaultValue={activeSubTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="tickets" className="data-[state=active]:bg-primary data-[state=active]:text-white">Tickets</TabsTrigger>
          <TabsTrigger value="coupons" className="data-[state=active]:bg-primary data-[state=active]:text-white">Coupons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets" className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Configure Course Pricing</h3>
            <p className="text-gray-600 mb-6">Select your payment method for this course</p>
            
            <RadioGroup defaultValue="free" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative">
                <RadioGroupItem value="free" id="free" className="absolute right-4 top-4 peer" />
                <Label htmlFor="free" className="cursor-pointer">
                  <div className="font-medium mb-1">Free</div>
                  <p className="text-xs text-gray-600">Allow learners free access to this course.</p>
                </Label>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative opacity-70">
                <RadioGroupItem value="one-time" id="one-time" className="absolute right-4 top-4" disabled />
                <Label htmlFor="one-time" className="cursor-pointer">
                  <div className="font-medium mb-1">One-Time Payment</div>
                  <p className="text-xs text-gray-600">Charge a one time fee to access the course.</p>
                </Label>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative opacity-70">
                <RadioGroupItem value="subscription" id="subscription" className="absolute right-4 top-4" disabled />
                <Label htmlFor="subscription" className="cursor-pointer">
                  <div className="font-medium mb-1">Subscription</div>
                  <p className="text-xs text-gray-600">Allow users to access this course via subscription.</p>
                </Label>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative opacity-70">
                <RadioGroupItem value="payment-plan" id="payment-plan" className="absolute right-4 top-4" disabled />
                <Label htmlFor="payment-plan" className="cursor-pointer">
                  <div className="font-medium mb-1">Payment Plan</div>
                  <p className="text-xs text-gray-600">Allow learners to pay in installments to access the course.</p>
                </Label>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative opacity-70">
                <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded">NEW</div>
                <RadioGroupItem value="ppv" id="ppv" className="absolute right-4 top-4" disabled />
                <Label htmlFor="ppv" className="cursor-pointer">
                  <div className="font-medium mb-1">PPV Payment</div>
                  <p className="text-xs text-gray-600">Allow learners to pay for specific sections or modules.</p>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-medium">Plan Name</h3>
                <p className="text-sm text-gray-600">MLOPS</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium">Price</h3>
                <p className="text-sm text-gray-600">Free</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium">Purchase URL</h3>
                <p className="text-sm text-gray-600">Course site</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium">Sale details</h3>
                <p className="text-sm text-gray-600">-</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium">Display on Site</h3>
                <p className="text-sm text-gray-600">-</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium">Actions</h3>
                <p className="text-sm text-gray-600">-</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="coupons" className="space-y-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4">
              <img src="/public/lovable-uploads/74c760c8-b74a-4495-922d-b86be9257c4e.png" alt="Coupons" className="h-32" />
            </div>
            <h3 className="text-lg font-medium mb-2">Coupons</h3>
            <p className="text-center text-gray-600 mb-4">Kindly upgrade your subscription plan to configure coupons to offer your course at a discounted price.</p>
            <Button className="bg-primary hover:bg-primary/90">Upgrade now</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingTab;
