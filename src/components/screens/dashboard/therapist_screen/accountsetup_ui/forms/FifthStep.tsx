import SetupHeader from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/SetupHeader";
import { Switch } from "@/components/ui/switch";
import TimeSelect from "../TimeSelect";
import { TimeData } from "@/constants/DataManager";

const FifthStep = () => {
  return (
    <div className="relative flex flex-col gap-10">
      <div className="text-center">
        <SetupHeader
          title="Let clients know your business hour"
          subtitle="Control your schedule by deciding which day and time you’re available for an appointment request."
        />
      </div>
      <div className="flex flex-col gap-5">
        {/* Header Row */}
        <div className="flex items-center justify-center gap-20 pb-10 pt-3 text-base font-normal text-[#444444B2]">
          <h3 className="w-1/4 text-center"></h3>
          <h3 className="w-1/4 text-center">Open hour</h3>
          <h3 className="w-1/4 text-center">Close hour</h3>
          <h3 className="w-1/4 text-center">Action</h3>
        </div>
        {/* Data Rows */}
        {TimeData.map((item, index) => (
          <div className="flex gap-10 items-center justify-center" key={index}>
            <h3 className="w-1/4 text-center text-base font-bold">
              {item.day}
            </h3>
            <div className="w-1/4">
              <TimeSelect placeholder="12:00 PM" />
            </div>
            <div className="w-1/4">
              <TimeSelect placeholder="12:00 PM" />
            </div>
            <div className="w-1/4 flex justify-center">
              <div className="border w-[103px] h-[56px] flex items-center justify-center rounded-xl">
                <Switch />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FifthStep;
