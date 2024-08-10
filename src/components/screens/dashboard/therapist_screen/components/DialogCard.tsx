import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  // DialogTitle,
} from "@/components/ui/dialog";
import * as React from "react";
import Success from "@/components/ui/notifications/Success";
import { useDialogState } from "@/store"; // Adjust the import path based on your project structure

const DialogCard: React.FC = () => {
  const {
    isOpen,
    success,
    successMessage,
    closeDialog,
    // title,
    // description,
    children,
  } = useDialogState(); // Access children from the store

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
              className=""
            />
          </DialogContent>
        ) : (
          <DialogContent className="bg-white max-w-[550px] md:h-[450px] flex flex-col items-center justify-center">
            {/* <DialogTitle>{title}</DialogTitle> */}
            {/* {description && <p>{description}</p>} */}
            {children}
          </DialogContent>
        )}
      </DialogPortal>
    </Dialog>
  );
};

export default DialogCard;
