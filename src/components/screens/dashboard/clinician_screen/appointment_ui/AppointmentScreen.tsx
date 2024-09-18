import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentTable from "./AppointmentsTable";
import Title from "@/components/ui/Titles/Title";
import SearchInput from "@/components/ui/search";
import { DatePickerWithRange } from "@/components/common/DatePickerWithRange";
import { useAppointmentsStore } from "@/store/useAppointment";
import { AppointmentRequest } from "@/types/formSchema";
import { getDropdownItemsOne, getDropdownItemsTwo } from "@/constants/Actions";
import DialogCard from "../components/DialogCard";

// Function to format time range (start - end) to "13:00 - 14:00"
const formatTimeRange = (start: string, end: string) => {
  const startTime = new Date(start);
  const endTime = new Date(end);

  const formattedStartTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // 24-hour format
  }).format(startTime);

  const formattedEndTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // 24-hour format
  }).format(endTime);

  return `${formattedStartTime} - ${formattedEndTime}`;
};

// Function to format date to "MM-DD-YY"
const formatDate = (date: string) => {
  const formattedDate = new Date(date);
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = String(formattedDate.getFullYear()).slice(2); // Get last two digits of the year

  return `${month}-${day}-${year}`; // MM-DD-YY format with hyphens
};

// Helper function to map AppointmentRequest[] to AppointmentTable format
const mapToAppointmentRequestFormat = (requests: AppointmentRequest[]) => {
  return requests.map((request) => ({
    id: request.id, // Include the id here
    client: `${request.client.first_name} ${request.client.last_name}`,
    appointmentTime: formatTimeRange(request.start_time, request.end_time),
    appointmentDate: formatDate(request.start_time),
    location: request.service.name,
  }));
};

const AppointmentScreen = () => {
  const {
    fetchAppointmentRequests,
    fetchWaitlistedAppointments,
    fetchUpcomingAppointments,
    appointmentRequests,
    waitlistedAppointments,
    upcomingAppointments,
    loading, // Use the loading state from the store
  } = useAppointmentsStore();

  // Load the correct data based on the default tab when the component mounts
  useEffect(() => {
    fetchAppointmentRequests(); // Default tab is "Appointment Request", so fetch it on mount
  }, [fetchAppointmentRequests]);

  const handleTabChange = (value: string) => {
    if (value === "new") {
      fetchAppointmentRequests(); // Fetch appointment requests for "Appointment Request" tab
    } else if (value === "accepted") {
      fetchUpcomingAppointments(); // Fetch upcoming appointments for "Upcoming Appointment" tab
    } else if (value === "waitlist") {
      fetchWaitlistedAppointments(); // Fetch waitlisted appointments for "Waitlisted Appointment" tab
    }
  };

  return (
    <div className="my-7">
      <DialogCard />
      <Tabs
        defaultValue="new" // Default tab is "Upcoming Appointments"
        className="w-full"
        onValueChange={handleTabChange} // Call when tab changes
      >
        <TabsList className="h-[50px] lg:w-[546px] w-[318px] font-medium mx-auto">
          <TabsTrigger
            value="new"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            Appointment Request
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="w-full lg:text-sm text-[10px] md:text-[12px] bg-white"
          >
            Upcoming Appointment
          </TabsTrigger>
          <TabsTrigger
            value="waitlist"
            className="w-full lg:text-sm text-[10px] md:text-[12px] bg-white"
          >
            Waitlisted Appointment
          </TabsTrigger>
        </TabsList>

        {/* Appointment Requests */}
        <TabsContent
          value="new"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          <div className="flex md:justify-between justify-around py-5 items-center">
            <Title
              title="Appointment Requests"
              className="text-[14.2px] lg:text-2xl md:text-xl font-medium"
            />
            <DatePickerWithRange />
          </div>
          <div className="min-w-[687px] w-full">
            <AppointmentTable
              dropdownItemsGenerator={getDropdownItemsOne} // Pass as dropdownItemsGenerator
              data={mapToAppointmentRequestFormat(appointmentRequests)}
              loading={loading}
            />
          </div>
        </TabsContent>

        {/* Upcoming Appointments */}
        <TabsContent
          value="accepted"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          <div className="py-3">
            <Title
              title="Upcoming Appointments"
              className="text-[14.2px] lg:text-2xl font-medium md:text-xl"
            />
          </div>
          <div className="w-full border rounded-full">
            <SearchInput
              className="focus:ring-transparent text-base text-[#BDBDBD] h-[44px] lg:h-[62px]"
              placeholder="Search for clients"
            />
          </div>
          <div className="min-w-[687px] w-full my-4">
            <AppointmentTable
              dropdownItemsGenerator={getDropdownItemsTwo} // Pass as dropdownItemsGenerator
              data={mapToAppointmentRequestFormat(upcomingAppointments)}
              loading={loading}
            />
          </div>
        </TabsContent>

        {/* Waitlisted Appointments */}
        <TabsContent
          value="waitlist"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          <div className="flex md:justify-between justify-around py-5 items-center">
            <Title
              title="Waitlisted Appointments"
              className="text-[14.2px] lg:text-2xl md:text-xl font-medium"
            />
          </div>
          <div className="min-w-[687px] w-full">
            <AppointmentTable
              dropdownItemsGenerator={getDropdownItemsOne} // Pass as dropdownItemsGenerator
              data={mapToAppointmentRequestFormat(waitlistedAppointments)}
              loading={loading}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentScreen;
