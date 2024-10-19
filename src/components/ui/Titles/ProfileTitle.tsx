interface ProfileTitleProps {
  title: string;
}

const ProfileTitle: React.FC<ProfileTitleProps> = ({ title }) => {
  return <h3 className=" font-bold text-lg">{title}</h3>;
};

export default ProfileTitle;
