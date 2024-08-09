// import SetupHeader from "../SetupHeader";
// import EditIcon from "@/components/icons/EditIcon";
// import AddLocation from "../AddLocation";
// import { useAccountSetup } from "@/hooks/useAccountSetup";
// import { AppointmentAddress } from "@/types";

// interface LocationStepTwoProps {
//   addAppointmentAddress: (address: AppointmentAddress) => void;
// }

// const LocationStepTwo = ({ addAppointmentAddress }: LocationStepTwoProps) => {
//   const { formState } = useAccountSetup();

//   return (
//     <div className="relative flex flex-col gap-10">
//       <div className="text-center">
//         <SetupHeader
//           title="Where will you like your appointment to take place?"
//           subtitle="Enter locations where your clients can meet up with you."
//         />
//       </div>
//       <div className="flex justify-center gap-5 items-center">
//         <div className="flex flex-col gap-5">
//           {formState.appointment_addresses?.map((address, index) => (
//             <p key={index}>
//               {address.street_address}, {address.city}, {address.state}{" "}
//               {address.postal_code}
//             </p>
//           ))}
//         </div>
//         <div className="flex flex-col gap-5">
//           {formState.appointment_addresses?.map((_, index) => (
//             <EditIcon key={index} />
//           ))}
//         </div>
//       </div>
//       <AddLocation addAppointmentAddress={addAppointmentAddress} />
//     </div>
//   );
// };

// export default LocationStepTwo;
