// ClientTable.tsx
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
import { usePaginationStore } from "@/store";

// Update the prop type to accept clients instead of appointments
const ClientTable = ({ clients, loading }) => {
  const {
    currentPage,
    itemsPerPage,
    setTotalItems,
    goToNextPage,
    goToPreviousPage,
    setCurrentPage,
  } = usePaginationStore();

  // Calculate paginated data
  const paginatedData = clients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTotalItems(clients.length);
  }, [clients, setTotalItems]);

  if (loading) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  const totalPages = Math.ceil(clients.length / itemsPerPage);

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
          {paginatedData.map((client, index) => (
            <TableRow
              key={index}
              className="text-[#212121] font-normal text-base"
            >
              <TableCell className="flex items-center gap-1">
                <Avatar className="w-[40px] h-[40px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{client.first_name.charAt(0)}</AvatarFallback>
                </Avatar>
                {client.first_name} {client.last_name}
              </TableCell>
              <TableCell>
                {client.client_profile.phone_number || "N/A"}
              </TableCell>
              <TableCell>{client.email}</TableCell>
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
