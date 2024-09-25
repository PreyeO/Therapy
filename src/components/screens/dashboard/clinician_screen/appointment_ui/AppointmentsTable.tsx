import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Ellipsis } from "lucide-react";
import EllipsisDropdown from "@/components/common/EllipsisDropdown";
import { useNavigate } from "react-router-dom";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import { useDialogState, useDropdownStore, usePaginationStore } from "@/store";
import { Appointment, DropdownItem } from "@/types/formSchema";

interface AppointmentTableProps {
  dropdownItemsGenerator: (
    appointmentId: string,
    openSuccess: (message: { title: string; subtitle: string }) => void
  ) => DropdownItem[];
  data: Appointment[];
  loading: boolean;
  searchPerformed: boolean;
  showActionColumn?: boolean; // New prop to control visibility of the "Action" column
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  dropdownItemsGenerator,
  data,
  loading,
  searchPerformed,
  showActionColumn = true, // Default to true to show the action column
}) => {
  const {
    currentPage,
    itemsPerPage,
    setTotalItems,
    goToNextPage,
    goToPreviousPage,
    setCurrentPage,
  } = usePaginationStore();
  const { openDropdownIndex, toggleDropdown, closeDropdown } =
    useDropdownStore();
  const { openSuccess } = useDialogState();
  const navigate = useNavigate();

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTotalItems(data.length);
  }, [data, setTotalItems]);

  if (loading) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  if (searchPerformed && data.length === 0) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <p>No appointments found</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="w-full min-h-[500px] flex flex-col justify-between">
      <Table className="w-full table-auto bg-white pt-5">
        <thead className="">
          <TableRow className="text-sm">
            <TableHead className="px-4 py-3 font-semibold pt-8">
              Client Name
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold pt-8">Time</TableHead>
            <TableHead className="px-4 py-3 font-semibold pt-8">Date</TableHead>
            <TableHead className="px-4 py-3 font-semibold pt-8">
              Location
            </TableHead>
            {showActionColumn && (
              <TableHead className="px-4 py-3 font-semibold pt-8">
                Action
              </TableHead>
            )}
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
              {showActionColumn && (
                <TableCell className="px-4 py-3 text-left align-middle">
                  <button
                    className="bg-transparent"
                    onClick={() => toggleDropdown(index)}
                  >
                    <Ellipsis size={24} />
                  </button>
                  <EllipsisDropdown
                    items={dropdownItemsGenerator(item.id, openSuccess)}
                    isOpen={openDropdownIndex === index}
                    onClose={closeDropdown}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Section */}
      <div className="py-3 mt-4">
        <div className="border p-[0.1px] w-[100%]"></div>
        <Pagination className="flex justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={goToPreviousPage} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={goToNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AppointmentTable;
