import Title from "@/components/ui/Titles/Title";
import { Card } from "@/components/ui/card";
import { TimesData } from "@/constants/DataManager";

const BusinessTime = () => {
  return (
    <Card className="py-9 w-full rounded-lg px-[2%] pb-12">
      <div className="flex justify-between">
        <Title title="Business Hour" className="text-xl font-bold" />
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-center pt-10 md:text-base text-[9.19px] font-normal text-[#444444B2]">
          {/* Adjusting header widths to match data row widths */}
          <h3 className="w-[30%] ">Day</h3>
          <h3 className="w-[15%] pl-1 ">Open hour</h3>
          <h3 className="w-[15%] pl-2 ">Close hour</h3>
          <h3 className="w-[40%] pl-6 ">Location</h3>
        </div>

        <div className="flex flex-col gap-5">
          {TimesData.map((item, index) => (
            <div key={index} className="flex gap-5 items-center justify-center">
              {/* Aligning data rows with the same widths */}
              <div className="w-[30%] border rounded-md p-3 ">{item.day}</div>
              <div className="w-[15%] border rounded-md p-3 ">
                {item.open_hour}
              </div>
              <div className="w-[15%] border rounded-md p-3 ">
                {item.closing_hour}
              </div>
              <div className="w-[40%] border rounded-md p-3">
                {item.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BusinessTime;
