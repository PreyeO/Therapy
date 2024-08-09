import { useState } from "react";
import DialogForm from "./forms/DialogForm";
import { AppointmentAddress } from "@/types";
import DialogCard from "../components/DialogCard";
import { SquarePlus } from "lucide-react";

interface ServiceCardProps {
  addAppointmentAddress: (address: AppointmentAddress) => void;
}

const ServiceCard = ({ addAppointmentAddress }: ServiceCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="w-full flex flex-col justify-center items-center px-[2%]">
      <button
        className="mx-auto md:w-[311px] w-fuul flex items-center justify-center gap-2 text-lg font-bold text-army_green bg-[#6D7C431A] rounded-full cursor-pointer h-[56px]"
        onClick={openDialog}
      >
        <SquarePlus size={24} color="#6D7C43" />
        Add Appointment Location
      </button>

      <DialogCard
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Add New Location"
      >
        <DialogForm
          addAppointmentAddress={(address) => {
            addAppointmentAddress(address);
            closeDialog();
          }}
          closeOverlay={closeDialog}
        />
      </DialogCard>
    </div>
  );
};

export default ServiceCard;
