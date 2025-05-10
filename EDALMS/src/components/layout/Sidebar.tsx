
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  Folder,
  DollarSign,
  Users,
  Mail,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Package,
  Wallet,
  Award,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const { signOut, userProfile, isAdmin, isLearner, isTrainer } = useAuth();
  
  const adminNavItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Live Workshop', path: '/workshops', icon: Video },
    { name: 'Library', path: '/library', icon: Folder },
    { name: 'Sales', path: '/sales', icon: DollarSign },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Emails', path: '/emails', icon: Mail },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];
  
  const learnerNavItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'My Team', path: '/my-team', icon: Users },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Payments', path: '/payments', icon: Wallet },
    { name: 'Rewards', path: '/rewards', icon: Award },
    { name: 'Profile', path: '/profile', icon: User },
  ];
  
  const trainerNavItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Live Workshop', path: '/workshops', icon: Video },
    { name: 'Profile', path: '/profile', icon: User },
  ];
  
  // Select nav items based on user role
  let navItems = adminNavItems;
  if (isLearner()) {
    navItems = learnerNavItems;
  } else if (isTrainer()) {
    navItems = trainerNavItems;
  }

  return (
    <aside className={`bg-sidebar h-screen fixed top-0 left-0 z-40 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        <div className="flex items-center">
          {!collapsed && (
            <div className="text-white font-bold text-xl">EDATHENA</div>
          )}
          {collapsed && (
            <div className="text-white font-bold text-xl">E</div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-white/10 p-1 rounded"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="py-4">
        <div className="px-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-secondary font-bold">
              {collapsed ? "E" : "EA"}
            </div>
            {!collapsed && (
              <div className="text-white font-medium">
                {userProfile?.full_name || "EDATHENA Academy"}
              </div>
            )}
          </div>
        </div>

        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
              }
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
        <button 
          onClick={signOut}
          className={`sidebar-item w-full ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
