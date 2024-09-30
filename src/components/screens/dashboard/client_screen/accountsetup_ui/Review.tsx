import SetupHeader from "@/components/screens/dashboard/clinician_screen/accountsetup_ui/SetupHeader";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";

const Review = () => {
  const { clientProfileData } = useBusinessPeriodsStore();

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Final Review"
          subtitle="Review your details before proceeding to setup."
        />
      </div>
      <div>
        <div className="flex flex-col w-[80%] mx-auto gap-6 text-[17px] font-normal text-[#041827]">
          <h3 className="font-bold">Personal Information</h3>
          <div className="flex justify-between flex-wrap">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Preferred Name</h4>
              <p className="text-[#041827]">
                {clientProfileData.preferred_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Pronoun</h4>
              <p>{clientProfileData.pronouns || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Date of Birth</h4>
              <p>{clientProfileData.date_of_birth || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Gender</h4>
              <p>{clientProfileData.gender || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Phone Number</h4>
              <p>{clientProfileData.phone_number || "N/A"}</p>
            </div>
          </div>

          <h3 className="font-bold">Address</h3>
          <div className="flex justify-between flex-wrap">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Street</h4>
              <p>{clientProfileData.address?.street_address || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">City</h4>
              <p>{clientProfileData.address?.city || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">State</h4>
              <p>{clientProfileData.address?.state || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Zip Code</h4>
              <p>{clientProfileData.address?.postal_code || "N/A"}</p>
            </div>
          </div>

          <h3 className="font-bold">Emergency Contact</h3>
          <div className="flex justify-between flex-wrap">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">First Name</h4>
              <p>{clientProfileData.emergency?.first_name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Last Name</h4>
              <p>{clientProfileData.emergency?.last_name || "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Phone Number</h4>
              <p>{clientProfileData.emergency?.phone_number || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
