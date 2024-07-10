import { Search } from "lucide-react";
import { Input } from "./input";
import { FC } from "react";

interface SearchInputProps {
  className?: string;
  placeholder: string;
  borderClass?: string;
  readOnly?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({ className, placeholder }) => {
  return (
    <div className={`flex items-center px-6 ${className}`}>
      <Search
        strokeWidth={2}
        color="#868686"
        size={20}
        className=" cursor-pointer"
      />
      <Input
        placeholder={placeholder}
        className="focus:ring-transparent border-none"
      />
    </div>
  );
};

export default SearchInput;
