import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentTable from "./AppointmentsTable";
import Title from "@/components/ui/Titles/Title";
import SearchInput from "@/components/ui/search";
import { dropdownItemsOne, dropdownItemsTwo } from "@/constants/Actions";
import { DatePickerWithRange } from "./DatePickerWithRange";

const AppointmentScreen = () => {
  return (
    <div className="my-7">
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="h-[50px] lg:w-[446px] w-[318px] font-medium mx-auto">
          <TabsTrigger
            value="new"
            className="w-full lg:text-sm md:text-[12px] text-[10px]"
          >
            Appointment Request
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="w-full lg:text-sm text-[10px] md:text-[12px]"
          >
            Upcoming Appointment
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="new"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto "
        >
          <div className="flex md:justify-between justify-around py-5 items-center ">
            <Title
              title="Appointments"
              className="text-[14.2px] lg:text-2xl md:text-xl font-medium"
            />
            <DatePickerWithRange />
          </div>
          <div className="min-w-[687px] w-full">
            <AppointmentTable
              dropdownItems={dropdownItemsOne}
              dropdownType="one"
            />
          </div>
        </TabsContent>
        <TabsContent
          value="accepted"
          className="bg-white px-[2%] mt-6 w-full overflow-x-auto "
        >
          <div className="py-3">
            <Title
              title="Upcoming Appointments"
              className="text-[14.2px] lg:text-2xl font-medium md:text-xl"
            />
          </div>
          <SearchInput />
          <div className="min-w-[687px] w-full my-4">
            <AppointmentTable
              dropdownItems={dropdownItemsTwo}
              dropdownType="two"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentScreen;
