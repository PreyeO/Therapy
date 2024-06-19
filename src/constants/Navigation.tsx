import {
  AlarmCheck,
  Bell,
  CalendarCheck,
  Headset,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const sidebarLinks = [
  {
    label: "Overview",
    icon: <LayoutDashboard strokeWidth={2} color="#868686" size={24} />,
    href: "overview",
  },

  {
    label: "Schedule",

    icon: <CalendarCheck strokeWidth={2} color="#868686" size={24} />,
    href: "schedule",
  },

  {
    label: "Appointments",
    icon: <AlarmCheck strokeWidth={2} color="#868686" size={24} />,
    href: "courses",
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
    icon: <Settings strokeWidth={2} color="#868686" size={24} />,
    href: "notification",
  },

  {
    label: "Support",
    icon: <Headset strokeWidth={2} color="#868686" size={24} />,
    href: "search",
  },
];
