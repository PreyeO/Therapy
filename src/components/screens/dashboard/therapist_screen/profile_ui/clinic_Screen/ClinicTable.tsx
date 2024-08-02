import EllipsisDropdown from "@/components/common/EllipsisDropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Title from "@/components/ui/Titles/Title";
import { therapistProfileData } from "@/constants/DataManager";
import { Ellipsis } from "lucide-react";
import DialogForm from "./DialogForm";
import DeleteDialog from "./DeleteDialog";
// import { Button } from "@/components/ui/button";
import { useDialogState } from "@/store";
import useDropdown from "@/hooks/useDropdown";
import DialogCard from "../../components/DialogCard";

interface ClinicTableProps {
  dropdownItems: {
    label: string;
    color: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
  dropdownType: "one" | "two";
}

const ClinicTable: React.FC<ClinicTableProps> = ({ dropdownItems }) => {
  const { openDropdownIndex, toggleDropdown, closeDropdown } = useDropdown();
  const {
    isOpen,
    success,
    title,
    children,
    successMessage,
    openDialog,
    closeDialog,
    // openSuccess,
  } = useDialogState();

  const handleEditClick = () => {
    openDialog(
      "Edit Location",
      "This action will edit the location.",
      <>
        <DialogForm />
      </>
    );
  };

  const handleDeleteClick = () => {
    openDialog(
      "Delete Location",
      "Are you sure you want to delete this location?",
      <>
        <DeleteDialog />
        {/* <Button
          className="rounded-full md:h-[60px] h-[37px] text-[10.04px] md:text-base font-normal flex flex-col w-[226px] mt-7"
          onClick={openSuccess}
        >
          Continue
        </Button> */}
      </>
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

  return (
    <div className="flex flex-col gap-10 w-full">
      <Title title="Address" className="text-lg font-bold pt-10" />
      <div className="overflow-x-auto w-full">
        <Table className="bg-white pt-5">
          <TableHeader>
            <TableRow className="lg:text-sm md:text-[12px] text-[8.28px] ">
              <TableHead className=" font-semibold">Office Name</TableHead>
              <TableHead className=" font-semibold">State</TableHead>
              <TableHead className=" font-semibold">City</TableHead>
              <TableHead className=" font-semibold">Street</TableHead>
              <TableHead className=" font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {therapistProfileData.map((item, index) => (
              <TableRow
                key={index}
                className="text-[#575757] font-normal lg:text-sm md:text-[12px] text-[8.28px]"
              >
                <TableCell>{item.office_name}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.street}</TableCell>
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

        <DialogCard
          title={title}
          isOpen={isOpen}
          onClose={closeDialog}
          success={success}
          successMessage={
            successMessage || {
              title: "Location updated Successfully",
              subtitle: "Your location has been updated.",
            }
          }
        >
          {children}
        </DialogCard>
      </div>
    </div>
  );
};

export default ClinicTable;
