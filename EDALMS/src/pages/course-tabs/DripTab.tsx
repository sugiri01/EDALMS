
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface CourseData {
  id: string;
}

const DripTab = () => {
  const course = useOutletContext<CourseData>();

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4">
        <img src="/public/lovable-uploads/1f4f704f-0923-4a5e-87a6-0939bc9f8d6c.png" alt="Drip Schedule" className="h-32" />
      </div>
      <h3 className="text-lg font-medium mb-2">Set Drip Schedule</h3>
      <p className="text-center text-gray-600 max-w-xl mb-6">
        A drip schedule allows you to specify on which specific date or time interval you 
        wish to release that particular lesson to your learners. This helps you control their 
        pace of learning and regulate the amount of course content that can be viewed in 
        a specific period of time. This feature is available in our higher plans.
      </p>
      <Button className="bg-primary hover:bg-primary/90">Upgrade now</Button>
    </div>
  );
};

export default DripTab;
