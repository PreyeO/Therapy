import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
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
        <DialogOverlay className=" bg-black/80" />
        {!success ? (
          <DialogContent className=" bg-white">{children}</DialogContent>
        ) : (
          <DialogContent className="bg-transparent  border-none">
            {successMessage && (
              <Success
                title={successMessage.title}
                subtitle={successMessage.subtitle}
                label="Close"
                onButtonClick={onClose}
              />
            )}
          </DialogContent>
        )}
      </DialogPortal>
    </Dialog>
  );
};

export default DialogCard;
