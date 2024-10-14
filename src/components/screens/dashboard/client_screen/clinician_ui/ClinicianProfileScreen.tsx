import { useEffect, useState } from "react";

import { useAppointmentsStore } from "@/store/useAppointment";
import BusinessTime from "./cards/BusinessTime";
import ProfileInfo from "./cards/ProfileInfo";
import { BusinessPeriod } from "@/types/formSchema";

const ClinicianProfileScreen = () => {
  const { selectedClinician, setBusinessPeriods } = useAppointmentsStore(); // Access global state
  const [localBusinessPeriods, setLocalBusinessPeriods] = useState<
    BusinessPeriod[]
  >([]);

  useEffect(() => {
    // Update global state only if local state has new values
    if (localBusinessPeriods.length > 0) {
      setBusinessPeriods(localBusinessPeriods);
    }
  }, [localBusinessPeriods, setBusinessPeriods]);

  const handleBusinessPeriodsFetched = (periods: BusinessPeriod[]) => {
    // Prevent unnecessary updates by comparing previous and current periods
    if (JSON.stringify(periods) !== JSON.stringify(localBusinessPeriods)) {
      setLocalBusinessPeriods(periods); // Update local state only if there are changes
    }
  };

  return (
    <div className="flex flex-col gap-8 py-[60px]">
      <ProfileInfo />
      {selectedClinician?.clinician_profile && (
        <>
          <BusinessTime
            clinician_profile_id={selectedClinician.clinician_profile.id}
            onBusinessPeriodsFetched={handleBusinessPeriodsFetched}
          />
        </>
      )}
    </div>
  );
};

export default ClinicianProfileScreen;
