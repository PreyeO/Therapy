interface ContentTitleProps {
  title: string;
}

const ContentTitle: React.FC<ContentTitleProps> = ({ title }) => {
  return (
    <h3 className="text-[17px]  font-normal text-back opacity-[0.7]">
      {title}
    </h3>
  );
};

export default ContentTitle;
