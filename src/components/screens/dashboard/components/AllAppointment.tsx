import { FC, ReactNode } from "react";

interface AppointmentCardProps {
  className: string;
  icon: ReactNode;
}
const AllAppointment: FC<AppointmentCardProps> = ({ className, icon }) => {
  return (
    <div
      className={` ${className} rounded-full lg:w-[64px] lg:h-[64px] h-[44.47px] w-[44.47px] flex flex-col justify-center items-center`}
    >
      {icon}
    </div>
  );
};

export default AllAppointment;
