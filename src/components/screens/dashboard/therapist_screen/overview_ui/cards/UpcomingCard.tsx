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
import Title from "@/components/ui/Titles/Title";
import { dropdownItemsTwo } from "@/constants/Navigation";

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

  return (
    <Table className="bg-white w-full h-auto rounded-lg mb-5">
      <TableHeader>
        <Title
          title="Appointments"
          className="text-[#3A5334] font-bold text-lg py-4 px-4"
        />
        <TableRow className="text-base font-medium text-[#040404]">
          <TableHead>Patient Name</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
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
            <TableCell>{item.status}</TableCell>
            <TableCell className="relative">
              <button onClick={() => toggleDropdown(index)}>
                <Ellipsis size={24} />
              </button>
              <Dropdown
                items={dropdownItemsTwo}
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
