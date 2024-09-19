import {
  AlarmCheck,
  CalendarCheck,
  CalendarDays,
  Coins,
  HandCoins,
  Headset,
  Hospital,
  LayoutDashboard,
  MessageSquareDot,
  SlidersHorizontal,
  User,
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
    label: "Clients",
    icon: <Users strokeWidth={2} color="#868686" size={24} />,
    href: "/dashboard/clients",
  },
  {
    label: "Billing",

    icon: <HandCoins strokeWidth={2} color="#868686" size={24} />,
    href: "/dashboard/billing",
  },
  {
    label: "Calender",

    icon: <CalendarCheck strokeWidth={2} color="#868686" size={24} />,
    href: "/dashboard/schedule",
  },
];

export const sidebarLinksTwo = [
  // {
  //   label: "Notifications",
  //   icon: <Bell strokeWidth={2} color="#868686" size={24} />,
  //   href: "/dashboard/empty",
  //   // auth: false,
  // },

  {
    label: "Profile Settings",
    icon: <SlidersHorizontal strokeWidth={2} color="#868686" size={24} />,
    href: "/dashboard/profile",
  },
  // href: "/accountsetup",

  {
    label: "Support",
    icon: <Headset strokeWidth={2} color="#868686" size={24} />,
    href: "/dashboard/empty",
  },
];

export const miniSidebarLinks = [
  {
    label: "Profile",
    subtitle: "Personal info",
    icon: <User strokeWidth={2} color="#868686" size={20} />,
    href: "/dashboard/profile",
  },
  {
    label: "Clinincal Information",
    subtitle: "Clinical location",
    icon: <Hospital strokeWidth={2} color="#868686" size={20} />,
    href: "/dashboard/profile/appointmentinfo",
  },
  {
    label: "Business Period",
    subtitle: "Daily updates about your schedule ",
    icon: <CalendarDays strokeWidth={2} color="#868686" size={20} />,
    href: "/dashboard/profile/businessperiodinfo",
  },
  {
    label: "Clinic Service",
    subtitle: "List of clinic services",
    icon: <Coins strokeWidth={2} color="#868686" size={20} />,
    href: "/dashboard/profile/businessservices",
  },

  {
    label: "Email Updates",
    subtitle: "Daily updates about your schedule",
    icon: <MessageSquareDot strokeWidth={2} color="#868686" size={20} />,
    href: "/dashboard/profile/emailinfo",
  },
];
