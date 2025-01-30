interface ContentSubtitleProps {
  content: string;
}

const ContentSubtitle: React.FC<ContentSubtitleProps> = ({ content }) => {
  return (
    <p className="text-[17px]  font-normal  text-[#041827]  text-opacity-100">
      {content}
    </p>
  );
};

export default ContentSubtitle;
