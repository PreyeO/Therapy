import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Success from "@/components/ui/notifications/Success";
import AccountSetupSteps from "@/pages/DashboardPage/therapist/account_setup_page/AccountSetupSteps";
import { getUserData, getAuthToken, setAuthToken } from "@/services/api/auth";
import { getTherapistProfile } from "@/services/api/therapist/account_setup";

const AccountSetup = () => {
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const [therapistProfileId, setTherapistProfileId] = useState<string | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = getUserData();
        console.log("User data:", userData); // Log user data for debugging
        if (userData && userData.user && userData.user.therapist_profile) {
          const profileId = userData.user.therapist_profile.id;
          setTherapistProfileId(profileId);

          // Set the token from local storage
          const token = getAuthToken();
          if (token) {
            setAuthToken(token);
          }

          const profileData = await getTherapistProfile(profileId); // Ensure the profile data is fetched
          console.log("Profile data:", profileData); // Log profile data for debugging
        } else {
          console.error("Therapist profile not found in user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSuccessButtonClick = () => {
    navigate("/dashboard");
  };

  if (!therapistProfileId) {
    return <div>Error: Therapist profile ID not found.</div>; // Display an error message if profile ID is not found
  }

  return (
    <main className="bg-main-background w-full md:h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {isSetupComplete ? (
          <Success
            title="You have successfully setup your account"
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
