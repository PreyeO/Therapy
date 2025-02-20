import Title from "@/components/ui/Titles/Title";

import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

import { FC, ReactNode } from "react";
import AllAppointment from "../../../components/AllAppointment";

interface AppointmentCardProps {
  title: string;
  className: string;
  icon: ReactNode;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  title,
  className,
  icon,
}) => {
  return (
    <Card className="lg:w-[372px] lg:h-[110px] w-full h-[93.61px] rounded-lg flex flex-col justify-center bg-white  px-2">
      <div className="flex md:gap-7 items-center gap-1 ">
        <AllAppointment icon={icon} className={className} />
        <div>
          <Title
            title={title}
            className="lg:text-[17px] text-[10px] text-[#A3AED0] font-medium"
          />

          <div className="flex md:gap-7 gap-2 font-bold text-primary_black_text items-center ">
            <h2 className="md:text-2xl text-xl">0</h2>
            <div className="flex gap-1">
              <h3 className="md:text-[12px] text-[10px] text-[#34A853]">0%</h3>
              <TrendingUp size={13} color="#8BA05F" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentCard;
