import SetupHeader from "../../clinician_screen/accountsetup_ui/SetupHeader";

const Review = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center py-6 mt-6">
        <SetupHeader
          title="Final Review"
          subtitle="Review your details before proceeding to setup."
        />
      </div>
      <div>
        <div className="flex flex-col w-[80%] mx-auto gap-6 text-[17px] font-normal text-[#041827] ">
          <h3 className="  font-bold   ">Personal Information</h3>
          <div className="flex  justify-between flex-wrap">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Preferred name</h4>
              <p className="text-[#041827]">Dr. Sweetness</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Pronoun</h4>
              <p>She</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Date of birth</h4>
              <p>29/09/2024</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Gender</h4>
              <p>Female</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]"> Phone number</h4>
              <p>+143785990</p>
            </div>
          </div>
          <h3 className="  font-bold  ">Address</h3>
          <div className="flex  justify-between flex-wrap">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">State</h4>
              <p>California</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">City</h4>
              <p>Los Angeles</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Street</h4>
              <p>1234 Sunset Blvd, Los Angeles</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Zip code</h4>
              <p>CA 90026</p>
            </div>
          </div>
          <h3 className="  font-bold  ">Emergency Contact</h3>
          <div className="flex  justify-between flex-wrap">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">First name</h4>
              <p>Preye</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Last Name</h4>
              <p>Preye</p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Gender</h4>
              <p>Female</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]"> Phone number</h4>
              <p>+143785990</p>
            </div>
          </div>
          <h3 className="  font-bold l  ">Uploaded Document</h3>
          <div className="flex  justify-between flex-wrap">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">State</h4>
              <p>California</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">City</h4>
              <p>Los Angeles</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Street</h4>
              <p>1234 Sunset Blvd, Los Angeles</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Zip code</h4>
              <p>CA 90026</p>
            </div>
          </div>
          <h3 className="  font-bold  ">Emergency Contact</h3>
          <div className="flex gap-5 flex-wrap">
            <p>medical report.pdf</p>
            <p>health report.pdf</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
