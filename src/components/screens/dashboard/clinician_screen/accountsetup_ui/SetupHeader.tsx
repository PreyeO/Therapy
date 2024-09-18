import { FC } from "react";

interface HeadingProps {
  title: string;
  subtitle: string;
}

const SetupHeader: FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <header className="flex flex-col gap-3 items-center">
      <h2 className="text-[#041827] text-base md:text-2xl lg:text-3xl font-medium">
        {title}
      </h2>
      <p className="text-[#041827B2] font-normal text-base md:text-lg lg:text-xl leading-[24.8px] w-[700px]">
        {subtitle}
      </p>
    </header>
  );
};

export default SetupHeader;
