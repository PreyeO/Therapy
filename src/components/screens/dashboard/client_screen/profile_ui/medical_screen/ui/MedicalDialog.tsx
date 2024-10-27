import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

interface MedicalDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  formComponent: React.ReactNode;
  className?: string;
}

const MedicalDialog: React.FC<MedicalDialogProps> = ({
  open,
  onClose,
  title,
  formComponent,
  className,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center" />
        <DialogContent className="scale-90">
          <DialogHeader>
            <DialogTitle className={`text-[30px] font-medium ${className}`}>
              {title}
            </DialogTitle>
          </DialogHeader>
          {formComponent}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default MedicalDialog;
