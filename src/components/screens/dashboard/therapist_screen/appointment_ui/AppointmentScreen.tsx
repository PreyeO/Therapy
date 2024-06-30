import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentTable from "./AppointmentsTable";
import Title from "@/components/ui/Titles/Title";
import SearchInput from "@/components/ui/search";
import { dropdownItemsOne, dropdownItemsTwo } from "@/constants/Actions";
// import PaginationFnx from "@/components/functions/paginationFnx";

const AppointmentScreen = () => {
  return (
    <div className="my-7">
      <Tabs defaultValue="new" className=" ">
        <TabsList className="h-[50px]  lg:w-[446px] w-[318px] font-medium mx-auto">
          <TabsTrigger value="new" className="w-full lg:text-sm text-[10px]">
            Appointment Request
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="w-full lg:text-sm text-[10px]"
          >
            Upcoming Appointment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="bg-white px-[2%] mt-6">
          <div className="flex justify-between py-5 ">
            <Title
              title="New Appointments"
              className=" text-[14.2px] lg:text-2xl font-medium "
            />
            DATE
          </div>
          <AppointmentTable
            dropdownItems={dropdownItemsOne}
            dropdownType="one"
          />
        </TabsContent>
        <TabsContent
          value="accepted"
          className="bg-white px-[2%] flex flex-col gap-3 mt-6"
        >
          <div className="flex justify-between py-3">
            <Title
              title="Upcoming Appointments"
              className=" text-[14.2px] lg:text-2xl  font-medium "
            />
            DATE
          </div>
          <SearchInput />
          <AppointmentTable
            dropdownItems={dropdownItemsTwo}
            dropdownType="two"
          />
        </TabsContent>
        {/* <PaginationFnx /> */}
      </Tabs>
    </div>
  );
};

export default AppointmentScreen;
