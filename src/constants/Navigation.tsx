import {
  AlarmCheck,
  Bell,
  CalendarCheck,
  Headset,
  LayoutDashboard,
  SlidersHorizontal,
  Users,
} from "lucide-react";

export const sidebarLinks = [
  {
    label: "Overview",
    icon: <LayoutDashboard strokeWidth={2} color="#868686" size={24} />,
    href: "",
  },

  {
    label: "Schedule",

    icon: <CalendarCheck strokeWidth={2} color="#868686" size={24} />,
    href: "schedule",
  },

  {
    label: "Appointments",
    icon: <AlarmCheck strokeWidth={2} color="#868686" size={24} />,
    href: "appointment",
  },

  {
    label: "Patients",
    icon: <Users strokeWidth={2} color="#868686" size={24} />,
    href: "search",
  },
];

export const sidebarLinksTwo = [
  {
    label: "Notifications",
    icon: <Bell strokeWidth={2} color="#868686" size={24} />,
    href: "rooms",
    auth: false,
  },

  {
    label: "Account Settings",
    icon: <SlidersHorizontal strokeWidth={2} color="#868686" size={24} />,
    href: "notification",
  },

  {
    label: "Support",
    icon: <Headset strokeWidth={2} color="#868686" size={24} />,
    href: "search",
  },
];
export const dropdownItemsOne = [
  { label: "Accept", onClick: () => alert("Accepted") },
  { label: "Decline", onClick: () => alert("Declined") },
];
export const dropdownItemsTwo = [
  { label: "Attended", onClick: () => alert("Accepted") },
  { label: "Missed", onClick: () => alert("Declined") },
  { label: "Canceled", onClick: () => alert("Declined") },
];
