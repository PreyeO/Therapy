import { Card, CardContent } from "@/components/ui/card";
import FirstStep from "./account_steps/FirstStep";
import SecondStep from "./account_steps/SecondStep";
import ThirdStep from "./account_steps/ThirdStep";
import FourthStep from "./account_steps/FourthStep";
import ServiceStepTwo from "./account_steps/ServiceStepTwo";
import FifthStep from "./account_steps/FifthStep";
import ReviewStep from "./account_steps/ReviewStep";

const SetupScreen = () => {
  return (
    <div className="w-full flex flex-col items-center scale-75">
      <Card className="w-[50%] bg-white rounded-3xl py-8 shadow-md flex flex-col gap-16">
        <div className="flex justify-between px-[4%] py-8">
          <h3 className="text-2xl font-medium">Account setup</h3>
          <h3 className="text-lg font-bold text-army_green">Step 1 of 6</h3>
        </div>
        <CardContent>
          {/* <FirstStep /> */}
          {/* <SecondStep /> */}
          {/* <ThirdStep /> */}
          {/* <FourthStep /> */}
          {/* <ServiceStepTwo /> */}
          {/* <FifthStep /> */}
          <ReviewStep />
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupScreen;
