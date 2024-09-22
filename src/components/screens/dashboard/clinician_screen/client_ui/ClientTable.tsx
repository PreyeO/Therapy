import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePaginationStore } from "@/store"; // Ensure your custom pagination logic store is used

// Accept appointments and loading state as props
const ClientTable = ({ appointments, loading }) => {
  const {
    currentPage,
    itemsPerPage,
    setTotalItems,
    goToNextPage,
    goToPreviousPage,
    setCurrentPage,
  } = usePaginationStore();

  // Calculate paginated data
  const paginatedData = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTotalItems(appointments.length);
  }, [appointments, setTotalItems]);

  if (loading) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  return (
    <div className="overflow-x-auto w-full">
      <Table className="bg-white pt-5">
        <TableHeader>
          <TableRow className="text-xl text-[#212121]">
            <TableHead className="font-bold">Client Name</TableHead>
            <TableHead className="font-bold">Phone</TableHead>
            <TableHead className="font-bold">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow
              key={index}
              className="text-[#212121] font-normal text-base"
            >
              <TableCell className="flex items-center gap-1">
                <Avatar className="w-[40px] h-[40px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {item.client.first_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {item.client.first_name} {item.client.last_name}
              </TableCell>
              <TableCell>+2345679643</TableCell>
              <TableCell>{item.client.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Section */}
      <div className="py-3 mt-4">
        <div className="border p-[0.1px] w-[100%]" />
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

export default ClientTable;
