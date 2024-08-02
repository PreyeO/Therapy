import PaginationFnx from "@/components/layouts/paginationFnx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { therapistPatientData } from "@/constants/DataManager";

const PatientTable = () => {
  return (
    <div className="overflow-x-auto w-full">
      <Table className="bg-white pt-5">
        <TableHeader>
          <TableRow className="text-xl  text-[#212121] ">
            <TableHead className=" font-bold">Patient ID</TableHead>
            <TableHead className=" font-bold">Patient Name</TableHead>
            <TableHead className=" font-bold">Phone</TableHead>
            <TableHead className=" font-bold">Email</TableHead>
            <TableHead className=" font-bold"> Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {therapistPatientData.map((item, index) => (
            <TableRow
              key={index}
              className="text-[#212121] font-normal text-base"
            >
              <TableCell>#{item.id}</TableCell>
              <TableCell className="flex items-center gap-1">
                <Avatar className="w-[40px] h-[40px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>avatar</AvatarFallback>
                </Avatar>
                {item.name}
              </TableCell>
              <TableCell>{item.number}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col justify-center">
        <PaginationFnx />
      </div>
    </div>
  );
};

export default PatientTable;
