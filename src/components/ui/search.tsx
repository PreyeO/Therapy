import { Search } from "lucide-react";
import { Input } from "./input";
import { FC } from "react";

interface SearchInputProps {
  className?: string;
  placeholder: string;
  borderClass?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void; // Add onChange prop
}

const SearchInput: FC<SearchInputProps> = ({
  className,
  placeholder,
  onChange,
}) => {
  return (
    <div className={`flex items-center px-6 ${className}`}>
      <Search
        strokeWidth={2}
        color="#868686"
        size={20}
        className="cursor-pointer"
      />
      <Input
        placeholder={placeholder}
        className="focus:ring-transparent border-none"
        onChange={(e) => onChange && onChange(e.target.value)} // Pass input value to parent
      />
    </div>
  );
};

export default SearchInput;
