
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  completed?: boolean;
}

const QuickActionCard = ({ title, description, icon, completed = false }: QuickActionCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex-shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="text-secondary font-medium mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 p-4 flex justify-end">
        {completed ? (
          <span className="flex items-center gap-1 text-sm text-primary">
            <Check size={16} /> Completed
          </span>
        ) : (
          <button className="text-sm text-primary hover:text-primary/80">Start Now</button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuickActionCard;
