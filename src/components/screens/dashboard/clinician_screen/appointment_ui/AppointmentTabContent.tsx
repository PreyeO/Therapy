// import { DatePickerWithRange } from "@/components/common/DatePickerWithRange";
// import AppointmentTable from "./AppointmentsTable";
// import Title from "@/components/ui/Titles/Title";
// import AppointmentSearch from "./AppointmentSearch";
// import { AppointmentRequest } from "@/types/formSchema"; // Use proper type

// interface AppointmentTabContentProps {
//   title: string;
//   data: AppointmentRequest[];
//   dropdownItemsGenerator: (
//     appointmentId: string,
//     openSuccess: (message: { title: string; subtitle: string }) => void
//   ) => any;
//   loading: boolean;
//   onSearch?: () => void;
//   showSearch?: boolean;
//   customSearchComponent?: React.ReactNode;
// }

// const AppointmentTabContent: React.FC<AppointmentTabContentProps> = ({
//   title,
//   data,
//   dropdownItemsGenerator,
//   loading,
//   onSearch,
//   showSearch = true,
//   customSearchComponent,
// }) => {
//   return (
//     <div className="bg-white px-[2%] mt-6 w-full overflow-x-auto">
//       <div className="flex md:justify-between justify-around py-5 items-center">
//         <Title
//           title={title}
//           className="text-[14.2px] lg:text-2xl md:text-xl font-medium"
//         />
//         <DatePickerWithRange />
//       </div>
//       {showSearch &&
//         (customSearchComponent ||
//           (onSearch && <AppointmentSearch onSearch={onSearch} />))}
//       <div className="min-w-[687px] w-full my-4">
//         <AppointmentTable
//           dropdownItemsGenerator={dropdownItemsGenerator}
//           data={data}
//           loading={loading}
//         />
//       </div>
//     </div>
//   );
// };

// export default AppointmentTabContent;
