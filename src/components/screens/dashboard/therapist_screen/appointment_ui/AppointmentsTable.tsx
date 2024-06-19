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

interface AppointmentTableProps {
  dropdownItems: { label: string; onClick: () => void }[];
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  dropdownItems,
}) => {
  const [openDropdownIndex, setOpenDropdownIndex] = React.useState<
    number | null
  >(null);

  const toggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const closeDropdown = () => setOpenDropdownIndex(null);

  return (
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
        {appointmentsData.map((item, index) => (
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
                items={dropdownItems}
                isOpen={openDropdownIndex === index}
                onClose={closeDropdown}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AppointmentTable;
