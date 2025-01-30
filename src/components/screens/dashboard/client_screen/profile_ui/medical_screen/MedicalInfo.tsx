import Title from "@/components/ui/Titles/Title";

import MedicalTabs from "../../../components/medicals/MedicalTabs";

const MedicalInfo = () => {
  return (
    <div className="pt-9 flex flex-col gap-10 mx-6">
      <Title title="Medical Information" className="text-xl font-medium " />
      <div className="border"></div>
      <MedicalTabs className="bg-[#FAFAFB]" data={{}} />
    </div>
  );
};

export default MedicalInfo;
