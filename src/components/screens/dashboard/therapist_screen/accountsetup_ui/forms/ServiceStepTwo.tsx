import { Switch } from "@/components/ui/switch";
import SetupHeader from "../SetupHeader";
import { SquarePlus } from "lucide-react";

const ServiceStepTwo = () => {
  return (
    <div className="relative flex flex-col gap-10">
      <div className="text-center">
        <SetupHeader
          title="What service does your practice offer"
          subtitle="Streamline billing and scheduling by adding services offered by your practice. This information will appear when clients are requesting appointments."
        />
      </div>
      <div className="w-[327px] border rounded-xl mx-auto flex flex-col gap-5 py-6">
        <div className="flex gap-4 items-center justify-center">
          <Switch />
          <div>
            <p className="text-lg font-normal">Psychotherapy, 45mins</p>
            <p className="text-base text-army_green font-normal">
              $25 dollar /per hour
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <Switch />
          <div>
            <p className="text-lg font-normal">Psychotherapy, 45mins</p>
            <p className="text-base text-army_green font-normal">
              $25 dollar /per hour
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <Switch />
          <div>
            <p className="text-lg font-normal">Psychotherapy, 45mins</p>
            <p className="text-base text-army_green font-normal">
              $25 dollar /per hour
            </p>
          </div>
        </div>
        <div className="mx-auto w-[191px] flex items-center justify-center gap-2 text-lg font-bold text-army_green bg-[#6D7C431A] rounded-full cursor-pointer h-[44px]">
          <SquarePlus size={24} color="#6D7C43" />
          Add offer
        </div>
      </div>
    </div>
  );
};

export default ServiceStepTwo;
