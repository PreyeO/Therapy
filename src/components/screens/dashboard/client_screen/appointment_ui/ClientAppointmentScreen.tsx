import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ClientAppointmentTable from "./ClientAppointmentTable";

const ClientAppointmentScreen = () => {
  return (
    <div>
      <Tabs defaultValue="upcoming" className="w-full py-6">
        <TabsList className="h-[50px] lg:w-[80%] w-[318px] font-medium mx-auto">
          <TabsTrigger
            value="upcoming"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            Upcoming Appointment
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="w-full lg:text-sm md:text-[12px] text-[10px] bg-white"
          >
            History Appointment
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="upcoming"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          <ClientAppointmentTable />
        </TabsContent>
        <TabsContent
          value="history"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto"
        >
          <ClientAppointmentTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientAppointmentScreen;
