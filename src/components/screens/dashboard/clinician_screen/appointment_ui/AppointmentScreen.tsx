import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentTable from "./AppointmentsTable";
import Title from "@/components/ui/Titles/Title";
import { DatePickerWithRange } from "@/components/common/DatePickerWithRange";
import { useAppointmentsStore } from "@/store/useAppointment";
import { getDropdownItemsOne, getDropdownItemsTwo } from "@/constants/Actions";
import DialogCard from "../components/DialogCard";
import AppointmentSearch from "./AppointmentSearch";
import AllAppointmentSearch from "./AllAppointmentSearch";
import { mapToAppointmentTableFormat } from "@/lib/utils";
import { AppointmentInfo, DropdownItem } from "@/types/formSchema"; // Assuming types exist

interface RenderTabContentProps {
  title: string;
  data: AppointmentInfo[];
  dropdownItemsGenerator: (
    appointmentId: string,
    openSuccess: (message: { title: string; subtitle: string }) => void
  ) => DropdownItem[];
  loading: boolean;
}

const AppointmentScreen = () => {
  const {
    fetchAppointments,
    fetchAppointmentRequests,
    fetchWaitlistedAppointments,
    fetchUpcomingAppointments,
    appointmentRequests,
    waitlistedAppointments,
    upcomingAppointments,
    loading,
  } = useAppointmentsStore();

  useEffect(() => {
    fetchAppointmentRequests();
  }, [fetchAppointmentRequests]);

  const handleTabChange = (value: string) => {
    switch (value) {
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
        fetchAppointments();
        break;
    }
  };

  const renderTabContent = ({
    title,
    data,
    dropdownItemsGenerator,
    loading,
  }: RenderTabContentProps) => (
    <>
      <div className="flex md:justify-between justify-around py-5 items-center">
        <Title
          title={title}
          className="text-[14.2px] lg:text-2xl md:text-xl font-medium"
        />
        <DatePickerWithRange />
      </div>
      <AppointmentSearch />
      <div className="min-w-[687px] w-full">
        <AppointmentTable
          dropdownItemsGenerator={dropdownItemsGenerator} // This passes the generator function
          data={mapToAppointmentTableFormat(data)}
          loading={loading}
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
            dropdownItemsGenerator: getDropdownItemsOne,
            loading,
          })}
        </TabsContent>

        <TabsContent
          value="accepted"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          {renderTabContent({
            title: "Upcoming Appointments",
            data: upcomingAppointments,
            dropdownItemsGenerator: getDropdownItemsTwo,
            loading,
          })}
        </TabsContent>

        <TabsContent
          value="waitlist"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          {renderTabContent({
            title: "Waitlisted Appointments",
            data: waitlistedAppointments,
            dropdownItemsGenerator: getDropdownItemsOne,
            loading,
          })}
        </TabsContent>

        <TabsContent
          value="all"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          <div className="flex md:justify-between justify-around py-5 items-center">
            <Title
              title="All Appointments"
              className="text-[14.2px] lg:text-2xl md:text-xl font-medium"
            />
            <DatePickerWithRange />
          </div>
          <AllAppointmentSearch />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentScreen;
