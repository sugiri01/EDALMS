
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, File, Video, FileText, Image, Award } from "lucide-react";

const libraryTabs = [
  { id: "materials", label: "Materials", icon: File },
  { id: "recordings", label: "Recordings", icon: Video },
  { id: "pdfs", label: "PDFs", icon: FileText },
  { id: "images", label: "Images", icon: Image },
  { id: "certificates", label: "Certificate Templates", icon: Award },
];

const Library = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary">Library</h1>
        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
          <Upload size={18} />
          Upload
        </Button>
      </div>
      
      <Tabs defaultValue="materials" className="mb-6">
        <div className="bg-white rounded-lg shadow-card overflow-x-auto">
          <TabsList className="bg-transparent p-1">
            {libraryTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="data-[state=active]:bg-gray-100 flex items-center gap-2"
              >
                <tab.icon size={16} />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {libraryTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-card">
              <div className="mb-4 text-gray-400">
                <tab.icon size={48} />
              </div>
              <h3 className="text-xl font-medium text-secondary mb-2">
                No {tab.label.toLowerCase()} yet
              </h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                Upload your {tab.label.toLowerCase()} to access them across your courses and workshops.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
                <Upload size={18} />
                Upload {tab.label}
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Library;
