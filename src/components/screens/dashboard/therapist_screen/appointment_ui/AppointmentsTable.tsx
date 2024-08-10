import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { appointmentsData } from "@/constants/DataManager";
import DialogCard from "@/components/screens/dashboard/therapist_screen/components/DialogCard";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PaginationFnx from "@/components/layouts/paginationFnx";
import { useNavigate } from "react-router-dom";
import { Ellipsis } from "lucide-react";
import EllipsisDropdown from "@/components/common/EllipsisDropdown";
import useDropdown from "@/hooks/useDropdown";
import { useDialogState } from "@/store/index";

interface AppointmentTableProps {
  dropdownItems: {
    label: string;
    color: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
  dropdownType: "one" | "two";
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  dropdownItems,
  dropdownType,
}) => {
  const { openDropdownIndex, toggleDropdown, closeDropdown } = useDropdown();
  const { openDialog, openSuccess } = useDialogState();

  const [data, setData] = React.useState(appointmentsData);
  const navigate = useNavigate();

  const handleStatusUpdate = (index: number, status: string) => {
    const updatedData = [...data];
    updatedData[index].status = status;
    setData(updatedData);
    closeDropdown();
  };

  const handleNavigate = () => {
    navigate("/dashboard/patientoverview");
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table className="bg-white pt-5">
        <TableHeader>
          <TableRow className="lg:text-sm md:text-[12px] text-[8.28px] ">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Time</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Location</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className="text-[#575757] font-normal lg:text-sm md:text-[12px] text-[8.28px]"
            >
              <TableCell onClick={handleNavigate}>{item.name}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell style={{ color: item.color }}>{item.status}</TableCell>
              <TableCell>
                <button onClick={() => toggleDropdown(index)}>
                  <Ellipsis size={24} />
                </button>
                <EllipsisDropdown
                  items={dropdownItems.map((dropdownItem) => ({
                    ...dropdownItem,
                    onClick: () => {
                      handleStatusUpdate(index, dropdownItem.label);
                      if (dropdownType === "one") {
                        openDialog(
                          dropdownItem.label,
                          `This action will ${dropdownItem.label.toLowerCase()} the appointment.`,
                          <>
                            <p className="py-8 lg:text-2xl md:text-xl text-sm lg:leading-8 leading-4 font-normal">
                              Would you like to send a custom message to the
                              patient?
                            </p>
                            <Textarea
                              placeholder="Add a custom message (optional)"
                              className="text-[13px] md:text-lg font-normal"
                            />

                            <Button
                              className="rounded-full md:h-[60px] h-[37px] text-[10.04px] md:text-base font-normal flex flex-col w-[226px] mt-7"
                              onClick={() => {
                                openSuccess();
                              }}
                            >
                              Send
                            </Button>
                          </>
                        );
                      }
                    },
                  }))}
                  isOpen={openDropdownIndex === index}
                  onClose={closeDropdown}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col justify-center">
        <PaginationFnx />
      </div>
      {/* DialogCard is now self-sufficient */}
      <DialogCard />
    </div>
  );
};

export default AppointmentTable;
