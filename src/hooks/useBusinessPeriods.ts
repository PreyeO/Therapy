// // src/hooks/useBusinessPeriods.ts

// import { useState } from "react";
// import { BusinessPeriod } from "@/types/formSchema";

// const formatTime = (time: string) => {
//   return time.length === 5 ? `${time}:00` : time;
// };

// export const useBusinessPeriods = () => {
//   const [businessPeriods, setBusinessPeriods] = useState<BusinessPeriod[]>([
//     {
//       day_of_week: "Monday",
//       opening_hour: "",
//       closing_hour: "",
//       appointment_location_ids: [],
//     },
//     {
//       day_of_week: "Tuesday",
//       opening_hour: "",
//       closing_hour: "",
//       appointment_location_ids: [],
//     },
//     {
//       day_of_week: "Wednesday",
//       opening_hour: "",
//       closing_hour: "",
//       appointment_location_ids: [],
//     },
//     {
//       day_of_week: "Thursday",
//       opening_hour: "",
//       closing_hour: "",
//       appointment_location_ids: [],
//     },
//     {
//       day_of_week: "Friday",
//       opening_hour: "",
//       closing_hour: "",
//       appointment_location_ids: [],
//     },
//     {
//       day_of_week: "Saturday",
//       opening_hour: "",
//       closing_hour: "",
//       appointment_location_ids: [],
//     },
//     {
//       day_of_week: "Sunday",
//       opening_hour: "",
//       closing_hour: "",
//       appointment_location_ids: [],
//     },
//   ]);

//   const updateBusinessPeriod = (
//     index: number,
//     period: Partial<BusinessPeriod>
//   ) => {
//     setBusinessPeriods((prev) => {
//       const newPeriods = [...prev];
//       const updatedPeriod = { ...newPeriods[index], ...period };

//       // Ensure the time formatting is correct
//       if (updatedPeriod.opening_hour) {
//         updatedPeriod.opening_hour = formatTime(updatedPeriod.opening_hour);
//       }
//       if (updatedPeriod.closing_hour) {
//         updatedPeriod.closing_hour = formatTime(updatedPeriod.closing_hour);
//       }

//       newPeriods[index] = updatedPeriod;
//       return newPeriods;
//     });
//   };

//   return {
//     businessPeriods,
//     updateBusinessPeriod,
//   };
// };
