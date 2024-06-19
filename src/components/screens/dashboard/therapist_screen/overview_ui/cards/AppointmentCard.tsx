import ArrowIcon from "@/assets/icon/Arrow";
import LightTitle from "@/components/ui/Titles/LightTitle";
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
}

const AppointmentCard: FC<AppointmentCardProps> = ({ className, icon }) => {
  return (
    <Card className="w-[372px] h-[110px] rounded-lg flex flex-col justify-center ">
      <CardHeader className="">
        <div className="flex gap-10 items-center ">
          <div
            className={` ${className} rounded-full w-[64px] h-[64px] flex flex-col justify-center items-center`}
          >
            {icon}
          </div>
          <div>
            <CardTitle>
              <LightTitle
                title="Total appointment"
                className="text-[12px] text-primary_black_text"
              />
            </CardTitle>
            <CardDescription className="flex justify-between font-bold text-primary_black_text items-center w-[94px]">
              <h2 className="  text-2xl">0</h2>
              <div className="flex gap-1">
                <h3 className="text-[12px] text-[#34A853]">0%</h3>
                <ArrowIcon />
              </div>
            </CardDescription>
          </div>
        </div>
        {/* <div>
          <CardTitle>Total appointment</CardTitle>
       
        </div> */}
      </CardHeader>
    </Card>
  );
};

export default AppointmentCard;
