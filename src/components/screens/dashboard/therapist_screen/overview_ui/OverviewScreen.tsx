import WandIcon from "@/assets/icon/Wand";
import AppointmentCard from "./cards/AppointmentCard";
import { BriefcaseMedical, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalenderCard from "./cards/CalenderCard";
import RequestCard from "./cards/RequestCard";
import GraphCard from "./cards/GraphCard";
import UpcomingCard from "./cards/UpcomingCard";

const OverviewScreen = () => {
  return (
    <div className="">
      <div className="px-7 py-6 bg-white my-7 flex justify-between rounded-lg max-w-full items-center ">
        <div className="flex lg:gap-3 gap-1">
          <WandIcon width={24} height={24} className="hidden lg:block" />
          <WandIcon width={18} height={18} className="block lg:hidden" />
          <p className="lg:text-[17px] text-army_green font-normal text-[12px]">
            Hello! Christian you can now setup your account
          </p>
        </div>
        <div className=" ">
          <Button className="rounded-full lg:text-base font-normal text-[7px] w-[74px] lg:w-full h-[29px] lg:h-full">
            Setup Account
          </Button>
        </div>
      </div>
      <div className="flex gap-5 flex-wrap">
        <div className="flex flex-col gap-4 lg:w-[63%] w-full">
          <div className="flex lg:gap-5 gap-2">
            <AppointmentCard
              className="bg-[#4285F4]"
              title="Total Appointment"
              icon={<BriefcaseMedical size={20} color="white" className="" />}
            />
            <AppointmentCard
              className=" bg-[#8BA05F]"
              title="New Patient"
              icon={<UserRound size={20} color="white" />}
            />
          </div>
          <div>
            <GraphCard />
          </div>
          <div>
            <UpcomingCard />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-[35%] flex-wrap w-full ">
          <CalenderCard />
          <RequestCard />
        </div>
        {/* <GraphCard /> */}
      </div>
    </div>
  );
};

export default OverviewScreen;
