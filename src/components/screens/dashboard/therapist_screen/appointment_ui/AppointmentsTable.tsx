import * as React from "react";
import Dropdown from "@/components/ui/dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { appointmentsData } from "@/constants/DataManager";
import { Ellipsis } from "lucide-react";
import DialogCard from "@/components/screens/dashboard/therapist_screen/appointment_ui/DialogCard";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AppointmentTableProps {
  dropdownItems: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
  dropdownType: "one" | "two";
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  dropdownItems,
  dropdownType,
}) => {
  const [openDropdownIndex, setOpenDropdownIndex] = React.useState<
    number | null
  >(null);
  const [data, setData] = React.useState(appointmentsData);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState({
    title: "",
    description: "",
  });
  const [dialogChildren, setDialogChildren] =
    React.useState<React.ReactNode>(null);

  const toggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const closeDropdown = () => setOpenDropdownIndex(null);

  const handleStatusUpdate = (index: number, status: string) => {
    const updatedData = [...data];
    updatedData[index].status = status;
    setData(updatedData);
    closeDropdown();
  };

  const handleDialogOpen = (
    title: string,
    description: string,
    children: React.ReactNode
  ) => {
    setDialogContent({ title, description });
    setDialogChildren(children);
    setDialogOpen(true);
    setSuccess(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSuccess(false);
  };

  const handleSuccessOpen = () => {
    setSuccess(true);
  };

  return (
    <div>
      <Table className="bg-white mt-5">
        <TableHeader className="">
          <TableRow className="text-base font-medium text-[#040404]">
            <TableHead className="">Patient Name</TableHead>
            <TableHead>Time of appointment</TableHead>
            <TableHead>Date of appointment</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className="text-[#575757] text-[14px] font-normal"
            >
              <TableCell>{item.name}</TableCell>

              <TableCell>{item.time}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="relative">
                <button onClick={() => toggleDropdown(index)}>
                  <Ellipsis size={24} />
                </button>
                <Dropdown
                  items={dropdownItems.map((dropdownItem) => ({
                    ...dropdownItem,
                    onClick: () => {
                      if (dropdownType === "one") {
                        handleStatusUpdate(index, dropdownItem.label);
                        handleDialogOpen(
                          dropdownItem.label,
                          `This action will ${dropdownItem.label.toLowerCase()} the appointment.`,
                          <>
                            <p>
                              Would you like to send a custom message to the
                              patient?
                            </p>
                            <Textarea placeholder="Type your message here." />
                            <Button
                              className="w-[226px] rounded-full mt-2"
                              onClick={handleSuccessOpen}
                            >
                              Send message
                            </Button>
                          </>
                        );
                      } else {
                        handleStatusUpdate(index, dropdownItem.label);
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
      <DialogCard
        title={dialogContent.title}
        isOpen={dialogOpen}
        onClose={handleDialogClose}
        success={success}
        successMessage={{
          title: "Message Sent Successfully",
          subtitle: "Your message has been sent to the patient.",
        }}
      >
        {dialogChildren}
      </DialogCard>
    </div>
  );
};

export default AppointmentTable;
