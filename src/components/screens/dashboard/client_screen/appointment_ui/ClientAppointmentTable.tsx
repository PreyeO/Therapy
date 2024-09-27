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

// Accept showStatus prop to control display of Status and Action columns
const ClientAppointmentTable = ({ showStatus }) => {
  return (
    <div className="overflow-x-auto w-full py-12">
      <Table className="bg-white w-full table-auto">
        <TableHeader>
          <TableRow className="text-xl text-[#212121]">
            <TableHead className="font-bold">Client Name</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">Booked Date</TableHead>
            <TableHead className="font-bold">Service</TableHead>
            {/* Show "Status" header only if showStatus is true */}
            {showStatus ? (
              <TableHead className="font-bold">Status</TableHead>
            ) : (
              <TableHead className="font-bold">Action</TableHead>
            )}
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
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
                {item.name}
              </TableCell>

              <TableCell>{item.email}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.service}</TableCell>
              {/* Conditionally render "Status" or "Action" based on showStatus */}
              {showStatus ? (
                <TableCell>{item.status}</TableCell>
              ) : (
                <TableCell>
                  <Ellipsis />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientAppointmentTable;
