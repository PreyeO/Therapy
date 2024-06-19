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
    <div>
      <div className="px-7 py-6 bg-white my-7 flex justify-between rounded-lg">
        <div className="flex gap-3 ">
          <WandIcon width={24} height={24} />
          <p className="text-[17px] text-army_green font-normal">
            Hello! Christian you can now setup your account
          </p>
        </div>
        <div>
          <Button className="rounded-full text-base font-normal">
            Setup Account
          </Button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 w-[63%]">
          <div className="flex gap-4">
            <AppointmentCard
              className="bg-[#4285F4]"
              icon={<BriefcaseMedical size={24} color="white" />}
            />
            <AppointmentCard
              className=" bg-[#8BA05F]"
              icon={<UserRound size={24} color="white" />}
            />
          </div>
          <div>
            <GraphCard />
          </div>
          <div>
            <UpcomingCard />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[35%]">
          <CalenderCard />
          <RequestCard />
        </div>
        {/* <GraphCard /> */}
      </div>
    </div>
  );
};

export default OverviewScreen;
