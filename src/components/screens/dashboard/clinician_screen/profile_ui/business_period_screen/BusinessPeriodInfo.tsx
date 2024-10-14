import { useState } from "react";
import Title from "@/components/ui/Titles/Title";
import BusinessPeriodSlots from "./BusinessPeriodSlots";
import { Button } from "@/components/ui/button";
import NewBusinessPeriod from "./NewBusinessPeriod";
import SuccessDialog from "../../../components/SuccessDialog";

const BusinessPeriodInfo = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [isSuccessVisible, setSuccessVisible] = useState(false); // Success dialog state

  return (
    <div className="pt-9 mx-6 flex flex-col gap-10">
      <div className="flex justify-between">
        <Title title="Business Periods" className="text-xl font-medium" />
        <Button
          className="w-[162px] rounded-full border bg-white border-army_green text-army_green"
          onClick={() => setModalOpen(true)} // Open modal when clicking "Add New"
        >
          Add New
        </Button>
      </div>
      <BusinessPeriodSlots />
      {/* Render NewBusinessPeriod modal */}
      {isModalOpen && (
        <NewBusinessPeriod
          onClose={() => setModalOpen(false)} // Close modal function
          setShowSuccess={(value) => setSuccessVisible(value)} // Set success dialog visibility
        />
      )}

      {/* Render SuccessDialog */}
      {isSuccessVisible && (
        <SuccessDialog
          isVisible={isSuccessVisible}
          title="Success!"
          subtitle="The business period has been successfully created."
          label="Close"
          onClose={() => setSuccessVisible(false)} // Close the success dialog
        />
      )}
    </div>
  );
};

export default BusinessPeriodInfo;
