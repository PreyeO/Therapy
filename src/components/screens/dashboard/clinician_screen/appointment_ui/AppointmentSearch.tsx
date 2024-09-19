// src/components/AppointmentSearch.tsx
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search";

interface AppointmentSearchProps {
  onSearch?: () => void;
}

const AppointmentSearch: React.FC<AppointmentSearchProps> = ({ onSearch }) => {
  return (
    <div className="flex gap-6 my-4 w-full items-center justify-end">
      <div className="w-[419px] border rounded-full">
        <SearchInput
          className="focus:ring-transparent text-base text-[#BDBDBD] h-[44px]"
          placeholder="Search for clients"
        />
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

export default AppointmentSearch;
