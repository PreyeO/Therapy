import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import * as React from "react";
import Success from "@/components/ui/notifications/Success";

interface DialogCardProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  success?: boolean;
  successMessage?: { title: string; subtitle: string };
}

const DialogCard: React.FC<DialogCardProps> = ({
  isOpen,
  onClose,
  children,
  success = false,
  successMessage,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className=" bg-black bg-opacity-50 " />
        {success && successMessage ? (
          <DialogContent className="max-w-[700px] scale-75 lg:scale-75 md:scale-80">
            <Success
              title={successMessage.title}
              subtitle={successMessage.subtitle}
              label="Close"
              onButtonClick={onClose}
              className=""
            />
          </DialogContent>
        ) : (
          <DialogContent className=" bg-white max-w-[550px] md:h-[450px] flex flex-col items-center justify-center">
            <DialogTitle>{children}</DialogTitle>
          </DialogContent>
        )}
      </DialogPortal>
    </Dialog>
  );
};

export default DialogCard;
