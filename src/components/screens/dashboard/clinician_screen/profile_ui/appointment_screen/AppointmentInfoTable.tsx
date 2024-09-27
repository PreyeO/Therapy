// import { useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore"; // Zustand store
// import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

// const AppointmentInfoTable = () => {
//   const { fetchedBusinessPeriods, loading, error, fetchBusinessPeriods } =
//     useBusinessPeriodsStore();

//   useEffect(() => {
//     fetchBusinessPeriods(); // Fetch business periods when the component mounts
//   }, [fetchBusinessPeriods]);

//   if (loading) {
//     return (
//       <div className="relative w-full h-[300px] flex justify-center items-center">
//         <SmallLoader />
//       </div>
//     );
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!fetchedBusinessPeriods || fetchedBusinessPeriods.length === 0) {
//     return <div>No business locations found.</div>;
//   }

//   return (
//     <div className="flex flex-col gap-10 w-full">
//       <div className="overflow-x-auto w-full pt-10">
//         <h3 className=" font-bold text-lg pb-8">Address</h3>
//         <Table className="bg-white pt-5 relative">
//           <TableHeader>
//             <TableRow className="lg:text-sm md:text-[12px] text-[8.28px]">
//               <TableHead className="font-semibold">State</TableHead>
//               <TableHead className="font-semibold">City</TableHead>
//               <TableHead className="font-semibold">Street</TableHead>
//               <TableHead className="font-semibold">Postal Code</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {fetchedBusinessPeriods?.map((period) =>
//               period.business_locations?.length ? (
//                 period.business_locations.map((location, index) => (
//                   <TableRow
//                     key={index}
//                     className="text-[#575757] font-normal lg:text-sm md:text-[12px] text-[8.28px]"
//                   >
//                     <TableCell>{location.location.state}</TableCell>
//                     <TableCell>{location.location.city}</TableCell>
//                     <TableCell>{location.location.street_address}</TableCell>
//                     <TableCell>{location.location.postal_code}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow
//                   key={period.id}
//                   className="text-[#575757] font-normal lg:text-sm md:text-[12px] text-[8.28px]"
//                 >
//                   <TableCell colSpan={4} className="text-center">
//                     No locations available for {period.day_of_week}
//                   </TableCell>
//                 </TableRow>
//               )
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AppointmentInfoTable;
