
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Workshops from "./pages/Workshops";
import Library from "./pages/Library";
import Sales from "./pages/Sales";
import Users from "./pages/Users";
import Emails from "./pages/Emails";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Course Details Pages
import CourseDetails from "./pages/CourseDetails";
import CourseDetailsTab from "./pages/course-tabs/CourseDetailsTab";
import CurriculumTab from "./pages/course-tabs/CurriculumTab";
import SettingsTab from "./pages/course-tabs/SettingsTab";
import PricingTab from "./pages/course-tabs/PricingTab";
import DripTab from "./pages/course-tabs/DripTab";
import ReportsTab from "./pages/course-tabs/ReportsTab";
import DiscussionTab from "./pages/course-tabs/DiscussionTab";
import PublishTab from "./pages/course-tabs/PublishTab";

// Learner Pages (placeholder components will be created)
import MyTeam from "./pages/learner/MyTeam";
import Products from "./pages/learner/Products";
import Payments from "./pages/learner/Payments";
import Rewards from "./pages/learner/Rewards";
import Profile from "./pages/learner/Profile";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              
              {/* Root redirect to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                {/* Common routes */}
                <Route path="dashboard" element={<Dashboard />} />
                
                {/* Admin routes */}
                <Route path="courses" element={<ProtectedRoute requireAdmin={true}><Courses /></ProtectedRoute>} />
                
                {/* Course Details Routes - Admin only */}
                <Route path="courses/:courseId" element={<ProtectedRoute requireAdmin={true}><CourseDetails /></ProtectedRoute>}>
                  <Route index element={<CourseDetailsTab />} />
                  <Route path="curriculum" element={<CurriculumTab />} />
                  <Route path="settings" element={<SettingsTab />} />
                  <Route path="pricing" element={<PricingTab />} />
                  <Route path="drip" element={<DripTab />} />
                  <Route path="reports" element={<ReportsTab />} />
                  <Route path="discussion" element={<DiscussionTab />} />
                  <Route path="publish" element={<PublishTab />} />
                </Route>
                
                <Route path="workshops" element={<ProtectedRoute requireAdmin={true}><Workshops /></ProtectedRoute>} />
                <Route path="library" element={<ProtectedRoute requireAdmin={true}><Library /></ProtectedRoute>} />
                <Route path="sales" element={<ProtectedRoute requireAdmin={true}><Sales /></ProtectedRoute>} />
                <Route path="users" element={<ProtectedRoute requireAdmin={true}><Users /></ProtectedRoute>} />
                <Route path="emails" element={<ProtectedRoute requireAdmin={true}><Emails /></ProtectedRoute>} />
                <Route path="settings" element={<ProtectedRoute requireAdmin={true}><Settings /></ProtectedRoute>} />
                
                {/* Learner routes */}
                <Route path="my-team" element={<ProtectedRoute><MyTeam /></ProtectedRoute>} />
                <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
                <Route path="rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
                <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
