import Title from "@/components/ui/Titles/Title";
import ServiceSlots from "./ServiceSlots";
// import RateForm from "./RateForm";

const ServiceInfo = () => {
  return (
    <div className="pt-9 mx-6">
      <Title title="Clinical Services" className="text-xl font-medium  " />

      <ServiceSlots />
    </div>
  );
};

export default ServiceInfo;
