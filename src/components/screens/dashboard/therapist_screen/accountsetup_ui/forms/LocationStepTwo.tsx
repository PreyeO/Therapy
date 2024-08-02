import SetupHeader from "../SetupHeader";

import EditIcon from "@/components/icons/EditIcon";
import AddLocation from "../AddLocation";

const LocationStepTwo = () => {
  return (
    <div className="relative flex flex-col gap-10">
      <div className="text-center">
        <SetupHeader
          title="Where will you like your appointment to take place?"
          subtitle="Enter locations where your clients can meet up with you."
        />
      </div>
      <div className="flex justify-center gap-5 items-center">
        <div className="flex flex-col gap-5">
          <p>Unit 1 Brixton Angel Road, London SE1 3HE</p>
          <p>Angel Road, London SE1 3H</p>
        </div>
        <div className="flex flex-col gap-5">
          <EditIcon />
          <EditIcon />
        </div>
      </div>

      <AddLocation />
    </div>
  );
};

export default LocationStepTwo;
