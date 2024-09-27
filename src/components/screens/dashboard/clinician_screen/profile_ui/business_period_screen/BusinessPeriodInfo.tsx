import Title from "@/components/ui/Titles/Title";
import BusinessPeriodSlots from "./BusinessPeriodSlots";
import { Button } from "@/components/ui/button";

const BusinessPeriodnfo = () => {
  return (
    <div className="pt-9 mx-6 flex flex-col gap-10">
      <div className="flex justify-between">
        <Title title="Time Slot" className="text-xl font-medium  " />
        <Button className="w-[162px] rounded-full border bg-white border-army_green text-army_green">
          Add New
        </Button>
      </div>
      <BusinessPeriodSlots />
    </div>
  );
};

export default BusinessPeriodnfo;
