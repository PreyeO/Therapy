import { Search } from "lucide-react";
import { Input } from "./input";
import { FC } from "react";

interface SearchInputProps {
  className?: string;
  placeholder: string;
  value?: string; // Add value prop for controlled input
  borderClass?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({
  className,
  placeholder,
  value, // Destructure value prop
  onChange,
}) => {
  return (
    <div className={`flex items-center px-6  ${className}`}>
      <Search
        strokeWidth={2}
        color="#868686"
        size={20}
        className="cursor-pointer"
      />
      <Input
        value={value}
        placeholder={placeholder}
        className="focus:ring-transparent border-none"
        onChange={(e) => onChange && onChange(e.target.value)} // Handle change event
      />
    </div>
  );
};

export default SearchInput;
