import Title from "@/components/ui/Titles/Title";
import ClinicTable from "./ClinicTable";
import { dropdownItemsProfile } from "@/constants/Actions";

const ClinicInfo = () => {
  return (
    <div className="pt-9 mx-6">
      <Title title="Profile Location" className="text-xl font-medium  " />
      <ClinicTable dropdownItems={dropdownItemsProfile} dropdownType="one" />
    </div>
  );
};

export default ClinicInfo;
