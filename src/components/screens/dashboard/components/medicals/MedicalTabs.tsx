import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Allergies from "../../client_screen/profile_ui/medical_screen/Allergies";
import Encounters from "../../client_screen/profile_ui/medical_screen/Encounters";
import SocialSupports from "../../client_screen/profile_ui/medical_screen/SocialSupports";
import Medications from "../../client_screen/profile_ui/medical_screen/Medications";
import ProtectiveFactors from "../../client_screen/profile_ui/medical_screen/ProtectiveFactors";
import SubstanceUses from "../../client_screen/profile_ui/medical_screen/SubstanceUses";
import MedicalConditions from "../../client_screen/profile_ui/medical_screen/MedicalConditions";
import ClinicalDocument from "../../client_screen/profile_ui/medical_screen/ClinicalDocument";
import { ClientProfileSetup } from "@/types/formSchema";
import ProfileTitle from "@/components/ui/Titles/ProfileTitle";

interface MedicalTabProps {
  className?: string;
  data: ClientProfileSetup;
  readOnly?: boolean;
}

const MedicalTabs: React.FC<MedicalTabProps> = ({
  className,
  data,
  readOnly = false,
}) => {
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
        {readOnly && <ProfileTitle title="Allergy" className="my-3 pb-3" />}
        <Allergies data={data.allergies} readOnly={readOnly} />
      </TabsContent>
      <TabsContent value="encounter">
        {readOnly && <ProfileTitle title="Encounter" className="my-3 pb-3" />}
        <Encounters data={data.encounters} readOnly={readOnly} />
      </TabsContent>
      <TabsContent value="clinicaldoc">
        <ClinicalDocument />
      </TabsContent>
      <TabsContent value="socialsupport">
        {readOnly && (
          <ProfileTitle title="Social Support" className="my-3 pb-3" />
        )}
        <SocialSupports data={data.social_supports} readOnly={readOnly} />
      </TabsContent>
      <TabsContent value="medication">
        {readOnly && <ProfileTitle title="Medications" className="my-3 pb-3" />}
        <Medications data={data.medications} readOnly={readOnly} />
      </TabsContent>
      <TabsContent value="protectives">
        {readOnly && (
          <ProfileTitle title="Protective Factor" className="my-3 pb-3" />
        )}
        <ProtectiveFactors data={data.protective_factors} readOnly={readOnly} />
      </TabsContent>
      <TabsContent value="substanceuse">
        {readOnly && (
          <ProfileTitle title="Substance Use" className="my-3 pb-3" />
        )}
        <SubstanceUses data={data.substance_uses} readOnly={readOnly} />
      </TabsContent>
      <TabsContent value="medicalcondition">
        {readOnly && (
          <ProfileTitle title="Medical Condition" className="my-3 pb-3" />
        )}
        <MedicalConditions data={data.allergies} readOnly={readOnly} />
      </TabsContent>
    </Tabs>
  );
};

export default MedicalTabs;
