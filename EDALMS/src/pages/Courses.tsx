
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, LayoutGrid, List, ChevronDown } from "lucide-react";

const courses = [
  { id: 1, title: "MLOps (Machine Learning Operations)", enrollments: 0, status: "Created", image: "/placeholder.svg" },
  { id: 2, title: "LLM", enrollments: 0, status: "Created", image: "/placeholder.svg" },
  { id: 3, title: "Applied Statistics", enrollments: 0, status: "Created", image: "/placeholder.svg" },
  { id: 4, title: "Machine Learning", enrollments: 0, status: "Created", image: "/placeholder.svg" },
  { id: 5, title: "SQL & Databases", enrollments: 0, status: "Created", image: "/placeholder.svg" },
  { id: 6, title: "Data Analytics", enrollments: 0, status: "Created", image: "/placeholder.svg" },
  { id: 7, title: "Artificial Intelligence", enrollments: 0, status: "Created", image: "/placeholder.svg" },
  { id: 8, title: "Python", enrollments: 0, status: "Created", image: "/placeholder.svg" },
];

const Courses = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();
  
  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary">Courses</h1>
        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
          <Plus size={18} />
          Create Course
        </Button>
      </div>
      
      <div className="bg-white rounded-lg p-4 mb-6 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search courses..." 
              className="pl-10 bg-white border border-gray-200"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter by:</span>
              <button className="flex items-center gap-1 text-sm bg-white border border-gray-200 rounded px-3 py-1.5">
                All <ChevronDown size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <button className="flex items-center gap-1 text-sm bg-white border border-gray-200 rounded px-3 py-1.5">
                Created Date <ChevronDown size={16} />
              </button>
            </div>
            <div className="flex border border-gray-200 rounded overflow-hidden">
              <button 
                className={`p-2 ${viewType === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewType("grid")}
              >
                <LayoutGrid size={18} className="text-gray-600" />
              </button>
              <button 
                className={`p-2 ${viewType === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewType("list")}
              >
                <List size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={viewType === "grid" ? 
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : 
        "space-y-4"
      }>
        {courses.map((course) => (
          <Card 
            key={course.id} 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCourseClick(course.id)}
          >
            <div className="aspect-video bg-gray-100">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-secondary line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-gray-500">{course.enrollments} enrollments</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  {course.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
