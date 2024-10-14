import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle, // Import DialogTitle for accessibility
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader"; // Use your custom loader button

interface ConfirmationProps {
  isVisible: boolean; // Controls modal visibility
  onConfirm: () => Promise<void>; // Async function to call when "Yes" is clicked
  onCancel: () => void; // Function to call when "No" is clicked
  message: string; // Confirmation message
  submessage: string; // Additional message
}

const ConfirmationCard: React.FC<ConfirmationProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  message,
  submessage,
}) => {
  const [isDeleting, setIsDeleting] = useState(false); // State to control loader button

  // Handle confirm action with loader
  const handleConfirmClick = async () => {
    setIsDeleting(true); // Set loading state
    await onConfirm(); // Wait for the confirm function to finish
    setIsDeleting(false); // Reset loading state
  };

  return (
    <Dialog open={isVisible} onOpenChange={onCancel}>
      <DialogPortal>
        {/* Dialog Overlay */}
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <DialogContent className="flex items-center justify-center z-[1000] p-6 rounded-2xl shadow-lg text-center h-[300px] flex-col gap-10">
          <div>
            {/* DialogTitle for screen readers */}
            <DialogTitle className="text-xl font-bold mb-1">
              {message}
            </DialogTitle>
            <p className="text-lg text-red-600">{submessage}</p>
          </div>
          <div className="flex justify-center gap-4 w-full">
            <ButtonLoader
              loading={isDeleting}
              text="Yes"
              className="border border-army_green w-full rounded-full text-army_green bg-white h-[55px]"
              onClick={handleConfirmClick}
            />

            <Button
              className="border border-army_green w-full rounded-full text-army_green bg-white h-[55px]"
              onClick={onCancel}
            >
              No
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ConfirmationCard;
