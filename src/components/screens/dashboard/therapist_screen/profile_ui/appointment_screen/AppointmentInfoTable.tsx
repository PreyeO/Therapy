import React, { useEffect } from "react";
import EllipsisDropdown from "@/components/common/EllipsisDropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import DialogForm from "./DialogForm";
import DeleteDialog from "./DeleteDialog";
import { useDialogState } from "@/store";
import useDropdown from "@/hooks/useDropdown";
import DialogCard from "../../components/DialogCard";
import { useTherapistProfileState } from "@/store/useTherapistProfileState"; // Use Zustand store
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

interface ClinicTableProps {
  dropdownItems: {
    label: string;
    color: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
  dropdownType: "one" | "two";
}

const AppointmentInfoTable: React.FC<ClinicTableProps> = ({
  dropdownItems,
}) => {
  const { profile, loading, error, fetchProfile } = useTherapistProfileState(); // Use Zustand state
  const { openDropdownIndex, toggleDropdown, closeDropdown } = useDropdown();
  const { openDialog, openSuccess } = useDialogState();

  useEffect(() => {
    fetchProfile(); // Fetch profile data when the component mounts
  }, [fetchProfile]);

  const handleEditClick = () => {
    openDialog(
      "Edit Location",
      "This action will edit the location.",
      <DialogForm onClick={openSuccess} />
    );
  };

  const handleDeleteClick = () => {
    openDialog(
      "Delete Location",
      "Are you sure you want to delete this location?",
      <DeleteDialog />
    );
  };

  const updatedDropdownItems = dropdownItems.map((item) => {
    if (item.label.toLowerCase() === "edit") {
      return {
        ...item,
        onClick: handleEditClick,
      };
    } else if (item.label.toLowerCase() === "delete") {
      return {
        ...item,
        onClick: handleDeleteClick,
      };
    } else {
      return item;
    }
  });

  if (loading) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="overflow-x-auto w-full pt-10">
        <Table className="bg-white pt-5 relative">
          <TableHeader>
            <TableRow className="lg:text-sm md:text-[12px] text-[8.28px]">
              <TableHead className="font-semibold">State</TableHead>
              <TableHead className="font-semibold">City</TableHead>
              <TableHead className="font-semibold">Street</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profile?.appointment_addresses.map((address, index) => (
              <TableRow
                key={index}
                className="text-[#575757] font-normal lg:text-sm md:text-[12px] text-[8.28px]"
              >
                <TableCell>{address.state}</TableCell>
                <TableCell>{address.city}</TableCell>
                <TableCell>{address.street_address}</TableCell>
                <TableCell>
                  <button onClick={() => toggleDropdown(index)}>
                    <Ellipsis size={24} />
                  </button>
                  <EllipsisDropdown
                    items={updatedDropdownItems}
                    isOpen={openDropdownIndex === index}
                    onClose={closeDropdown}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* DialogCard is now self-sufficient */}
        <DialogCard />
      </div>
    </div>
  );
};

export default AppointmentInfoTable;
