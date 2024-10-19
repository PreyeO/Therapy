import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  label: string;
  className?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const ProfileButton: React.FC<ProfileHeaderProps> = ({
  label,
  className,
  icon,
  onClick,
}) => {
  return (
    <Button
      className={` ${className} rounded-full flex gap-[1.5px] font-medium text-[12px] w-[169px] `}
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
};

export default ProfileButton;
