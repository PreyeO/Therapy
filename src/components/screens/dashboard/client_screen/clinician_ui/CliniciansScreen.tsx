import { useAppointmentsStore } from "@/store/useAppointment";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import ClinicianCards from "./cards/ClinicianCards";

const CliniciansScreen = () => {
  const { loading } = useAppointmentsStore(); // Access loading from the appointments store

  return (
    <div className="w-full flex justify-center h-screen relative">
      {/* Full-screen loader overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-200 z-50">
          <SmallLoader />
        </div>
      )}

      {/* Clinician Cards */}
      <ClinicianCards />
    </div>
  );
};

export default CliniciansScreen;
