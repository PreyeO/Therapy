import SetupHeader from "@/components/screens/dashboard/therapist_screen/accountsetup_ui/SetupHeader";
import AddLocation from "../AddLocation";

const ThirdStep = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="text-center">
        <SetupHeader
          title="Where will you like your appointment to take place?"
          subtitle="Enter locations where your clients can meet up with you."
        />
      </div>

      <AddLocation />
    </div>
  );
};

export default ThirdStep;
