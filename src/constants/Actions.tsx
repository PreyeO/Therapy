import { Check, Menu, Trash2, X } from "lucide-react";
import EditIcon from "@/components/icons/EditIcon";

export const dropdownItemsOne = [
  {
    label: "Waitlist",
    color: "text-[#E25D1A]",
    onClick: () => alert("waitlist"),
    icons: (
      <div className="w-5 h-5 rounded-full">
        <Menu size={18} strokeWidth={1.5} color="black" />
      </div>
    ),
  },
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
    label: "Scheduled",
    color: "text-[#E25D1A]]",
    onClick: () => alert("Declined"),
  },
  {
    label: "No Show",
    color: "text-[#E25D1A]]",
    onClick: () => alert("Declined"),
  },
  {
    label: "Attended",
    color: "text-army_green",
    onClick: () => alert("Accepted"),
  },
  {
    label: "Late Canceled",
    color: "text-[#0418274D]",
    onClick: () => alert("Declined"),
  },

  {
    label: "Clinician Canceled",
    color: "text-[#E25D1A]]",
    onClick: () => alert("Declined"),
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
