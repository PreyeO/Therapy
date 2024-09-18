import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Ellipsis } from "lucide-react";
import EllipsisDropdown from "@/components/common/EllipsisDropdown";
import { useNavigate } from "react-router-dom";
import useDropdown from "@/hooks/useDropdown";
import { useDialogState, usePaginationStore } from "@/store/index";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

// Define the type for appointment data
interface Appointment {
  id: string;
  client: string;
  appointmentTime: string;
  appointmentDate: string;
  location?: string;
}

interface DropdownItem {
  label: string;
  color: string;
  onClick: () => void | Promise<void>; // Allow async functions
  icons?: React.ReactNode;
}

interface AppointmentTableProps {
  dropdownItemsGenerator: (
    appointmentId: string,
    openSuccess: (message: { title: string; subtitle: string }) => void
  ) => DropdownItem[];
  data: Appointment[];
  loading: boolean;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  dropdownItemsGenerator,
  data,
  loading,
}) => {
  const {
    currentPage,
    itemsPerPage,
    setTotalItems,
    goToNextPage,
    goToPreviousPage,
  } = usePaginationStore();
  const { openDropdownIndex, toggleDropdown, closeDropdown } = useDropdown();
  const { openSuccess } = useDialogState(); // For success dialog
  const navigate = useNavigate();

  // Calculate paginated data
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update the total number of items in the pagination store
  useEffect(() => {
    setTotalItems(data.length);
  }, [data, setTotalItems]);

  return (
    <div className="overflow-x-auto w-full">
      {loading ? (
        <div className="relative w-full h-[300px] flex justify-center items-center">
          <SmallLoader />
        </div>
      ) : (
        <>
          <Table className="w-full table-auto bg-white pt-5">
            <thead>
              <TableRow className="text-sm">
                <TableHead className="px-4 py-3 font-semibold">
                  Client Name
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold">Time</TableHead>
                <TableHead className="px-4 py-3 font-semibold">Date</TableHead>
                <TableHead className="px-4 py-3 font-semibold">
                  Location
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold">
                  Action
                </TableHead>
              </TableRow>
            </thead>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="text-[#575757] font-normal text-sm"
                >
                  <TableCell
                    className="px-4 py-3 text-left align-middle cursor-pointer"
                    onClick={() => navigate("/dashboard/clientoverview")}
                  >
                    {item.client}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-left align-middle">
                    {item.appointmentTime}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-left align-middle">
                    {item.appointmentDate}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-left align-middle">
                    {item.location || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-left align-middle">
                    <button
                      className="bg-transparent"
                      onClick={() => toggleDropdown(index)}
                    >
                      <Ellipsis size={24} />
                    </button>
                    <EllipsisDropdown
                      items={dropdownItemsGenerator(item.id, openSuccess)} // Dynamically generate dropdown items
                      isOpen={openDropdownIndex === index}
                      onClose={closeDropdown}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between mt-4">
            <PaginationPrevious onClick={goToPreviousPage} />
            <PaginationNext onClick={goToNextPage} />
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentTable;
