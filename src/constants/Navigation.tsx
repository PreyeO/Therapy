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
    href: "/dashboard",
  },

  {
    label: "Appointments",
    icon: <AlarmCheck strokeWidth={2} color="#868686" size={24} />,
    href: "/dashboard/appointment",
  },

  {
    label: "Patients",
    icon: <Users strokeWidth={2} color="#868686" size={24} />,
    href: "/dashboard/patients",
  },
  {
    label: "Schedule",

    icon: <CalendarCheck strokeWidth={2} color="#868686" size={24} />,
    href: "/dashboard/schedule",
  },
];

export const sidebarLinksTwo = [
  {
    label: "Notifications",
    icon: <Bell strokeWidth={2} color="#868686" size={24} />,
    href: "/dashboard/empty",
    // auth: false,
  },

  {
    label: "Settings",
    icon: <SlidersHorizontal strokeWidth={2} color="#868686" size={24} />,
    href: "/accountsetup",
  },

  {
    label: "Support",
    icon: <Headset strokeWidth={2} color="#868686" size={24} />,
    href: "support",
  },
];
