import ArrowIcon from "@/assets/icon/Arrow";
import Title from "@/components/ui/Titles/Title";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FC, ReactNode } from "react";

interface AppointmentCardProps {
  className: string;
  icon: ReactNode;
  title: string;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  className,
  icon,
  title,
}) => {
  return (
    <Card className="lg:w-[372px] lg:h-[110px] w-full h-[93.61px] rounded-lg flex flex-col justify-center bg-white ">
      <CardHeader className="">
        <div className="flex lg:gap-10 items-center gap-1">
          <div
            className={` ${className} rounded-full lg:w-[64px] lg:h-[64px] h-[54.47px] w-[54.47px] flex flex-col justify-center items-center`}
          >
            {icon}
          </div>
          <div>
            <CardTitle>
              <Title
                title={title}
                className="lg:text-[12px] text-[10px] text-primary_black_text font-normal"
              />
            </CardTitle>
            <CardDescription className="flex lg:gap-7 gap-2 font-bold text-primary_black_text items-center ">
              <h2 className="lg:text-2xl text-xl">0</h2>
              <div className="flex gap-1">
                <h3 className="lg:text-[12px] text-[10px] text-[#34A853]">
                  0%
                </h3>
                <ArrowIcon />
              </div>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default AppointmentCard;
