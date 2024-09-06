import Title from "@/components/ui/Titles/Title";
import BusinessPeriodSlots from "./BusinessPeriodSlots";
import { Button } from "@/components/ui/button";

const BusinessPeriodnfo = () => {
  return (
    <div className="pt-9 mx-6">
      <div className="flex justify-between">
        <Title title="Time Slot" className="text-xl font-medium  " />
        <Button className="w-[198px] rounded-full bg-army_green">Update</Button>
      </div>
      <BusinessPeriodSlots />
    </div>
  );
};

export default BusinessPeriodnfo;
