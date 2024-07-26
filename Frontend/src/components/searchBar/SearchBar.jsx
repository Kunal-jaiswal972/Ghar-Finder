import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/listings?city=${city}`);
    }
  };

  return (
    <div className="flex items-center dark:bg-gray-800 rounded-lg shadow relative">
      <Input
        className="w-full pl-4 pr-10 py-2 text-gray-900 dark:text-white bg-transparent border-none focus:ring-0"
        placeholder="Search Location"
        type="text"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Link
        to={`/listings?city=${city}`}
        className="text-gray-500 dark:text-gray-400 absolute right-3 pl-2 cursor-pointer"
      >
        <SearchIcon />
      </Link>
    </div>
  );
};

export default SearchBar;
