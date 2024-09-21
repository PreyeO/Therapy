import {
  getDateSearch,
  getNameSearch,
  getAppointmentRequests,
  getUpcomingAppointments,
  getWaitlistedAppointments,
  getFullAppointments,
} from "@/services/api/clinicians/appointment";
import { useAppointmentsStore } from "@/store/useAppointment";
import { useSearchStore } from "@/store";
import { useAuthState } from "@/store"; // Import loading state

export const useAppointmentSearch = (activeTab: string) => {
  const {
    setFilteredAppointmentRequests,
    setFilteredUpcomingAppointments,
    setFilteredWaitlistedAppointments,
    setFilteredFullAppointments,
  } = useAppointmentsStore();

  const { searchQuery, dateRange, setSearchQuery, setDateRange } =
    useSearchStore();
  const { setLoading } = useAuthState(); // Use setLoading

  const handleSearch = async () => {
    setLoading(true); // Start loading
    let filteredAppointments = null;

    try {
      if (searchQuery) {
        filteredAppointments = await getNameSearch(searchQuery);
      } else if (dateRange?.start && dateRange?.end) {
        filteredAppointments = await getDateSearch(
          dateRange.start,
          dateRange.end
        );
      }

      // Scope data based on activeTab
      switch (activeTab) {
        case "request": {
          const requestFilteredData = await getAppointmentRequests();
          setFilteredAppointmentRequests(
            filterAppointmentsBySearch(
              requestFilteredData,
              filteredAppointments
            )
          );
          break;
        }
        case "accepted": {
          const upcomingFilteredData = await getUpcomingAppointments();
          setFilteredUpcomingAppointments(
            filterAppointmentsBySearch(
              upcomingFilteredData,
              filteredAppointments
            )
          );
          break;
        }
        case "waitlist": {
          const waitlistedFilteredData = await getWaitlistedAppointments();
          setFilteredWaitlistedAppointments(
            filterAppointmentsBySearch(
              waitlistedFilteredData,
              filteredAppointments
            )
          );
          break;
        }
        case "all": {
          const fullFilteredData = await getFullAppointments();
          setFilteredFullAppointments(
            filterAppointmentsBySearch(fullFilteredData, filteredAppointments)
          );
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false); // End loading after search
    }
  };

  // Filter the appointments by search term or date range
  const filterAppointmentsBySearch = (allAppointments, filteredBySearch) => {
    if (!filteredBySearch) return allAppointments;
    return allAppointments.filter((appointment) =>
      filteredBySearch.some((filtered) => filtered.id === appointment.id)
    );
  };

  return {
    searchQuery,
    dateRange,
    setSearchQuery,
    setDateRange,
    handleSearch,
  };
};
