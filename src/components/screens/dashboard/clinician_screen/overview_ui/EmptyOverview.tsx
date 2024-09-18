import WandIcon from "@/assets/icon/Wand";
import AppointmentCard from "./cards/AppointmentCard";
import { BriefcaseMedical, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalenderCard from "./cards/CalenderCard";

import { Link } from "react-router-dom";
import EmptyGraphCard from "../../empty_screens/cards/EmptyGraphCard";
import EmptyUpomingCard from "../../empty_screens/cards/EmptyUpomingCard";
import EmptyRequestCard from "../../empty_screens/cards/EmptyRequestCard";

const EmptyOverview = () => {
  return (
    <div className="">
      <div className=" py-6 bg-white my-7 flex justify-between rounded-lg max-w-full items-center ">
        <div className="flex lg:gap-3 gap-1 pl-3">
          <WandIcon width={24} height={24} className="hidden lg:block" />
          <WandIcon width={18} height={18} className="block lg:hidden" />
          <p className="md:text-[17px] text-army_green font-normal text-[12px] ">
            Hello! Preye you can now setup your account
          </p>
        </div>
        <div className="mr-3 ">
          <Link to="/accountsetup">
            <Button className="rounded-full md:text-base font-normal text-[7px] w-[74px] md:w-full h-[29px] md:h-full">
              Setup Account
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-5 flex-wrap lg:flex-nowrap">
        <div className="flex flex-col gap-4 w-full lg:w-2/3">
          <div className="flex lg:gap-5 gap-2">
            <AppointmentCard
              className="bg-[#4285F4]"
              title="Total Appointment"
              icon={<BriefcaseMedical size={20} color="white" className="" />}
            />
            <AppointmentCard
              className=" bg-[#8BA05F]"
              title="New client"
              icon={<UserRound size={20} color="white" />}
            />
          </div>
          <div>
            <EmptyGraphCard />
          </div>
          <div>
            <EmptyUpomingCard />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <CalenderCard />
          <EmptyRequestCard />
        </div>
      </div>
    </div>
  );
};

export default EmptyOverview;
