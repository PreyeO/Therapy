// // hooks/useDeleteItem.ts
// import { useCallback } from "react";
// import { toast } from "react-toastify";
// import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";

// type DeleteFunction = (id: string) => Promise<void>;

// export const useDeleteItem = (
//   deleteFunction: DeleteFunction,
//   itemType: keyof BusinessPeriodsState
// ) => {
//   const updateState = useBusinessPeriodsStore((state) => state.updateState);
//   const items = useBusinessPeriodsStore((state) => state[itemType]);

//   const deleteItem = useCallback(
//     async (itemId: string) => {
//       try {
//         await deleteFunction(itemId);
//         const updatedItems = items.filter((item: any) => item.id !== itemId);
//         updateState(itemType, updatedItems);
//         toast.success("Item deleted successfully");
//       } catch (error) {
//         toast.error("Failed to delete item");
//         console.error(`Error deleting ${itemType}:`, error);
//       }
//     },
//     [deleteFunction, itemType, items, updateState]
//   );

//   return { deleteItem };
// };
