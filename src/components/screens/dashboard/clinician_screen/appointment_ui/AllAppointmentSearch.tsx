// src/components/AllAppointmentSearch.tsx
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AllAppointmentSearchProps {
  onSearch?: () => void;
}

const AllAppointmentSearch: React.FC<AllAppointmentSearchProps> = ({
  onSearch,
}) => {
  return (
    <div className="flex gap-6 my-4 w-full items-center justify-end">
      <div className="w-[419px] border rounded-full">
        <SearchInput
          className="focus:ring-transparent text-base text-[#BDBDBD] h-[44px]"
          placeholder="Search for clients"
        />
      </div>
      <div>
        <Select>
          <SelectTrigger className="h-14 text-placeholder_text text-[11.28px] font-normal w-[261px] rounded-md">
            <SelectValue placeholder="status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="no-show">No Show</SelectItem>
            <SelectItem value="attended">Attended</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="canceled">Client Canceled</SelectItem>
            <SelectItem value="canceled">Clinician Canceled</SelectItem>
            <SelectItem value="canceled">WaitListed</SelectItem>
            <SelectItem value="canceled">Late Cancel</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        className="bg-army_green rounded-full w-[212px]"
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default AllAppointmentSearch;
