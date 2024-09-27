import BusinessTime from "./cards/BusinessTime";
import ProfileInfo from "./cards/ProfileInfo";

const ClinicianProfileScreen = () => {
  return (
    <div className="flex flex-col gap-8 py-[60px]">
      <ProfileInfo />
      <BusinessTime />
    </div>
  );
};

export default ClinicianProfileScreen;
