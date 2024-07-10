import Title from "@/components/ui/Titles/Title";

import PatientTable from "./PatientTable";
import { Input } from "@/components/ui/input";
import SearchInput from "@/components/ui/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PatientScreen = () => {
  return (
    <div className="my-7">
      <div className="bg-white px-[2%] mt-6 w-full overflow-x-auto ">
        <Title title="Patients" className="text-2xl font-medium py-10" />

        <div className="flex justify-between">
          <Input
            placeholder="Pateint ID"
            readOnly
            className="h-14 text-placeholder_text text-[11.28px] font-normal w-[260.56px] rounded-md"
            autoComplete="false"
          />
          <Input
            placeholder="Pateint Name"
            className="h-14 text-placeholder_text text-[11.28px]  font-normal w-[260.56px] rounded-md"
            autoComplete="false"
          />
          <div>
            <Select>
              <SelectTrigger className="h-14 text-placeholder_text text-[11.28px] font-normal w-[260.56px] rounded-md">
                <SelectValue placeholder="status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">All</SelectItem>
                <SelectItem value="dark">Pending</SelectItem>
                <SelectItem value="system">Attended</SelectItem>
                <SelectItem value="system">Missed</SelectItem>
                <SelectItem value="system">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="border rounded-md w-[260.56px]  text-[11.28px] ">
            <SearchInput
              className="h-14 text-placeholder_text font-normal"
              placeholder="Search patients"
            />
          </div>
        </div>

        <div className="min-w-[687px] w-full mt-10">
          <PatientTable />
        </div>
      </div>
    </div>
  );
};

export default PatientScreen;
