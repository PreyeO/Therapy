// import { useState, useEffect, useCallback } from "react";
// import { BusinessPeriod } from "@/types/formSchema";
// import {
//   getTherapistBusinessPeriods,
//   setupTherapistBusinessPeriods,
// } from "@/services/api/therapist/account_setup";
// import { toast } from "react-toastify";

// export const useAccountSetup = () => {
//   const [businessPeriods, setBusinessPeriods] = useState<BusinessPeriod[]>([]);
//   const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);

//   // Fetch therapist's business periods on mount
//   useEffect(() => {
//     const fetchBusinessPeriods = async () => {
//       try {
//         const periods = await getTherapistBusinessPeriods();
//         setBusinessPeriods(periods);
//       } catch (error) {
//         toast.error("Error fetching business periods.");
//       }
//     };

//     fetchBusinessPeriods();
//   }, []);

//   // Handle saving business periods
//   const handleSaveBusinessPeriods = useCallback((periods: BusinessPeriod[]) => {
//     setBusinessPeriods(periods);
//   }, []);

//   // Handle finishing setup by submitting business periods
//   const handleFinishSetup = useCallback(async () => {
//     try {
//       const validBusinessPeriods = businessPeriods.filter(
//         (period) => period.opening_hour && period.closing_hour
//       );
//       await setupTherapistBusinessPeriods(validBusinessPeriods);
//       setIsSetupComplete(true);
//     } catch (error) {
//       toast.error("Error setting up business periods.");
//     }
//   }, [businessPeriods]);

//   return {
//     businessPeriods,
//     isSetupComplete,
//     setIsSetupComplete,
//     handleSaveBusinessPeriods,
//     handleFinishSetup,
//   };
// };
