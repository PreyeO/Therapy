import MedicalTabs from "../../components/MedicalTabs";
import ClientOverview from "./ClientOverview";

const ClientOverviewScreen = () => {
  return (
    <div className="flex flex-col gap-10">
      <ClientOverview />
      <div className="bg-white px-6 ">
        <MedicalTabs className="flex gap-10" />
      </div>
    </div>
  );
};

export default ClientOverviewScreen;
