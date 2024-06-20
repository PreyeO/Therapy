import {
  AlarmCheck,
  BadgeCheck,
  Bell,
  CalendarCheck,
  CircleAlert,
  CircleX,
  Headset,
  LayoutDashboard,
  MinusCircle,
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
  {
    label: "Accept",
    onClick: () => alert("Accepted"),
    icon: <CircleAlert strokeWidth={1.5} color="#8BA05F4D" size={20} />,
  },
  {
    label: "Decline",
    onClick: () => alert("Declined"),
    icon: <CircleX strokeWidth={1.5} color="#EA43354D" size={20} />,
  },
];

export const dropdownItemsTwo = [
  {
    label: "Attended",
    onClick: () => alert("Accepted"),
    icon: <BadgeCheck strokeWidth={1.5} color="#8BA05F4D" size={20} />,
  },
  {
    label: "Missed",
    onClick: () => alert("Declined"),
    icon: <MinusCircle strokeWidth={1.5} color="#04182766" size={20} />,
  },
  {
    label: "Canceled",
    onClick: () => alert("Declined"),
    icon: <CircleX strokeWidth={1.5} color="#EA43354D" size={20} />,
  },
];
