import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskAssessment from "./RiskAssessment";
import Measures from "./Measures";

interface RiskMeasuresTabProps {
  className?: string;
}

const RiskMeasuresTabs: React.FC<RiskMeasuresTabProps> = ({ className }) => {
  return (
    <Tabs
      defaultValue="riskassessment"
      className={`w-full flex flex-col gap-5  ${className}`}
    >
      {/* Tabs List */}
      <TabsList className="font-medium h-[65px] text-[#041827B2] flex justify-start gap-10">
        <TabsTrigger value="riskassessment">Risk Assessment</TabsTrigger>
        <TabsTrigger value="measures">Measures</TabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      <TabsContent value="riskassessment">
        <RiskAssessment />
      </TabsContent>

      <TabsContent value="measures">
        <Measures />
      </TabsContent>
    </Tabs>
  );
};

export default RiskMeasuresTabs;
