import { FC } from "react";

interface titleProps {
  title: string;
}

const SubTitle: FC<titleProps> = ({ title }) => {
  return (
    <p className="md:text-lg text-base font-normal text-[#BDBDBD]">{title}</p>
  );
};

export default SubTitle;
