interface ProfileTitleProps {
  title: string;
  className?: string;
}

const ProfileTitle: React.FC<ProfileTitleProps> = ({ title, className }) => {
  return <h3 className={` ${className} font-bold text-lg`}>{title}</h3>;
};

export default ProfileTitle;
