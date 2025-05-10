
import { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  collapsed: boolean;
}

const Header = ({ collapsed }: HeaderProps) => {
  const { user, userProfile, isAdmin } = useAuth();
  const userName = userProfile?.full_name || user?.user_metadata?.full_name || user?.email;
  const userInitials = userName ? userName.charAt(0).toUpperCase() : 'U';

  // Debug logs
  console.log('HeaderComponent - User:', user?.email);
  console.log('HeaderComponent - UserProfile:', userProfile);
  console.log('HeaderComponent - isAdmin:', isAdmin());

  return (
    <header className={`h-16 bg-white flex items-center justify-between border-b border-gray-200 fixed top-0 right-0 z-30 transition-all duration-300 ${collapsed ? 'left-20' : 'left-64'}`}>
      <div className="flex-1 px-6">
        <h1 className="text-xl font-bold text-secondary">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-6 px-6">
        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Search size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
          </button>
        </div>
        <div className="relative flex items-center">
          {isAdmin() && (
            <Badge variant="secondary" className="mr-2">Admin</Badge>
          )}
          <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-secondary text-white">{userInitials}</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
