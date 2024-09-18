import { Check, Menu, Trash2, X } from "lucide-react";
import EditIcon from "@/components/icons/EditIcon";
import { updateAppointmentStatus } from "@/services/api/clinicians/appointment"; // API call for updating appointment status

// Function to handle the status update
interface DropdownItem {
  label: string;
  color: string;
  onClick: () => void | Promise<void>; // Allow async functions
  icons?: React.ReactNode;
}

const handleActionClick = async (
  appointmentId: string,
  status: string,
  openSuccess: (message: { title: string; subtitle: string }) => void
) => {
  try {
    await updateAppointmentStatus(appointmentId, status); // API call to update status
    openSuccess({
      title: `Appointment ${status}`,
      subtitle: `The appointment status has been successfully updated to ${status}.`,
    });
  } catch (error) {
    console.error("Failed to update appointment status:", error);
  }
};

// Generate dropdown items
export const getDropdownItemsOne = (
  appointmentId: string,
  openSuccess: (message: { title: string; subtitle: string }) => void
): DropdownItem[] => [
  {
    label: "Waitlist",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(appointmentId, "Waitlisted", openSuccess),
    icons: (
      <div className="w-5 h-5 rounded-full">
        <Menu size={18} strokeWidth={1.5} color="black" />
      </div>
    ),
  },
  {
    label: "Accept",
    color: "text-[#8BA05F]",
    onClick: async () =>
      handleActionClick(appointmentId, "Accepted", openSuccess),
    icons: (
      <div className="w-5 h-5 border border-army_green rounded-full">
        <Check size={18} strokeWidth={1.5} color="#8BA05F" />
      </div>
    ),
  },
  {
    label: "Decline",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(appointmentId, "Declined", openSuccess),
    icons: (
      <div className="w-5 h-5 border border-[#E25D1A] rounded-full">
        <X size={18} strokeWidth={1.5} color="#E25D1A" />
      </div>
    ),
  },
];

// Dropdown items for upcoming appointments (e.g., already accepted appointments)
export const getDropdownItemsTwo = (
  appointmentId: string,
  openSuccess: (message: { title: string; subtitle: string }) => void
) => [
  {
    label: "Scheduled",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(appointmentId, "Scheduled", openSuccess),
  },
  {
    label: "No Show",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(appointmentId, "No Show", openSuccess),
  },
  {
    label: "Attended",
    color: "text-army_green",
    onClick: async () =>
      handleActionClick(appointmentId, "Attended", openSuccess),
  },
  {
    label: "Late Canceled",
    color: "text-[#0418274D]",
    onClick: async () =>
      handleActionClick(appointmentId, "Late Canceled", openSuccess),
  },
  {
    label: "Clinician Canceled",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(appointmentId, "Clinician Canceled", openSuccess),
  },
];

export const dropdownItemsProfile = [
  {
    label: "Edit",
    color: "text-[#8BA05F]",
    onClick: () => alert("Edit"),
    icons: <EditIcon width={18} height={18} />,
  },
  {
    label: "Delete",
    color: "text-[#E25D1A]",
    onClick: () => alert("Delete"),
    icons: <Trash2 size={18} strokeWidth={1.5} color="#E25D1A" />,
  },
];
