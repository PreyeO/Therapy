import Title from "@/components/ui/Titles/Title";
import AppointmentInfoTable from "./AppointmentInfoTable";

const AppointmentInfo = () => {
  return (
    <div className="pt-9 mx-6">
      <Title title="Clinic Information" className="text-xl font-medium  " />
      <AppointmentInfoTable />
    </div>
  );
};

export default AppointmentInfo;
