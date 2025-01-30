import ClientOverviewScreen from "@/components/screens/dashboard/clinician_screen/client_ui/ClientOverviewScreen";
import RiskMeasures from "@/components/screens/dashboard/clinician_screen/client_ui/medical_screen/RiskMeasures";

const ClientsOverview = () => {
  return (
    <main className="">
      <ClientOverviewScreen />
      <div className="mt-7">
        <RiskMeasures />
      </div>
    </main>
  );
};

export default ClientsOverview;
