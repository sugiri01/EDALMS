
import { useState } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("MLOps");
  
  // Mock data for the selected course
  const course = {
    id: courseId,
    title: "MLOps",
    status: "Draft",
    description: "You have not given a description for your session.",
    url: "https://eda1.trainercentral.site/in/course/mlops",
    category: "You have not chosen any category yet.",
    image: "/placeholder.svg"
  };
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold">{course.title}</h1>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {course.status}
            </span>
          </div>
          
          <Button className="flex items-center gap-2">
            <Eye size={16} />
            <span>Preview Course</span>
          </Button>
        </div>
        
        <div className="border-b border-gray-200">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b-0 p-0">
              <TabsTrigger 
                value="details" 
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none px-4 py-2 bg-transparent"
                onClick={() => navigate(`/courses/${courseId}`)}
              >
                Course Details
              </TabsTrigger>
              <TabsTrigger 
                value="curriculum" 
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none px-4 py-2 bg-transparent"
                onClick={() => navigate(`/courses/${courseId}/curriculum`)}
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none px-4 py-2 bg-transparent"
                onClick={() => navigate(`/courses/${courseId}/settings`)}
              >
                Settings
              </TabsTrigger>
              <TabsTrigger 
                value="pricing" 
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none px-4 py-2 bg-transparent"
                onClick={() => navigate(`/courses/${courseId}/pricing`)}
              >
                Pricing
              </TabsTrigger>
              <TabsTrigger 
                value="drip" 
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none px-4 py-2 bg-transparent"
                onClick={() => navigate(`/courses/${courseId}/drip`)}
              >
                Drip
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none px-4 py-2 bg-transparent"
                onClick={() => navigate(`/courses/${courseId}/reports`)}
              >
                Reports
              </TabsTrigger>
              <TabsTrigger 
                value="discussion" 
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none px-4 py-2 bg-transparent"
                onClick={() => navigate(`/courses/${courseId}/discussion`)}
              >
                Discussion Forum
              </TabsTrigger>
              <TabsTrigger 
                value="publish" 
                className="data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none px-4 py-2 bg-transparent"
                onClick={() => navigate(`/courses/${courseId}/publish`)}
              >
                Publish
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <Outlet context={course} />
      </div>
    </div>
  );
};

export default CourseDetails;
