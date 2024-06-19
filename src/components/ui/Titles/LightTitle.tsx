import { FC } from "react";

interface titleProps {
  title: string;
  className: string;
}

const LightTitle: FC<titleProps> = ({ title, className }) => {
  return <p className={` ${className}  font-normal `}>{title}</p>;
};

export default LightTitle;
