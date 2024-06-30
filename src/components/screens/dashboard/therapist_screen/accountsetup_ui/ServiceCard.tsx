import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { FC } from "react";
import ServiceStep from "./forms/ServiceStep";

interface ServiceCardProps {
  toggleOverlay: () => void;
}
const ServiceCard: FC<ServiceCardProps> = ({ toggleOverlay }) => {
  const handleAddClick = () => {
    toggleOverlay();
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Card className="w-[50%] py-10 px-5 rounded-3xl">
        <div className="flex justify-between items-center px-7">
          <h3 className="text-xl font-bold">Add Service</h3>
          <Button
            onClick={handleAddClick}
            className="w-[109px] rounded-full text-base font-medium"
          >
            Add
          </Button>
        </div>
        <div className="p-[1px] w-[85%] bg-[#E7E7E7] mt-3 mx-auto"></div>
        <CardContent className="pt-10">
          <ServiceStep />
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCard;
