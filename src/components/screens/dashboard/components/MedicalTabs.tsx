import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Allergies from "../client_screen/profile_ui/medical_screen/Allergies";
import Encounter from "../client_screen/profile_ui/medical_screen/Encounter";
import ClinicalDoc from "../client_screen/profile_ui/medical_screen/ClinicalDoc";
import SocialSupport from "../client_screen/profile_ui/medical_screen/SocialSupport";
import Medications from "../client_screen/profile_ui/medical_screen/Medications";
import ProtectiveFactor from "../client_screen/profile_ui/medical_screen/ProtectiveFactor";
import SubstanceUse from "../client_screen/profile_ui/medical_screen/SubstanceUse";
import MedicalCondition from "../client_screen/profile_ui/medical_screen/MedicalCondition";

interface MedicalTabProps {
  className?: string;
}

const MedicalTabs: React.FC<MedicalTabProps> = ({ className }) => {
  return (
    <Tabs
      defaultValue="medication"
      className="w-full mt-[26.5px] flex flex-col gap-5"
    >
      {/* Tabs List with horizontal scroll */}
      <TabsList
        className={` font-medium h-[65px] text-[#041827B2] ${className}`}
      >
        <TabsTrigger value="medication">Medication</TabsTrigger>
        <TabsTrigger value="allergy">Allergy</TabsTrigger>
        <TabsTrigger value="medicalcondition">Medical Condition</TabsTrigger>
        <TabsTrigger value="encounter">Encounter</TabsTrigger>
        <TabsTrigger value="socialsupport">Social Support</TabsTrigger>
        <TabsTrigger value="protectives">Protective Factor</TabsTrigger>
        <TabsTrigger value="substanceuse">Substance Use</TabsTrigger>
        <TabsTrigger value="clinicaldoc">Document</TabsTrigger>
      </TabsList>

      <TabsContent value="allergy">
        <Allergies />
      </TabsContent>
      <TabsContent value="encounter">
        <Encounter />
      </TabsContent>
      <TabsContent value="clinicaldoc">
        <ClinicalDoc />
      </TabsContent>
      <TabsContent value="socialsupport">
        <SocialSupport />
      </TabsContent>
      <TabsContent value="medication">
        <Medications />
      </TabsContent>
      <TabsContent value="protectives">
        <ProtectiveFactor />
      </TabsContent>
      <TabsContent value="substanceuse">
        <SubstanceUse />
      </TabsContent>
      <TabsContent value="medicalcondition">
        <MedicalCondition />
      </TabsContent>
    </Tabs>
  );
};

export default MedicalTabs;
