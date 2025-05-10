
import { useOutletContext } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

interface CourseData {
  id: string;
}

const ReportsTab = () => {
  const course = useOutletContext<CourseData>();

  return (
    <div>
      <Tabs defaultValue="learner-details" className="w-full">
        <TabsList className="w-full max-w-xl grid grid-cols-4 mb-6">
          <TabsTrigger value="learner-details" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Learner details
          </TabsTrigger>
          <TabsTrigger value="test-report" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Test report
          </TabsTrigger>
          <TabsTrigger value="assignments" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Assignments
          </TabsTrigger>
          <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Reviews
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="learner-details" className="space-y-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4">
              <img src="/public/lovable-uploads/b461e16f-e34d-4b71-ba24-c48a94d43460.png" alt="Learner Details" className="h-32" />
            </div>
            <h3 className="text-lg font-medium mb-2">Learner details</h3>
            <p className="text-center text-gray-600 max-w-xl">
              View detailed reports on your learner's activities, course progress, active 
              enrollments and much more.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="test-report" className="space-y-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4">
              <img src="/public/lovable-uploads/dae80cb3-12e7-43ac-97c6-c28a1a6bf8bc.png" alt="Test Report" className="h-32" />
            </div>
            <h3 className="text-lg font-medium mb-2">Test report</h3>
            <p className="text-center text-gray-600 max-w-xl">
              View detailed reports and results of tests that your learners have participated in as 
              they progress through the course.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-8">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-center text-gray-500">Assignment reports will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-8">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-center text-gray-500">Course reviews will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsTab;
