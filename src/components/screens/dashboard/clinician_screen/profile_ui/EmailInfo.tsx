import { Switch } from "@/components/ui/switch";
import Title from "@/components/ui/Titles/Title";
import { clinicianProfileData } from "@/constants/DataManager";

const EmailInfo = () => {
  return (
    <div className="pt-9 mx-6">
      <Title title="Email Updates" className="text-lg font-normal " />
      <div className="flex flex-col gap-10 pt-16">
        {clinicianProfileData.map((item, index) => (
          <div key={index} className="flex justify-between">
            <p>{item.email_update}</p>
            <Switch className="w-[51px] h-[26px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailInfo;
