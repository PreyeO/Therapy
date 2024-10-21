// AppointmentScreen.tsx
import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentTable from "./AppointmentsTable";
import Title from "@/components/ui/Titles/Title";
import { DatePickerWithRange } from "@/components/common/DatePickerWithRange";
import { useAppointmentsStore } from "@/store/useAppointment";

import DialogCard from "../../components/DialogCard";
import AppointmentSearch from "./AppointmentSearch";
import { getStatusTextColor, mapToAppointmentTableFormat } from "@/lib/utils";
import AllAppointmentSearch from "./AllAppointmentSearch";
import { useSearchStore } from "@/store";
import { getDropdownItemsOne, getDropdownItemsTwo } from "@/constants/Actions";

const AppointmentScreen = () => {
  const [activeTab, setActiveTab] = useState("request");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isActionLoading, setActionLoading] = useState(false);

  const { resetFilters } = useSearchStore();

  // Using Zustand store state and actions
  const {
    fetchAppointmentRequests,
    fetchWaitlistedAppointments,
    fetchUpcomingAppointments,
    fetchFullAppointments,
    fetchAppointmentHistory,
    appointmentRequests,
    upcomingAppointments,
    waitlistedAppointments,
    fullAppointments,
    appointmentHistory,
    filteredAppointmentRequests,
    filteredUpcomingAppointments,
    filteredWaitlistedAppointments,
    filteredFullAppointments,
    loading,
    updateAppointmentInState, // Zustand action to update state
  } = useAppointmentsStore();

  // Refresh table data based on active tab
  const refreshTable = useCallback(() => {
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
      case "history":
        fetchAppointmentHistory();
        break;
      default:
        break;
    }
  }, [
    activeTab,
    fetchAppointmentRequests,
    fetchUpcomingAppointments,
    fetchWaitlistedAppointments,
    fetchFullAppointments,
    fetchAppointmentHistory,
  ]);

  useEffect(() => {
    refreshTable(); // Fetch data initially based on active tab
    setSearchPerformed(false);
    return () => {
      resetFilters();
    };
  }, [activeTab, resetFilters, refreshTable]);
  useEffect(() => {}, [
    appointmentRequests,
    upcomingAppointments,
    waitlistedAppointments,
  ]);

  // Define handleSearch to track when a search is performed
  const handleSearch = () => {
    setSearchPerformed(true);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const historyColumns = [
    {
      key: "clientName",
      label: "Client Name",
      render: (item) => `${item.client || "Unknown"}`,
    },
    {
      key: "email",
      label: "Email",
      render: (item) => item.email || "Email Not Available",
    },
    {
      key: "bookedDate",
      label: "Booked Date",
      render: (item) => item.appointmentDate,
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className={getStatusTextColor(item.status)}>
          {item.status || "Unknown"}
        </span>
      ),
    },
  ];
  const renderTabContent = ({
    title,
    data,
    filteredData,
    dropdownItemsGenerator,
    isAllTab = false,
    isHistory = false,
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
          dropdownItemsGenerator={(appointmentId, openSuccess, updateLoader) =>
            dropdownItemsGenerator(
              appointmentId,
              openSuccess,
              updateLoader,
              updateAppointmentInState // Pass Zustand action for state update
            )
          }
          data={mapToAppointmentTableFormat(filteredData || data)}
          loading={loading || isActionLoading} // Pass action loader state
          searchPerformed={searchPerformed}
          showActionColumn={!isAllTab}
          setActionLoading={setActionLoading} // Pass loader state setter to child
          columns={isHistory ? historyColumns : undefined}
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
            Appointment Requests
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            Upcoming Appointments
          </TabsTrigger>
          <TabsTrigger
            value="waitlist"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            Waitlisted Appointments
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            All Appointments
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            Appointment History
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
            isAllTab: true,
          })}
        </TabsContent>

        <TabsContent value="history">
          {renderTabContent({
            title: "Appointment History",
            data: appointmentHistory,
            filteredData: filteredFullAppointments,
            dropdownItemsGenerator: getDropdownItemsTwo,
            isHistory: true,
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentScreen;
