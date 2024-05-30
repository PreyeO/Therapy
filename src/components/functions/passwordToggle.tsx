import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

const PasswordToggle = ({ field, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        className="h-16 text-placeholder_text font-sm font-normal pr-10"
        autoComplete="false"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...field}
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
