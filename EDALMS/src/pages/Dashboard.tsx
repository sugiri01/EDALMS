
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import ActivityChart from "@/components/dashboard/ActivityChart";
import QuickActions from "@/components/dashboard/QuickActions";
import VideoOverview from "@/components/dashboard/VideoOverview";

const Dashboard = () => {
  return (
    <div>
      <WelcomeSection />
      <ActivityChart />
      <QuickActions />
      <div className="grid grid-cols-1 gap-6">
        <VideoOverview />
      </div>
    </div>
  );
};

export default Dashboard;
