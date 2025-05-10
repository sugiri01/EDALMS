
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const PlanDetailsContent = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium mb-2">Plan Details</h2>
        <p className="text-sm text-gray-600">You are in the free plan now.</p>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <span>Storage Space: 456.36 MB out of 5 GB used.</span>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm mb-1">Select the plan</label>
          <Select defaultValue="starter">
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starter">Starter Plan</SelectItem>
              <SelectItem value="professional">Professional Plan</SelectItem>
              <SelectItem value="enterprise">Enterprise Plan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm mb-1">Live participant add-on</label>
          <Select defaultValue="none">
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select an add-on" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="25">25 participants</SelectItem>
              <SelectItem value="50">50 participants</SelectItem>
              <SelectItem value="100">100 participants</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between">
          <div>
            <Select defaultValue="usd">
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">$ USD</SelectItem>
                <SelectItem value="eur">€ EUR</SelectItem>
                <SelectItem value="gbp">£ GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-end">
            <ToggleGroup type="single" value={billingCycle} onValueChange={(val) => val && setBillingCycle(val)}>
              <ToggleGroupItem value="monthly" className="px-4 rounded-l text-sm">Monthly</ToggleGroupItem>
              <ToggleGroupItem value="yearly" className="px-4 rounded-r text-sm">Yearly</ToggleGroupItem>
            </ToggleGroup>

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-500">$</div>
              <div className="text-3xl font-bold">20</div>
              <div className="text-sm text-gray-500">/month</div>
            </div>

            <div className="mt-2 text-sm text-gray-500 text-center">
              Local taxes will be charged in addition<br />to the prices mentioned
            </div>

            <Button className="mt-4 bg-orange-500 hover:bg-orange-600 w-full">Buy now</Button>
          </div>
        </div>

        <div className="text-center text-sm text-green-500 mt-4">
          Save 2 months' worth of costs with the yearly plan
        </div>
      </div>

      <div className="text-sm">
        Need more help choosing the right plan? <a href="#" className="text-primary hover:underline">Check out our buyer guide</a> for a detailed feature comparison.
      </div>
    </div>
  );
};

export default PlanDetailsContent;
