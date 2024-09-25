import { Button } from "@/components/ui/button";

const StepNavigation = ({
  isFirstStep,
  isLastStep,
  prev,
  handleNext,
  handleFinishSetup,
}) => (
  <div className="flex gap-3 justify-end items-end mx-[4%] mb-10">
    {!isFirstStep && (
      <Button
        onClick={prev}
        className="rounded-full md:w-[30%] w-full h-[55px] text-xl font-medium bg-transparent text-army_green border"
      >
        Previous
      </Button>
    )}
    {isLastStep ? (
      <Button
        onClick={handleFinishSetup}
        className="rounded-full md:w-[30%] w-full h-[55px] text-xl font-medium"
      >
        Finish Setup
      </Button>
    ) : (
      <Button
        onClick={handleNext}
        className="rounded-full md:w-[30%] h-[55px] text-xl font-medium w-full"
      >
        Next
      </Button>
    )}
  </div>
);

export default StepNavigation;
