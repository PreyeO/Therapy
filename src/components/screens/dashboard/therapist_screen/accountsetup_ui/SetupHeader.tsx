import { FC } from "react";

interface HeadingProps {
  title: string;
  subtitle: string;
}

const SetupHeader: FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <header className="flex flex-col gap-2">
      <h2 className="text-[#041827] text-3xl font-medium">{title}</h2>
      <p className="text-[#041827B2] font-normal text-xl leading-[24.8px]">
        {subtitle}
      </p>
    </header>
  );
};

export default SetupHeader;
