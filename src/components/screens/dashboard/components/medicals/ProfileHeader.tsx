import { DialogTrigger } from "@/components/ui/dialog";
import ProfileTitle from "@/components/ui/Titles/ProfileTitle";
import ProfileButton from "./ProfileButton";
import { Dialog } from "@radix-ui/react-dialog";

interface ProfileHeaderProps {
  label: string;
  title: string;
  icon: React.ReactNode;
  onAdd?: () => void; // Add function to trigger the form
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  label,
  title,
  icon,
  onAdd,
}) => {
  return (
    <div className="flex justify-between">
      <ProfileTitle title={title} />
      <Dialog>
        <DialogTrigger>
          <ProfileButton icon={icon} label={label} onClick={onAdd} />{" "}
          {/* Button triggers the dialog */}
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default ProfileHeader;
