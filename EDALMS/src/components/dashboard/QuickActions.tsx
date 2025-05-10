
import { BookOpen, PenLine, Globe, Globe2 } from "lucide-react";
import QuickActionCard from "./QuickActionCard";

const QuickActions = () => {
  const actions = [
    {
      title: "Create a course",
      description: "Set up your first course and configure its lessons, tests, setup etc.",
      icon: <BookOpen className="text-primary" size={24} />,
      completed: false,
    },
    {
      title: "Customize academy site",
      description: "Customize your academy/institute site and configure its navigation and language.",
      icon: <PenLine className="text-primary" size={24} />,
      completed: false,
    },
    {
      title: "Take your academy live",
      description: "Take your academy online and make your first sale.",
      icon: <Globe className="text-primary" size={24} />,
      completed: false,
    },
    {
      title: "Configure custom domain",
      description: "Add your custom domain for better branding.",
      icon: <Globe2 className="text-primary" size={24} />,
      completed: false,
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium text-secondary mb-4">Take your training expertise online!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <QuickActionCard
            key={index}
            title={action.title}
            description={action.description}
            icon={action.icon}
            completed={action.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
