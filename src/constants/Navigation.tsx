import {
  AlarmCheck,
  CalendarCheck,
  CalendarDays,
  ClipboardPlus,
  Coins,
  CreditCard,
  HandCoins,
  Headset,
  Hospital,
  LayoutDashboard,
  MessageSquareDot,
  ReceiptText,
  SlidersHorizontal,
  User,
  Users,
} from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard strokeWidth={2} color="#868686" size={24} />,
    href: "/clinician_dashboard",
  },

  {
    label: "Appointments",
    icon: <AlarmCheck strokeWidth={2} color="#868686" size={24} />,
    href: "/clinician_dashboard/appointment",
  },

  {
    label: "Clients",
    icon: <Users strokeWidth={2} color="#868686" size={24} />,
    href: "/clinician_dashboard/clients",
  },
  {
    label: "Billing",

    icon: <HandCoins strokeWidth={2} color="#868686" size={24} />,
    href: "/clinician_dashboard/billing",
  },
  {
    label: "Calender",

    icon: <CalendarCheck strokeWidth={2} color="#868686" size={24} />,
    href: "/clinician_dashboard/schedule",
  },
];

export const sidebarLinksTwo = [
  {
    label: "Profile Settings",
    icon: <SlidersHorizontal strokeWidth={2} color="#868686" size={24} />,
    href: "/clinician_dashboard/profile",
  },
  // href: "/accountsetup",

  {
    label: "Support",
    icon: <Headset strokeWidth={2} color="#868686" size={24} />,
    href: "/clinician_dashboard/empty",
  },
];

export const miniSidebarLinks = [
  {
    label: "Profile",
    subtitle: "Personal info",
    icon: <User strokeWidth={2} color="#868686" size={20} />,
    href: "/clinician_dashboard/profile",
  },
  {
    label: "Clinincal Information",
    subtitle: "Clinical location",
    icon: <Hospital strokeWidth={2} color="#868686" size={20} />,
    href: "/clinician_dashboard/profile/appointmentinfo",
  },
  {
    label: "Business Period",
    subtitle: "Daily updates about your schedule ",
    icon: <CalendarDays strokeWidth={2} color="#868686" size={20} />,
    href: "/clinician_dashboard/profile/businessperiodinfo",
  },
  {
    label: "Clinic Service",
    subtitle: "List of clinic services",
    icon: <Coins strokeWidth={2} color="#868686" size={20} />,
    href: "/clinician_dashboard/profile/businessservices",
  },

  {
    label: "Email Updates",
    subtitle: "Daily updates about your schedule",
    icon: <MessageSquareDot strokeWidth={2} color="#868686" size={20} />,
    href: "/clinician_dashboard/profile/emailinfo",
  },
];

export const clientSidebarLinks = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard",
  },

  {
    label: "Appointments",
    icon: <AlarmCheck strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/client_appointment",
  },

  {
    label: "Clinicians",
    icon: <Users strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/clinicians",
  },
  {
    label: "Reports",
    icon: <ClipboardPlus strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/clients",
  },
  {
    label: "Payment",

    icon: <CreditCard strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/billing",
  },
];
export const clientSidebarLinksTwo = [
  {
    label: "Receipts",

    icon: <ReceiptText strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/billing",
  },
  {
    label: "Profile Settings",
    icon: <SlidersHorizontal strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/profile",
  },
];
