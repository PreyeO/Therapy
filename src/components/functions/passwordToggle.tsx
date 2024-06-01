import { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordToggleProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  placeholder: string;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({
  field,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
    if (!showPassword) {
      setShowPassword(true);
    }
  };

  return (
    <div className="relative">
      <Input
        className="h-16 text-placeholder_text font-sm font-normal pr-10"
        autoComplete="false"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={field.value}
        onChange={handlePasswordChange}
      />
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeOff
            size={20}
            fill="white"
            className="cursor-pointer"
            color="gray"
          />
        ) : (
          <Eye size={20} fill="white" className="cursor-pointer" color="gray" />
        )}
      </span>
    </div>
  );
};

export default PasswordToggle;
