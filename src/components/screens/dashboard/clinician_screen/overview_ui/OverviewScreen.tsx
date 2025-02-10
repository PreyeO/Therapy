import { Button } from "@/components/ui/button";
import CalenderCard from "./cards/CalenderCard";
import RequestCard from "./cards/RequestCard";
import UpcomingCard from "./cards/UpcomingCard";
import { Link } from "react-router-dom";
import Advert from "../../components/Advert";
import MultipleLineChart from "./cards/MultipleLineChart";
import TotalAppointmentChart from "./cards/TotalAppointmentChart";
import TotalClientAttendedChart from "./cards/TotalClientAttendedChart";

const OverviewScreen = () => {
  return (
    <div className="mb-10">
      <div className=" py-6 bg-white my-7 flex justify-between rounded-lg max-w-full items-center ">
        <Advert />
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
            <TotalAppointmentChart />

            <TotalClientAttendedChart />
          </div>
          <div>
            <MultipleLineChart />
          </div>
          <div>
            <UpcomingCard />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <CalenderCard />
          <RequestCard />
        </div>
      </div>
    </div>
  );
};

export default OverviewScreen;
