import { Check, Menu, Trash2, X } from "lucide-react";
import EditIcon from "@/components/icons/EditIcon";
import { updateAppointmentStatus } from "@/services/api/clinicians/appointment";
import { DropdownItem } from "@/types/formSchema";

export const handleActionClick = async (
  appointmentId: string,
  data: { status?: string; acceptance_status?: string },
  openSuccess: (message: { title: string; subtitle: string }) => void,
  refreshTable: () => void,
  updateState: (
    id: string,
    updatedData: { status?: string; acceptance_status?: string }
  ) => void // Add new parameter for state update
) => {
  try {
    // Call the API to update appointment status
    await updateAppointmentStatus(appointmentId, data);

    // Determine the key and value for success message
    const key = data.status ? "status" : "acceptance_status";
    const value = data.status || data.acceptance_status;

    // Show success message
    openSuccess({
      title: `Appointment ${value}`,
      subtitle: `The appointment ${key} has been successfully updated to ${value}.`,
    });

    // Immediately update the state after successful action
    updateState(appointmentId, data);

    // Optionally refresh table data if needed (fetch from API)
    refreshTable();
  } catch (error) {
    console.error("Failed to update appointment:", error);
  }
};

// Modify `getDropdownItemsOne` to use the new `refreshTable` parameter
export const getDropdownItemsOne = (
  appointmentId: string,
  // navigate: (path: string) => void,
  openSuccess: (message: { title: string; subtitle: string }) => void,
  refreshTable: () => void,
  updateState: (
    id: string,
    updatedData: { status?: string; acceptance_status?: string }
  ) => void // New parameter for state update
): DropdownItem[] => [
  // {
  //   label: "View",
  //   color: "text-[#8BA05F]",
  //   onClick: () =>
  //     navigate(`/clinician_dashboard/clientoverview/${appointmentId}`),
  //   icons: <EditIcon width={18} height={18} />,
  // },
  {
    label: "Waitlist",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(
        appointmentId,
        { acceptance_status: "Waitlisted" },
        openSuccess,
        refreshTable,
        updateState // Pass updateState function
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
        openSuccess,
        refreshTable,
        updateState // Pass updateState function
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
        openSuccess,
        refreshTable,
        updateState // Pass updateState function
      ),
    icons: (
      <div className="w-5 h-5 border border-[#E25D1A] rounded-full">
        <X size={18} strokeWidth={1.5} color="#E25D1A" />
      </div>
    ),
  },
];

export const getDropdownItemsTwo = (
  appointmentId: string,
  navigate: (path: string) => void,
  openSuccess: (message: { title: string; subtitle: string }) => void,
  refreshTable: () => void,
  updateState: (
    id: string,
    updatedData: { status?: string; acceptance_status?: string }
  ) => void // New parameter for state update
): DropdownItem[] => [
  {
    label: "View",
    color: "text-[#8BA05F]",
    onClick: () =>
      navigate(`/clinician_dashboard/clientoverview/${appointmentId}`),
    icons: <EditIcon width={18} height={18} />,
  },
  {
    label: "No Show",
    color: "text-[#E25D1A]",
    onClick: async () =>
      handleActionClick(
        appointmentId,
        { status: "No Show" },
        openSuccess,
        refreshTable,
        updateState // Pass updateState function
      ),
  },
  {
    label: "Attended",
    color: "text-army_green",
    onClick: async () =>
      handleActionClick(
        appointmentId,
        { status: "Attended" },
        openSuccess,
        refreshTable,
        updateState // Pass updateState function
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
export const bookingsData = [
  {
    label: "View",
    color: "text-[#8BA05F]",
    onClick: () => alert("Edit"),
    icons: <EditIcon width={18} height={18} />,
  },
  {
    label: "Cancel",
    color: "text-[#E25D1A]",
    onClick: () => alert("Delete"),
    icons: <Trash2 size={18} strokeWidth={1.5} color="#E25D1A" />,
  },
];

export const historyData = [
  {
    label: "Attended",
    color: "text-[#8BA05F]",
  },
  {
    label: "Canceled",
    color: "text-[#E25D1A]",
  },
];
