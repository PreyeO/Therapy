// src/pages/DashboardPage/therapist/account_setup_page/AccountSetup.tsx
import React from "react";
import Success from "@/components/ui/notifications/Success";
import AccountSetupSteps from "@/pages/DashboardPage/therapist/account_setup_page/AccountSetupSteps";
import { useNavigate } from "react-router-dom";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";

const AccountSetup: React.FC = () => {
  const { isSetupComplete, setIsSetupComplete } = useBusinessPeriodsStore();
  const navigate = useNavigate();

  const handleSuccessButtonClick = () => {
    navigate("/dashboard");
  };

  return (
    <main className="bg-main-background w-full md:h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {isSetupComplete ? (
          <Success
            title="You have successfully set up your account"
            subtitle="You can now proceed to your dashboard"
            label="Go to dashboard"
            onButtonClick={handleSuccessButtonClick}
          />
        ) : (
          <AccountSetupSteps setIsSetupComplete={setIsSetupComplete} />
        )}
        <div id="overlay-container"></div>
      </div>
    </main>
  );
};

export default AccountSetup;
