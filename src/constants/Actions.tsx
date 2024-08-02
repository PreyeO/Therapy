import { Check, Minus, Trash2, X } from "lucide-react";
import EditIcon from "@/components/icons/EditIcon";

export const dropdownItemsOne = [
  {
    label: "Accept",
    color: "text-[#8BA05F]",
    onClick: () => alert("Accepted"),
    icons: (
      <div className="w-5 h-5 border border-army_green rounded-full">
        <Check size={18} strokeWidth={1.5} color="#8BA05F" />
      </div>
    ),
  },
  {
    label: "Decline",
    color: "text-[#E25D1A]",
    onClick: () => alert("Declined"),
    icons: (
      <div className="w-5 h-5 border border-[#E25D1A] rounded-full">
        <X size={18} strokeWidth={1.5} color="#E25D1A" />
      </div>
    ),
  },
];

export const dropdownItemsTwo = [
  {
    label: "Attended",
    color: "text-army_green",
    onClick: () => alert("Accepted"),
    icons: (
      <div className="w-5 h-5 border border-army_green rounded-full">
        <Check size={18} strokeWidth={1.5} color="#8BA05F" />
      </div>
    ),
  },
  {
    label: "Missed",
    color: "text-[#0418274D]",
    onClick: () => alert("Declined"),
    icons: (
      <div className="w-5 h-5 border border-[#0418274D] rounded-full">
        <Minus size={18} strokeWidth={1.5} color="#0418274D" />
      </div>
    ),
  },

  {
    label: "Canceled",
    color: "text-[#E25D1A]]",
    onClick: () => alert("Declined"),
    icons: (
      <div className="w-5 h-5 border border-[#E25D1A] rounded-full">
        <X size={18} strokeWidth={1.5} color="#E25D1A" />
      </div>
    ),
  },
];

export const dropdownItemsProfile = [
  {
    label: "Edit",
    color: "text-[#8BA05F]",
    onClick: () => alert("Edit"),
    icons: <EditIcon width={18} height={18} />,
  },
  {
    label: "Delete",
    color: "text-[#E25D1A]",
    onClick: () => alert("Delete"),
    icons: <Trash2 size={18} strokeWidth={1.5} color="#E25D1A" />,
  },
];
