import { useAccountSetup } from "@/hooks/useAccountSetup";
import Success from "@/components/ui/notifications/Success";
import AccountSetupSteps from "@/pages/DashboardPage/therapist/account_setup_page/AccountSetupSteps";
import { useNavigate } from "react-router-dom";

const AccountSetup = () => {
  const { isSetupComplete, setIsSetupComplete, therapistProfileId } =
    useAccountSetup();

  const navigate = useNavigate();

  const handleSuccessButtonClick = () => {
    navigate("/dashboard");
  };

  if (!therapistProfileId) {
    return <div>Error: Therapist profile ID not found.</div>;
  }

  return (
    <main className="bg-main-background w-full md:h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {isSetupComplete ? (
          <Success
            title="You have successfully set up your account"
            subtitle="You can now proceed to your dashboard"
            label="Go to dashboard"
            onButtonClick={handleSuccessButtonClick}
            className=""
          />
        ) : (
          <AccountSetupSteps
            setIsSetupComplete={setIsSetupComplete}
            therapistProfileId={therapistProfileId}
          />
        )}
        <div id="overlay-container"></div>
      </div>
    </main>
  );
};

export default AccountSetup;
