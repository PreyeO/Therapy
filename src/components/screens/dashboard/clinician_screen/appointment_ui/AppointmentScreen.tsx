import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentTable from "./AppointmentsTable";
import Title from "@/components/ui/Titles/Title";
import { DatePickerWithRange } from "@/components/common/DatePickerWithRange";
import { useAppointmentsStore } from "@/store/useAppointment";
import { getDropdownItemsOne, getDropdownItemsTwo } from "@/constants/Actions";
import DialogCard from "../../components/DialogCard";
import AppointmentSearch from "./AppointmentSearch";
import { mapToAppointmentTableFormat } from "@/lib/utils";
import AllAppointmentSearch from "./AllAppointmentSearch";
import { useSearchStore } from "@/store";

const AppointmentScreen = () => {
  const [activeTab, setActiveTab] = useState("request");
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if search is performed
  const { resetFilters } = useSearchStore();

  const {
    fetchAppointmentRequests,
    fetchWaitlistedAppointments,
    fetchUpcomingAppointments,
    fetchFullAppointments,
    appointmentRequests,
    upcomingAppointments,
    waitlistedAppointments,
    fullAppointments,
    filteredAppointmentRequests,
    filteredUpcomingAppointments,
    filteredWaitlistedAppointments,
    filteredFullAppointments,
    loading,
  } = useAppointmentsStore();

  useEffect(() => {
    switch (activeTab) {
      case "request":
        fetchAppointmentRequests();
        break;
      case "accepted":
        fetchUpcomingAppointments();
        break;
      case "waitlist":
        fetchWaitlistedAppointments();
        break;
      case "all":
        fetchFullAppointments();
        break;
    }
    setSearchPerformed(false);
    return () => {
      // Reset search state when component unmounts (i.e., when navigating away)
      resetFilters();
    };
  }, [
    activeTab,
    fetchAppointmentRequests,
    fetchUpcomingAppointments,
    fetchWaitlistedAppointments,
    fetchFullAppointments,
    resetFilters,
  ]);

  // Define handleSearch to track when a search is performed
  const handleSearch = () => {
    setSearchPerformed(true); // Set this to true when a search is triggered
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const renderTabContent = ({
    title,
    data,
    filteredData,
    dropdownItemsGenerator,
    isAllTab = false,
  }) => (
    <>
      <div className="flex md:justify-between justify-around py-5 items-center">
        <Title
          title={title}
          className="text-[14.2px] lg:text-2xl md:text-xl font-medium"
        />
        <DatePickerWithRange activeTab={activeTab} />
      </div>

      {/* Render the search bar differently for the "All" tab */}
      {isAllTab ? (
        <div className="flex gap-6 my-4 w-full items-center justify-between">
          <AllAppointmentSearch />
          <AppointmentSearch activeTab={activeTab} onSearch={handleSearch} />
        </div>
      ) : (
        <AppointmentSearch activeTab={activeTab} onSearch={handleSearch} />
      )}

      <div className="min-w-[687px] w-full">
        <AppointmentTable
          dropdownItemsGenerator={dropdownItemsGenerator}
          data={mapToAppointmentTableFormat(filteredData || data)}
          loading={loading}
          searchPerformed={searchPerformed}
          showActionColumn={!isAllTab}
        />
      </div>
    </>
  );

  return (
    <div className="my-7">
      <DialogCard />
      <Tabs
        defaultValue="request"
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="h-[50px] lg:w-[80%] w-[318px] font-medium mx-auto">
          <TabsTrigger
            value="request"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            Appointment Request
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            Upcoming Appointment
          </TabsTrigger>
          <TabsTrigger
            value="waitlist"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            Waitlisted Appointment
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            All Appointment
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="request"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          {renderTabContent({
            title: "Appointment Requests",
            data: appointmentRequests,
            filteredData: filteredAppointmentRequests,
            dropdownItemsGenerator: getDropdownItemsOne,
          })}
        </TabsContent>

        <TabsContent
          value="accepted"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          {renderTabContent({
            title: "Upcoming Appointments",
            data: upcomingAppointments,
            filteredData: filteredUpcomingAppointments,
            dropdownItemsGenerator: getDropdownItemsTwo,
          })}
        </TabsContent>

        <TabsContent
          value="waitlist"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          {renderTabContent({
            title: "Waitlisted Appointments",
            data: waitlistedAppointments,
            filteredData: filteredWaitlistedAppointments,
            dropdownItemsGenerator: getDropdownItemsOne,
          })}
        </TabsContent>

        <TabsContent
          value="all"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          {renderTabContent({
            title: "All Appointments",
            data: fullAppointments,
            filteredData: filteredFullAppointments,
            dropdownItemsGenerator: getDropdownItemsTwo,
            isAllTab: true, // Indicate that this is the "All" tab
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentScreen;
