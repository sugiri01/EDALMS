
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar } from "lucide-react";

const Workshops = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary">Live Workshops</h1>
        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
          <Plus size={18} />
          Create Session
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" className="mb-6">
        <div className="bg-white rounded-lg p-1 shadow-card w-fit">
          <TabsList className="bg-transparent">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-gray-100">
              Upcoming Sessions
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-gray-100">
              Past Sessions
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-card">
            <div className="mb-4 text-gray-400">
              <Calendar size={48} />
            </div>
            <h3 className="text-xl font-medium text-secondary mb-2">Schedule a session</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              You do not have any sessions listed currently. Create a new session to get started.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
              <Plus size={18} />
              Create Session
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-card">
            <div className="mb-4 text-gray-400">
              <Calendar size={48} />
            </div>
            <h3 className="text-xl font-medium text-secondary mb-2">No past sessions</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              You have not conducted any sessions yet. Past sessions will appear here after completion.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workshops;
