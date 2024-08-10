import { Button } from "@/components/ui/button";
import Title from "@/components/ui/Titles/Title";
import RateForm from "./RateForm";

const RateInfo = () => {
  return (
    <div className="pt-9 mx-6">
      <div className="flex justify-between">
        <Title title="Session Rate" className="text-xl font-medium  " />
        <Button className="w-[198px] rounded-full bg-army_green">Update</Button>
      </div>
      <RateForm />
    </div>
  );
};

export default RateInfo;
