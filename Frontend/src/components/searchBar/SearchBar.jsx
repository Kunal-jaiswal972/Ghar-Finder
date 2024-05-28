import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center dark:bg-gray-800 rounded-lg shadow relative">
      <Input
        className="w-full pl-4 pr-10 py-2 text-gray-900 dark:text-white bg-transparent border-none focus:ring-0"
        placeholder="Search Location"
        type="text"
      />
      <SearchIcon className="text-gray-500 dark:text-gray-400 absolute right-3 pl-2 cursor-pointer" />
    </div>
  );
};

export default SearchBar;
