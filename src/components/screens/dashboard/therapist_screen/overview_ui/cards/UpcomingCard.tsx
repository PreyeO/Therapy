import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { upcomingData } from "@/constants/DataManager";

import Title from "@/components/ui/Titles/Title";

const UpcomingCard: React.FC = () => {
  return (
    <div className="w-full bg-white">
      <Title
        title="Upcoming Appointments"
        className="text-[#3A5334] font-bold lg:text-lg py-4 px-4 text-[12.63px]"
      />
      <Table className="bg-white lg:w-full w-[389px] h-auto rounded-lg mb-5 ">
        <TableHeader className="">
          <TableRow className="text-[11.22px] lg:text-base font-medium text-[#040404]">
            <TableHead>Name</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {upcomingData.map((item, index) => (
            <TableRow
              key={index}
              className="text-[#575757] lg:text-[14px] text-[9.82px] font-normal"
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="relative"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UpcomingCard;
