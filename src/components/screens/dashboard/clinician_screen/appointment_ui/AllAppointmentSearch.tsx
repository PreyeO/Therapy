import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllAppointmentSearch: React.FC = () => {
  return (
    <div className="">
      <Select>
        <SelectTrigger className="h-14 text-placeholder_text text-[11.28px] font-normal w-[261px] rounded-md ">
          <SelectValue placeholder="status (not functional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="no-show">No Show</SelectItem>
          <SelectItem value="attended">Attended</SelectItem>
          <SelectItem value="scheduled">Scheduled</SelectItem>
          <SelectItem value="canceled">Client Canceled</SelectItem>
          <SelectItem value="canceled">Clinician Canceled</SelectItem>
          <SelectItem value="waitlisted">WaitListed</SelectItem>
          <SelectItem value="late-cancel">Late Cancel</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AllAppointmentSearch;
