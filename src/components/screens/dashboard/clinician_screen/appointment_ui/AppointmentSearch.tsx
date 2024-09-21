import { useAppointmentSearch } from "@/hooks/useAppointmentSearch";
import SearchInput from "@/components/ui/search";
import { useAuthState } from "@/store"; // For loading state
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";

const AppointmentSearch: React.FC<{
  activeTab: string;
  onSearch: () => void;
}> = ({ activeTab, onSearch }) => {
  const { searchQuery, setSearchQuery, handleSearch } =
    useAppointmentSearch(activeTab);
  const { loading } = useAuthState(); // Use loading state

  const triggerSearch = async () => {
    await handleSearch(); // Perform the search
    setSearchQuery(""); // Clear the search input after search
    onSearch(); // Trigger the searchPerformed state change
  };

  return (
    <div className="flex gap-6 my-4 w-full items-center justify-end">
      <div className="w-[419px] border rounded-full">
        <SearchInput
          className="focus:ring-transparent text-base text-[#BDBDBD] h-[44px]"
          placeholder="Search for clients"
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
        />
      </div>
      <div className="w-[212px]">
        <ButtonLoader
          loading={loading}
          text="Search"
          onClick={triggerSearch}
          className="h-[44px]"
        />
      </div>
    </div>
  );
};

export default AppointmentSearch;
