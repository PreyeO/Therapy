import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePaginationStore } from "@/store";
import { AppointmentInfo } from "@/types/formSchema";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { formatTime } from "@/lib/utils";
import AppointmentActions from "./AppointmentActions";

interface AppointmentTableProps {
  data: AppointmentInfo[];
  loading: boolean;
  searchPerformed: boolean;
  showActionColumn?: boolean;
  refreshTable: () => void;
}

const ClientAppointmentTable: React.FC<AppointmentTableProps> = ({
  data,
  loading,
  searchPerformed,
  showActionColumn = true,
  refreshTable,
}) => {
  const {
    currentPage,
    itemsPerPage,
    setTotalItems,
    goToNextPage,
    goToPreviousPage,
    setCurrentPage,
  } = usePaginationStore();
  const [appointments, setAppointments] = useState(data);

  const formatAppointmentDate = (
    appointmentDate: string,
    appointmentTime: string
  ) => {
    const [startTime, endTime] = appointmentTime.split(" - ");
    const date = new Date(appointmentDate);
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    const formattedDate = format(date, "MMMM do yyyy,");
    return `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`;
  };

  useEffect(() => {
    setTotalItems(data.length);
    setAppointments(data); // Sync the appointments with prop changes
  }, [data, setTotalItems]);

  if (loading) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (searchPerformed && appointments.length === 0) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <p>No appointments found</p>
      </div>
    );
  }

  const paginatedData = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  return (
    <div className="overflow-x-auto w-full py-12">
      <Table className="bg-white w-full table-auto">
        <TableHeader>
          <TableRow className="text-xl text-[#212121]">
            <TableHead className="font-bold">Clinician Name</TableHead>
            <TableHead className="font-bold">Booked Date</TableHead>
            <TableHead className="font-bold">Service</TableHead>
            {!showActionColumn && (
              <TableHead className="font-bold">Status</TableHead>
            )}
            {showActionColumn && (
              <TableHead className="font-bold">Action</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow
              key={item.id}
              className="text-[#212121] font-normal text-base"
            >
              <TableCell className="flex items-center gap-3">
                <Avatar className="w-[40px] h-[40px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {item.clinician?.first_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {item.clinician?.first_name} {item.clinician?.last_name}
              </TableCell>
              <TableCell>
                {formatAppointmentDate(item.start_time, item.end_time)}
              </TableCell>
              <TableCell>{item.service.name}</TableCell>
              {!showActionColumn && (
                <TableCell className="text-army_green">Attended</TableCell>
              )}
              {showActionColumn && (
                <TableCell className="px-4 py-3 text-left align-middle">
                  <AppointmentActions
                    appointmentId={item.id}
                    startTime={item.start_time}
                    refreshTable={refreshTable}
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

export default ClientAppointmentTable;
