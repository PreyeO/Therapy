import Title from "@/components/ui/Titles/Title";
import ClientTable from "./ClientTable";

import SearchInput from "@/components/ui/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/common/DatePickerWithRange";

const ClientScreen = () => {
  // const {
  //   searchQuery,

  //   setSearchQuery,

  //   handleSearch,
  // } = useAppointmentSearch();

  return (
    <div className="my-7">
      <div className="bg-white px-[2%] mt-6 w-full overflow-x-auto">
        <div className="flex justify-between">
          <Title title="Clients" className="text-2xl font-medium py-10" />

          <DatePickerWithRange />
        </div>

        <div className="flex justify-between gap-4">
          <SearchInput
            placeholder="Search by client name"
            className="h-14 text-placeholder_text w-full rounded-md border"
          />

          <Select>
            <SelectTrigger className="h-14 text-placeholder_text text-[11.28px] font-normal w-full rounded-md">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-army_green rounded-md w-full h-14">
            Search
          </Button>
        </div>

        <div className="min-w-[687px] w-full mt-10">
          <ClientTable />
        </div>
      </div>
    </div>
  );
};

export default ClientScreen;
