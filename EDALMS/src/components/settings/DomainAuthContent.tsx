
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Info } from "lucide-react";

const DomainAuthContent = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">List of domains</h2>
        <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
          <span>Add domain</span>
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-2 px-4 font-medium">Domain name</th>
              <th className="text-left py-2 px-4 font-medium">SPF</th>
              <th className="text-left py-2 px-4 font-medium">DKIM</th>
              <th className="text-right py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4 px-4">edathena.com</td>
              <td className="py-4 px-4">
                <span className="text-green-600">Verified</span>{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">Verify</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-red-600">Not verified</span>{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">Verify</span>
              </td>
              <td className="py-4 px-4 text-right">
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Trash2 size={18} />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DomainAuthContent;
