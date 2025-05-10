
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CourseData {
  id: string;
}

const PublishTab = () => {
  const course = useOutletContext<CourseData>();

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Publish this course</h3>
        <p className="text-gray-600">This course is yet to be published. You can publish it now or schedule this to be published later.</p>
        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90">Publish now</Button>
          <Button variant="outline">Schedule it later</Button>
        </div>
      </div>
      
      <div className="border-t pt-8 space-y-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <img src="/public/lovable-uploads/e7b7f38d-0906-40f3-8bc8-5ff22378a851.png" alt="Create website" className="h-24" />
          </div>
          <h3 className="text-lg font-medium mb-2">Create a website for your course</h3>
          <p className="text-gray-600 max-w-xl mb-4">
            Build a dedicated website for your course to help you promote and market your course better.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600">Create Site</Button>
        </div>
      </div>
    </div>
  );
};

export default PublishTab;
