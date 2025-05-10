
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, RefreshCw } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import UserRole from "./UserRole";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
  joined: string;
}

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  title: string;
  onAddUser: () => void;
  onUserUpdated: () => void;
}

export const UserTable = ({ users, isLoading, title, onAddUser, onUserUpdated }: UserTableProps) => {
  // Special highlight for our target user
  const isTargetUser = (email: string) => email === "sudhirgiri.g@gmail.com";
  const [refreshing, setRefreshing] = useState(false);
  const [localUsers, setLocalUsers] = useState<User[]>([]);
  
  // Sync local state with props
  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onUserUpdated();
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Log the state for debugging
  console.log(`UserTable render - ${title}:`, { 
    usersCount: users.length,
    localUsersCount: localUsers.length,
    isLoading, 
    refreshing,
    users
  });

  // Determine if we should show loading state
  const showLoading = isLoading || refreshing;
  
  // Target user exists check
  const targetUserExists = users.some(user => isTargetUser(user.email));
  console.log("Target user exists in table:", targetUserExists);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="gap-1" 
            onClick={handleRefresh}
            disabled={showLoading}
          >
            <RefreshCw size={16} className={showLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <Button size="sm" variant="outline" className="gap-1" onClick={onAddUser}>
            <Plus size={16} />
            Add {title}
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last login</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-20">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showLoading ? (
            <>
              <TableRow>
                <TableCell colSpan={7} className="py-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-[250px]" />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={7} className="py-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </TableCell>
              </TableRow>
            </>
          ) : localUsers.length > 0 ? (
            localUsers.map((user) => (
              <TableRow key={user.id} className={isTargetUser(user.email) ? "bg-blue-50" : ""}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {isTargetUser(user.email) ? (
                    <span className="font-semibold">{user.email}</span>
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  <UserRole 
                    userId={user.id} 
                    email={user.email} 
                    currentRole={user.role} 
                    onRoleUpdate={onUserUpdated} 
                  />
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  `No ${title.toLowerCase()} found`
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {localUsers.length > 0 && (
        <div className="p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
