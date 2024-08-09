// import { useState } from "react";
// import OverlayPortal from "./OverlayPortal";
// import ServiceCard from "./ServiceCard";
// import { AppointmentAddress } from "@/types";
// import { SquarePlus } from "lucide-react";

// interface AddLocationProps {
//   addAppointmentAddress: (address: AppointmentAddress) => void;
// }

// const AddLocation = ({ addAppointmentAddress }: AddLocationProps) => {
//   const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

//   const toggleOverlay = () => {
//     setIsOverlayVisible(!isOverlayVisible);
//   };

//   const closeOverlay = () => {
//     setIsOverlayVisible(false);
//   };

//   const handleAddLocation = (address: AppointmentAddress) => {
//     console.log("Adding appointment address from AddLocation:", address);
//     addAppointmentAddress(address);
//     closeOverlay();
//   };

//   return (
//     <div>
//       <div
//         className="mx-auto w-[311px] flex items-center justify-center gap-2 text-lg font-bold text-army_green bg-[#6D7C431A] rounded-full cursor-pointer h-[56px]"
//         onClick={toggleOverlay}
//       >
//         <SquarePlus size={24} color="#6D7C43" />
//         Add appointment location
//       </div>
//       {isOverlayVisible && (
//         <OverlayPortal>
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//             onClick={closeOverlay} // Close overlay when clicking outside
//           >
//             <div onClick={(e) => e.stopPropagation()}>
//               {" "}
//               {/* Prevent closing on click inside */}
//               <ServiceCard addAppointmentAddress={handleAddLocation} />
//             </div>
//           </div>
//         </OverlayPortal>
//       )}
//     </div>
//   );
// };

// export default AddLocation;
