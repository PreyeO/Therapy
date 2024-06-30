import { FC } from "react";

interface titleProps {
  title: string;
  className: string;
}

const Title: FC<titleProps> = ({ title, className }) => {
  return <h3 className={` ${className}   `}>{title}</h3>;
};

export default Title;
