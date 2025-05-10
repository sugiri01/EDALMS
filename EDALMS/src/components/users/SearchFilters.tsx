
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

interface SearchFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const SearchFilters = ({ searchValue, onSearchChange }: SearchFiltersProps) => {
  return (
    <div className="flex justify-between items-center pb-4">
      <div className="flex gap-2">
        <div className="relative">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Choose filter
          </Button>
        </div>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search for a user by name or email"
            className="pl-10"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <Button variant="outline">
        Saved filters
      </Button>
    </div>
  );
};
