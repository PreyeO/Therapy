// SuccessDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@radix-ui/react-dialog";
import Success from "@/components/ui/notifications/Success"; // Import the Success component
import { DialogTrigger } from "@/components/ui/dialog";

interface SuccessDialogProps {
  isVisible: boolean; // Controls visibility of the dialog
  title: string; // Title of the success message
  subtitle: string; // Subtitle or description of the success message
  label: string; // Label for the button in the success message
  onClose: () => void; // Function to call when the success dialog is closed
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  isVisible,
  title,
  subtitle,
  label,
  onClose,
}) => {
  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <DialogTrigger className="">
            <DialogContent className="fixed inset-0 flex items-center justify-center z-[1000] ">
              <Success
                title={title}
                subtitle={subtitle}
                label={label}
                onButtonClick={onClose}
                className="bg-white w-[500px] rounded-xl h-[300px]"
              />
            </DialogContent>
          </DialogTrigger>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};

export default SuccessDialog;
