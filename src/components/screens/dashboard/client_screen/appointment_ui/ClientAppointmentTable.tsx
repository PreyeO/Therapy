import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { bookingData } from "@/constants/DataManager";
import { Ellipsis } from "lucide-react";

// Accept appointments and loading state as props
const ClientAppointmentTable = () => {
  // Calculate paginated data
  //   const paginatedData = appointments.slice(
  //     (currentPage - 1) * itemsPerPage,
  //     currentPage * itemsPerPage
  //   );

  //   useEffect(() => {
  //     setTotalItems(appointments.length);
  //   }, [appointments, setTotalItems]);

  //   if (loading) {
  //     return (
  //       <div className="relative w-full h-[300px] flex justify-center items-center">
  //         <SmallLoader />
  //       </div>
  //     );
  //   }

  //   const totalPages = Math.ceil(appointments.length / itemsPerPage);

  return (
    <div className="overflow-x-auto w-full py-12 ">
      <Table className="bg-white w-full table-auto ">
        <TableHeader>
          <TableRow className="text-xl text-[#212121] ">
            <TableHead className="font-bold">Client Name</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">Booked Date</TableHead>
            <TableHead className="font-bold">Service</TableHead>
            <TableHead className="font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingData.map((item, index) => (
            <TableRow
              key={index}
              className="text-[#212121] font-normal text-base"
            >
              <TableCell className="flex items-center gap-3">
                <Avatar className="w-[40px] h-[40px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Avater</AvatarFallback>
                </Avatar>
                {item.name}
              </TableCell>

              <TableCell>{item.email}</TableCell>
              <TableCell className="">{item.date}</TableCell>
              <TableCell>{item.service}</TableCell>
              <TableCell>
                <Ellipsis />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <div className="py-3 mt-4">
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
      </div> */}
    </div>
  );
};

export default ClientAppointmentTable;
