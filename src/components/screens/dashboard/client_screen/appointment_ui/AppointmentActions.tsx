import { useState } from "react";
import VerificationCard from "@/components/screens/dashboard/components/VerificationCard";
import EllipsisDropdown from "@/components/common/EllipsisDropdown";
import { updateAppointmentStatus } from "@/services/api/clinicians/appointment";
import { isWithinNext24Hours } from "@/lib/utils";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import WarningCard from "./WarningCard";
import Success from "@/components/ui/notifications/Success";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { toast } from "react-toastify"; // Import toast for notifications

const AppointmentActions = ({
  appointmentId,
  startTime,
  refreshTable,
}: {
  appointmentId: string;
  startTime: string;
  refreshTable: () => void;
}) => {
  const [currentModal, setCurrentModal] = useState<
    "verification" | "warning" | "success" | null
  >(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown state

  const handleCancelClick = () => {
    setCurrentModal("verification");
    setDropdownOpen(false); // Close dropdown when action is triggered
  };

  const handleVerificationYes = () => {
    if (isWithinNext24Hours(startTime)) {
      setCurrentModal("warning");
    } else {
      handleFinalCancellation("Client Canceled");
    }
  };

  const handleWarningYes = () => {
    setCurrentModal(null); // Close the warning modal before final cancellation
    handleFinalCancellation("Late Cancel");
  };

  const handleFinalCancellation = async (status: string) => {
    try {
      await updateAppointmentStatus(appointmentId, { status });
      setCurrentModal("success");
      refreshTable(); // Refresh the table after successful update
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      toast.error("Failed to update appointment status. Please try again."); // Display error toast
    }
  };

  return (
    <div className="relative">
      {/* Dropdown Trigger Button */}
      <Button
        className="bg-transparent"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <Ellipsis color="black" />
      </Button>

      {/* Ellipsis Dropdown for actions */}
      <EllipsisDropdown
        items={[
          {
            label: "View",
            color: "text-[#8BA05F]",
            onClick: () => alert("View Content"),
          },
          {
            label: "Cancel",
            color: "text-[#E25D1A]",
            onClick: handleCancelClick,
          },
        ]}
        isOpen={dropdownOpen}
        onClose={() => setDropdownOpen(false)}
      />

      {/* Dialogs for various actions */}

      {/* Verification Dialog */}
      <Dialog
        open={currentModal === "verification"}
        onOpenChange={(open) => !open && setCurrentModal(null)}
      >
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
        <DialogContent className=" z-50">
          <VerificationCard
            onYes={handleVerificationYes}
            onNo={() => setCurrentModal(null)}
            title="  Are you sure you want to cancel your appointment?"
          />
        </DialogContent>
      </Dialog>

      {/* Warning Dialog */}
      <Dialog
        open={currentModal === "warning"}
        onOpenChange={(open) => !open && setCurrentModal(null)}
      >
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
        <DialogContent className=" z-50">
          <WarningCard
            onYes={handleWarningYes}
            onNo={() => setCurrentModal(null)} // Close modal when "No" is clicked
          />
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={currentModal === "success"}
        onOpenChange={(open) => !open && setCurrentModal(null)} // Prevent closing on click outside
      >
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
        <DialogContent className=" z-50">
          <Success
            title="Appointment Canceled"
            subtitle="Your appointment has been successfully canceled."
            label="Close"
            onButtonClick={() => setCurrentModal(null)} // Close modal when "Close" is clicked
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentActions;
