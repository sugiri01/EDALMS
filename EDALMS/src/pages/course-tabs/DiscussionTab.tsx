
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface CourseData {
  id: string;
}

const DiscussionTab = () => {
  const course = useOutletContext<CourseData>();

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4">
        <img src="/public/lovable-uploads/64e7f94c-a369-482d-9b44-be15190c49db.png" alt="Discussion Forum" className="h-32" />
      </div>
      <h3 className="text-lg font-medium mb-2">Discussion Forum</h3>
      <p className="text-center text-gray-600 max-w-xl mb-6">
        The forum where your learners can discuss, ideate, debate on any course related 
        topics, concepts, clarifications, etc. Kindly click on "Enable Discussion" under the 
        individual lesson settings to enable this discussion forum for your learners to 
        participate in.
      </p>
      <Button className="bg-primary hover:bg-primary/90">Upgrade now</Button>
    </div>
  );
};

export default DiscussionTab;
