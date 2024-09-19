import { Check, Menu, Trash2, X } from "lucide-react";
import EditIcon from "@/components/icons/EditIcon";
import { updateAppointmentStatus } from "@/services/api/clinicians/appointment";
import { DropdownItem } from "@/types/formSchema";

// Function to handle the status update

const handleActionClick = async (
  appointmentId: string,
  data: { status?: string; acceptance_status?: string },
  openSuccess: (message: { title: string; subtitle: string }) => void
) => {
  try {
    await updateAppointmentStatus(appointmentId, data); // Send dynamic data
    const key = data.status ? "status" : "acceptance_status";
    const value = data.status || data.acceptance_status;

    openSuccess({
      title: `Appointment ${value}`,
      subtitle: `The appointment ${key} has been successfully updated to ${value}.`,
    });
  } catch (error) {
    console.error("Failed to update appointment:", error);
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
      handleActionClick(
        appointmentId,
        { acceptance_status: "Waitlisted" },
        openSuccess
      ),
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
      handleActionClick(
        appointmentId,
        { acceptance_status: "Accepted" },
        openSuccess
      ),
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
      handleActionClick(
        appointmentId,
        { acceptance_status: "Declined" },
        openSuccess
      ),
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
): DropdownItem[] => [
  {
    label: "Scheduled",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(appointmentId, { status: "Scheduled" }, openSuccess),
  },
  {
    label: "No Show",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(appointmentId, { status: "No Show" }, openSuccess),
  },
  {
    label: "Attended",
    color: "text-army_green",
    onClick: async () =>
      handleActionClick(appointmentId, { status: "Attended" }, openSuccess),
  },
  {
    label: "Late Cancel",
    color: "text-[#0418274D]",
    onClick: async () =>
      handleActionClick(appointmentId, { status: "Late Cancel" }, openSuccess),
  },
  {
    label: "Clinician Canceled",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(
        appointmentId,
        { status: "Clinician Canceled" },
        openSuccess
      ),
  },
  {
    label: "Client Canceled",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(
        appointmentId,
        { status: "Client Canceled" },
        openSuccess
      ),
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
