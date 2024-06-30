import { Switch } from "@/components/ui/switch";
import SetupHeader from "../SetupHeader";
import { Button } from "@/components/ui/button";

const ServiceStepTwo = () => {
  return (
    <div className="relative flex flex-col gap-20">
      <div className="text-center">
        <SetupHeader
          title="What service does your practice offer"
          subtitle="Streamline billing and scheduling by adding services offered by your practice. This information will appear when clients are requesting appointments."
        />
      </div>
      <div className="w-[327px] border rounded-xl mx-auto flex flex-col gap-3">
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
      </div>
      <div className="flex gap-3 justify-end items-end mt-10">
        <Button className="rounded-full w-[30%] h-[55px] text-xl font-medium">
          Next
        </Button>
        <Button className="rounded-full w-[30%] h-[55px] text-xl font-medium bg-transparent text-army_green border">
          Previous
        </Button>
      </div>
    </div>
  );
};

export default ServiceStepTwo;
