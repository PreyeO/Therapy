import { Button } from "@/components/ui/button";
import Title from "@/components/ui/Titles/Title";
import { FC } from "react";

interface OverlayHeadingProps {
  onClick?: () => void;
  title: string;
  label: string;
}

const OverlayHeading: FC<OverlayHeadingProps> = ({ onClick, title, label }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Title
          title={title}
          className="lg:text-xl md:text-base  text-sm font-bold"
        />
        <Button
          onClick={onClick}
          className="lg:w-[109px] w-[90px] rounded-full text-base font-medium h-[31px] lg:h-[37px]"
          type="submit"
        >
          {label}
        </Button>
      </div>
      <div className="p-[1px] w-full bg-[#E7E7E7] mt-3 mx-auto"></div>
    </div>
  );
};

export default OverlayHeading;
