import { ChevronRight } from "lucide-react";

const AppointmentReminder = () => {
  return (
    <div className="max-w-[400px] h-[125px] bg-army_green flex justify-around items-center text-white rounded-[20px]">
      <div className="flex gap-6 items-center">
        <div className=" flex flex-col items-center">
          <h2 className="text-xl font-medium">Sat</h2>
          <h2 className="text-[25px] font-bold">8</h2>
        </div>
        <div>
          <p className="text-xl font-medium">Dr.Julian</p>
          <div className="flex gap-8">
            <p className="text-base font-medium opacity-[0.7]">Clinician</p>
            <div className="w-[67px] bg-white text-army_green rounded-md text-center text-[10px] font-medium justify-center flex items-center p-1">
              4:00pm
            </div>
          </div>
        </div>
      </div>
      <ChevronRight />
    </div>
  );
};

export default AppointmentReminder;
