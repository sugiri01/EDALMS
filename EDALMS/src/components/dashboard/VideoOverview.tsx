
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

const VideoOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-secondary">A quick overview of EDATHENA LMS</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">Watch this short product demo video to learn how to create your first course, configure your academy website, manage learners and much more.</p>
        
        <div className="relative rounded-lg overflow-hidden aspect-video">
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                <Play fill="white" className="text-white ml-1" size={24} />
              </div>
              <div className="animate-ping w-16 h-16 rounded-full bg-primary/30 absolute top-0 left-0"></div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="text-white text-sm font-medium">EDATHENA LMS Product Demo</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="relative rounded overflow-hidden aspect-video bg-gray-100">
            <img src="public/placeholder.svg" alt="Platform screenshot" className="w-full h-full object-cover" />
          </div>
          <div className="relative rounded overflow-hidden aspect-video bg-gray-100">
            <img src="public/placeholder.svg" alt="Platform screenshot" className="w-full h-full object-cover" />
          </div>
          <div className="relative rounded overflow-hidden aspect-video bg-gray-100">
            <img src="public/placeholder.svg" alt="Platform screenshot" className="w-full h-full object-cover" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoOverview;
