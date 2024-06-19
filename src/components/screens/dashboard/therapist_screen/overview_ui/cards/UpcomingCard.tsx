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
import { upcomingData } from "@/constants/DataManager";
import { Ellipsis } from "lucide-react";

const UpcomingCard: React.FC = () => {
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

  const dropdownItems = [
    { label: "Accept", onClick: () => alert("Accepted") },
    { label: "Decline", onClick: () => alert("Declined") },
  ];

  return (
    <Table className="bg-white w-full h-auto rounded-lg mb-5 overflow-hidden">
      <TableHeader>
        <h2 className="text-[#3A5334] font-bold text-lg py-4 px-4">
          Upcoming Appointments
        </h2>
        <TableRow className="text-base font-medium text-[#040404] ">
          <TableHead>Patient Name</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {upcomingData.map((item, index) => (
          <TableRow
            key={index}
            className="text-[#575757] text-[14px] font-normal"
          >
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.time}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.location}</TableCell>
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

export default UpcomingCard;
