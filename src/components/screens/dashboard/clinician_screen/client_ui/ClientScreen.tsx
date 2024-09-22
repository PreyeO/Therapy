import { useEffect, useState } from "react";
import Title from "@/components/ui/Titles/Title";
import ClientTable from "./ClientTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppointmentsStore } from "@/store/useAppointment"; // Import the store
import { useSearchStore } from "@/store"; // Import search store to reset search state
import AppointmentSearch from "../appointment_ui/AppointmentSearch";

const ClientScreen = () => {
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if search is performed

  const {
    fetchFullAppointments,
    fullAppointments,
    loading,
    filteredFullAppointments,
  } = useAppointmentsStore(); // Fetch fullAppointments and loading state

  const { resetFilters } = useSearchStore(); // To reset search filters

  // Fetch full appointments on component mount
  useEffect(() => {
    fetchFullAppointments();

    return () => {
      // Reset search state when component unmounts (i.e., when navigating away)
      resetFilters();
    };
  }, [fetchFullAppointments, resetFilters]);

  // Use filteredAppointments if a search has been performed, otherwise use fullAppointments
  const appointments = searchPerformed
    ? filteredFullAppointments
    : fullAppointments;

  // Define handleSearch to track when a search is performed
  const handleSearch = () => {
    setSearchPerformed(true); // Set this to true when a search is triggered
  };

  return (
    <div className="my-7">
      <div className="bg-white px-[2%] mt-6 w-full overflow-x-auto">
        <div className="flex justify-between">
          <Title title="Clients" className="text-2xl font-medium py-10" />
        </div>

        <div className="flex justify-between gap-4 items-center">
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

          <AppointmentSearch
            activeTab="all" // Use the "all" tab for full appointments
            onSearch={handleSearch} // Track when the search is performed
            className="rounded-none h-14"
          />
        </div>

        <div className="min-w-[687px] w-full mt-10">
          {/* Pass appointments data to the ClientTable */}
          <ClientTable appointments={appointments} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ClientScreen;
