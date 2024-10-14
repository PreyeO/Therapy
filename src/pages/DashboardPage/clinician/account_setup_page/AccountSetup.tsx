// src/pages/DashboardPage/clinician/account_setup_page/AccountSetup.tsx
import React from "react";

import AccountSetupSteps from "@/pages/DashboardPage/clinician/account_setup_page/AccountSetupSteps";
import { useNavigate } from "react-router-dom";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import DialogCard from "@/components/screens/dashboard/components/DialogCard";
import { useDialogState } from "@/store";

const AccountSetup: React.FC = () => {
  const { isSetupComplete, setIsSetupComplete } = useBusinessPeriodsStore();
  const { closeDialog, success, successMessage } = useDialogState(); // Use dialog state
  const navigate = useNavigate();

  const handleSuccessButtonClick = () => {
    navigate("/clinician_dashboard/profile");
    closeDialog(); // Close dialog when navigating
  };

  return (
    <main className="bg-main-background w-full md:h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Render DialogCard for success message */}
        <DialogCard
          buttonLabel="Go to Dashboard"
          buttonAction={handleSuccessButtonClick}
          className="md:w-[500px]" // Add custom class for styling
        >
          {success && successMessage ? (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">
                {successMessage.title}
              </h2>
              <p className="text-lg mb-4">{successMessage.subtitle}</p>
            </div>
          ) : null}
        </DialogCard>
        {/* Render AccountSetupSteps when setup is not complete */}
        {!isSetupComplete && (
          <AccountSetupSteps setIsSetupComplete={setIsSetupComplete} />
        )}
        <div id="overlay-container"></div>
      </div>
    </main>
  );
};

export default AccountSetup;
