// src/components/ui/ButtonLoader.tsx
import { FC } from "react";
import { Button } from "@/components/ui/button";

interface ButtonLoaderProps {
  loading: boolean;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const ButtonLoader: FC<ButtonLoaderProps> = ({
  loading,
  text,
  disabled,
  onClick,
  className,
}) => {
  return (
    <Button
      type="submit"
      className={`${className} w-full rounded-full bg-army_green font-semibold text-white hover:bg-army_green  text-base ${
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
        text
      )}
    </Button>
  );
};

export default ButtonLoader;
