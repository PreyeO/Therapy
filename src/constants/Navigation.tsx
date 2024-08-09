import {
  AlarmCheck,
  Bell,
  CalendarCheck,
  CalendarDays,
  Headset,
  Hospital,
  LayoutDashboard,
  MessageSquareDot,
  SlidersHorizontal,
  Users,
} from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
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
    label: "Profile Settings",
    icon: <SlidersHorizontal strokeWidth={2} color="#868686" size={24} />,
    href: "/dashboard/profile",
  },
  // href: "/accountsetup",

  {
    label: "Support",
    icon: <Headset strokeWidth={2} color="#868686" size={24} />,
    href: "support",
  },
];

export const miniSidebarLinks = [
  {
    label: "Profile Info",
    subtitle: "Personal info",
    icon: <Users strokeWidth={2} color="#868686" size={20} />,
    href: "/dashboard/profile",
  },
  {
    label: "Appointment Info",
    subtitle: "Appointment location",
    icon: <Hospital strokeWidth={2} color="#868686" size={20} />,
    href: "/dashboard/profile/appointmentinfo",
  },
  {
    label: "Business Periods",
    subtitle: "Sessions Timeslot",
    icon: <CalendarDays strokeWidth={2} color="#868686" size={20} />,
    href: "/dashboard/profile/businessperiodinfo",
  },
  {
    label: "Email Updates",
    subtitle: "Daily schedule updates",
    icon: <MessageSquareDot strokeWidth={2} color="#868686" size={20} />,
    href: "/dashboard/profile/emailinfo",
  },
];
