import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppointmentsStore } from "@/store/useAppointment";
import ClientAppointmentTable from "./ClientAppointmentTable";
import { AppointmentInfo } from "@/types/formSchema";

const ClientAppointmentScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"accepted" | "history">(
    "accepted"
  );

  const {
    fetchUpcomingAppointments,
    upcomingAppointments,
    appointmentHistory,
    filteredUpcomingAppointments,
    fetchAppointmentHistory,

    loading,
  } = useAppointmentsStore();

  useEffect(() => {
    if (activeTab === "accepted") {
      fetchUpcomingAppointments();
    } else if (activeTab === "history") {
      fetchAppointmentHistory();
    }
  }, [activeTab, fetchUpcomingAppointments, fetchAppointmentHistory]);

  useEffect(() => {}, [upcomingAppointments]);

  const handleTabChange = (value: "accepted" | "history") => {
    setActiveTab(value);
  };

  const refreshTable = () => {
    // Re-fetch the appointment data based on the active tab
    if (activeTab === "accepted") {
      fetchUpcomingAppointments();
    } else if (activeTab === "history") {
      fetchAppointmentHistory();
    }
  };

  const renderTabContent = (
    appointments: AppointmentInfo[],
    showActionColumn: boolean = true
  ) => (
    <ClientAppointmentTable
      data={appointments}
      loading={loading}
      searchPerformed={false}
      showActionColumn={showActionColumn}
      refreshTable={refreshTable}
    />
  );

  return (
    <div className="my-7">
      <Tabs
        defaultValue="accepted"
        className="w-full"
        onValueChange={(value) =>
          handleTabChange(value as "accepted" | "history")
        }
      >
        <TabsList className="h-[50px] lg:w-[40%] w-[318px] font-medium mx-auto my-6 mt-10">
          <TabsTrigger
            value="accepted"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            Upcoming Appointment
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            Appointment History
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="accepted"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          {renderTabContent(
            filteredUpcomingAppointments || upcomingAppointments
          )}
        </TabsContent>
        <TabsContent
          value="history"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          {renderTabContent(appointmentHistory, false)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientAppointmentScreen;
