
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const WelcomeSection = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-card flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Welcome to EDATHENA LMS!</h1>
        <p className="text-gray-500">edathena@email.com</p>
      </div>
      <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
        <Plus size={18} />
        Create Course
      </Button>
    </div>
  );
};

export default WelcomeSection;
