import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import React from "react";
import Success from "@/components/ui/notifications/Success";
import { useDialogState } from "@/store";

interface DialogCardProps {
  buttonLabel?: string;
  buttonAction?: () => void;
  className?: string; // Accept a className prop to style the width dynamically
  children?: React.ReactNode;
}

const DialogCard: React.FC<DialogCardProps> = ({
  buttonLabel = "Close",
  buttonAction,
  className = "", // Default className as an empty string
  children,
}) => {
  const { isOpen, success, successMessage, closeDialog } = useDialogState();

  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction();
    } else {
      closeDialog();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogPortal>
        <DialogOverlay className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center" />
        <DialogContent
          className={`bg-white rounded-lg shadow-lg mx-auto flex flex-col items-center justify-center w-full  transform transition-all duration-300 ease-in-out  ${className}`}
        >
          {success && successMessage ? (
            <Success
              title={successMessage.title}
              subtitle={successMessage.subtitle}
              label={buttonLabel}
              onButtonClick={handleButtonClick}
              className=" border-none shadow-none"
            />
          ) : (
            children
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DialogCard;
