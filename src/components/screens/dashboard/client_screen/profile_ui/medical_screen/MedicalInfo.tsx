import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Allergies from "./Allergies";
import Encounter from "./Encounter";

import SocialSupport from "./SocialSupport";
import Medications from "./Medications";
import ProtectiveFactor from "./ProtectiveFactor";
import SubstanceUse from "./SubstanceUse";
import MedicalCondition from "./MedicalCondition";
import Title from "@/components/ui/Titles/Title";
import ClinicalDoc from "./ClinicalDoc";

const MedicalInfo = () => {
  return (
    <div className="pt-9 flex flex-col gap-10 mx-6">
      <Title title="Medical Information" className="text-xl font-medium " />
      <div className="border"></div>
      <Tabs
        defaultValue="medication"
        className="w-full  mt-[26.5px] flex flex-col gap-5 "
      >
        {/* Tabs List */}
        <TabsList className="bg-[#FAFAFB] font-medium h-[65px] text-[#041827B2]  ">
          <TabsTrigger value="medication" className=" ">
            Medication
          </TabsTrigger>
          <TabsTrigger value="allergy" className="">
            Allergy
          </TabsTrigger>
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
    </div>
  );
};

export default MedicalInfo;
