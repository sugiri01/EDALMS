
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

interface CourseData {
  id: string | undefined;
  title: string;
  description: string;
  url: string;
  category: string;
  image: string;
}

const CourseDetailsTab = () => {
  const course = useOutletContext<CourseData>();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">{course.title}</h2>
        <div className="flex items-center space-x-1">
          <p className="text-sm text-gray-600">Course URL:</p>
          <a 
            href={course.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            {course.url}
          </a>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Pencil className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Description</h3>
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Category:</h3>
          <span className="text-gray-600">{course.category}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Thumbnail</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="space-y-4">
            <div className="aspect-video w-full max-w-md mx-auto overflow-hidden bg-gray-100 border border-gray-300">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p className="text-xs"><strong>Note:</strong> This image tile will be used to represent this course across all your academy's landing pages.</p>
              <p className="mt-2">Allowed formats: ".jpg, .png, .jpeg, .gif"</p>
              <p>Preferred minimum resolution: 480*270</p>
              <p>Maximum size: 150kb</p>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-primary text-white hover:bg-primary/90">Change Image</Button>
              <Button variant="outline">Remove Image</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Trainer(s)</h3>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center font-bold text-gray-700">EA</div>
            <div>
              <p className="font-medium">EdAthena</p>
              <p className="text-sm text-gray-600">eda@edathena.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-600">Role: Admin(Trainer)</p>
            <div className="flex space-x-2">
              <Button variant="ghost" className="text-blue-600 p-0 h-auto hover:bg-transparent hover:text-blue-800">Change Trainer</Button>
              <Button variant="ghost" className="text-blue-600 p-0 h-auto hover:bg-transparent hover:text-blue-800">Edit Profile</Button>
            </div>
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Add Trainer</span>
        </Button>
      </div>
    </div>
  );
};

export default CourseDetailsTab;
