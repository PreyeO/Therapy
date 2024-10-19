import { FC, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ButtonLoaderProps {
  loading: boolean;
  text?: string; // Make text optional
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode; // Add children prop
}

const ButtonLoader: FC<ButtonLoaderProps> = ({
  loading,
  text,
  disabled,
  onClick,
  className,
  children,
}) => {
  return (
    <Button
      type="submit"
      className={`${className}  bg-army_green font-semibold text-white hover:bg-army_green  ${
        loading ? "cursor-not-allowed" : ""
      }`}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <span className="spinner-border spinner-border-sm"></span>
          Please wait...
        </div>
      ) : (
        children || text // Render children if passed, otherwise fallback to text
      )}
    </Button>
  );
};

export default ButtonLoader;
