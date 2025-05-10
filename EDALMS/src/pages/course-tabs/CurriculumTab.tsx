
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Grip, Pencil, MoreHorizontal, Download } from "lucide-react";

interface CourseData {
  id: string;
  title: string;
}

const CurriculumTab = () => {
  const course = useOutletContext<CourseData>();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Grip className="text-gray-400" size={18} />
          <h2 className="font-medium">{course.title}</h2>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Pencil className="h-3 w-3" />
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          1 Lessons
        </div>
      </div>

      <div className="border border-gray-200 rounded-md mb-6">
        <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Grip className="text-gray-400" size={18} />
            <h3 className="font-medium">Lesson 1</h3>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">Draft</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500">PDF</p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-md mb-6 border-dashed p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Grip className="text-gray-400 opacity-50" size={18} />
            <h3 className="font-medium text-gray-500">UNTITLED CHAPTER</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
          <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
            Add Chapters Using AI
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="border-gray-300">
          Add Lesson
        </Button>
        <Button variant="outline" className="border-gray-300">
          Add live lesson
        </Button>
        <Button variant="outline" className="border-gray-300">
          Add assignment
        </Button>
      </div>
    </div>
  );
};

export default CurriculumTab;
