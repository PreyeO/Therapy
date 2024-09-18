import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import React from "react";
import Success from "@/components/ui/notifications/Success";
import { useDialogState } from "@/store";

const DialogCard: React.FC = () => {
  const { isOpen, success, successMessage, closeDialog } = useDialogState();

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogPortal>
        <DialogOverlay className="bg-black bg-opacity-50" />
        {success && successMessage ? (
          <DialogContent className="max-w-[700px] scale-75 lg:scale-75 md:scale-80">
            <Success
              title={successMessage.title}
              subtitle={successMessage.subtitle}
              label="Close"
              onButtonClick={closeDialog}
              className="bg-transparent border-none shadow-none"
            />
          </DialogContent>
        ) : null}
      </DialogPortal>
    </Dialog>
  );
};

export default DialogCard;
