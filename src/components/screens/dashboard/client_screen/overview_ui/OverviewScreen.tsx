import { CalendarClock } from "lucide-react";
import bars from "@/assets/icon/bars.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Advert from "../../components/Advert";
import Illustration from "@/assets/image/Illustration.svg";
import CalenderCard from "../../clinician_screen/overview_ui/cards/CalenderCard";
import UpcomingCard from "../../clinician_screen/overview_ui/cards/UpcomingCard";
import TotalAppointment from "./cards/TotalAppointment";
import DocumentsCard from "./cards/DocumentsCard";
import AppointmentReminder from "./cards/AppointmentReminder";

const OverviewScreen = () => {
  return (
    <div className="mb-10">
      <div className=" py-6 bg-white my-7 flex justify-between rounded-lg max-w-full items-center ">
        <Advert />
        <div className="mr-3 ">
          <Link to="/clientsetup">
            <Button className="rounded-full md:text-base font-normal text-[7px] w-[74px] md:w-full h-[29px] md:h-full">
              Setup Account
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-5 flex-wrap lg:flex-nowrap">
        <div className="flex flex-col gap-4 w-full lg:w-2/3">
          <div className="flyer flex text-white items-center justify-around">
            <div className="flex flex-col gap-5 w-[392px]">
              <h2 className="text-[25px] font-bold leading-[31px]">
                Find the Best Clinician for Your Well-being
              </h2>
              <p className=" font-medium text-base">
                Connect with experienced clinicians and receive personalized
                care for your health needs.
              </p>
              <Link to="/client_dashboard/clinicians">
                <Button className="bg-white w-[153px] rounded-full text-black">
                  Book a clinician
                </Button>
              </Link>
            </div>
            <div>
              <img src={Illustration} alt="image of flyer advert" />
            </div>
          </div>
          <div className="flex lg:gap-5 gap-2">
            <TotalAppointment
              className="bg-[#6D7C430D]"
              title="Total Appointments"
              icon={<img src={bars} alt="bars icon" width={40} height={40} />}
            />
            <TotalAppointment
              className=" bg-[#6D7C430D]"
              title="Upcoming Appointments"
              icon={<CalendarClock size={40} color="#6D7C43" />}
            />
          </div>

          <div>
            <UpcomingCard />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <DocumentsCard />
          <div className="bg-white">
            <CalenderCard />
            <div className="border w-full my-2"></div>
            <AppointmentReminder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewScreen;
