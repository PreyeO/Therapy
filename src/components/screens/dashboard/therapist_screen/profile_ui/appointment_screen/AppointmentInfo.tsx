import Title from "@/components/ui/Titles/Title";
import { dropdownItemsProfile } from "@/constants/Actions";
import AppointmentInfoTable from "./AppointmentInfoTable";

const AppointmentInfo = () => {
  return (
    <div className="pt-9 mx-6">
      <Title title="Session Locations" className="text-xl font-medium  " />
      <AppointmentInfoTable
        dropdownItems={dropdownItemsProfile}
        dropdownType="one"
      />
    </div>
  );
};

export default AppointmentInfo;
