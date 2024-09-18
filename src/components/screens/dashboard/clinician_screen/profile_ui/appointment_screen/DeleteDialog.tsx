// import { Button } from "@/components/ui/button";
// import Title from "@/components/ui/Titles/Title";
// import { useDialogState } from "@/store";
// import { Trash2 } from "lucide-react";

// const DeleteDialog = () => {
//   const { openSuccess, closeDialog } = useDialogState();
//   const handleOpenSuccess = () => {
//     openSuccess();
//   };
//   const handleCloseDialog = () => {
//     closeDialog();
//   };
//   return (
//     <div className="flex flex-col gap-10 items-center">
//       <Trash2 size={80} color="#8BA05F" />
//       <Title
//         title="Are you sure you want to delete this location?"
//         className="font-bold text-xl"
//       />
//       <div className="flex gap-4">
//         <Button
//           className="w-[200px] md:h-[50px] h-[37px] rounded-full text-[10.04px] md:text-base font-normal"
//           onClick={handleCloseDialog}
//         >
//           Cancel
//         </Button>
//         <Button
//           className="w-[200px] md:h-[50px] h-[37px] rounded-full text-[10.04px] md:text-base font-normal"
//           onClick={handleOpenSuccess}
//         >
//           Continue
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default DeleteDialog;
