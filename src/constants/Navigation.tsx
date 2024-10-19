import {
  AlarmCheck,
  CalendarCheck,
  CalendarDays,
  ClipboardPlus,
  Contact,
  // ClipboardPlus,
  CreditCard,
  HandCoins,
  Headset,
  LayoutDashboard,
  MessageSquareDot,
  ReceiptText,
  SlidersHorizontal,
  User,
  Users,
} from "lucide-react";
import Coins from "@/assets/icon/Coins.svg";

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
    href: "/clinician_dashboard/support",
  },
];

export const clientMiniSidebarLinks = [
  {
    label: "Profile",
    subtitle: "Personal info",
    icon: <User strokeWidth={2} color="#868686" size={20} />,
    href: "/client_dashboard/profile",
  },

  {
    label: "Medical Info",
    subtitle: "Your medical information",
    icon: <ClipboardPlus strokeWidth={2} color="#868686" size={20} />,
    href: "/client_dashboard/profile/medicalinfo",
  },
  {
    label: "Emergency Contact",
    subtitle: "Contacts in case of emergency",
    icon: <Contact strokeWidth={2} color="#868686" size={20} />,
    href: "/client_dashboard/profile/emergencycontact",
  },

  {
    label: "Email Updates",
    subtitle: "Updates on your schedule",
    icon: <MessageSquareDot strokeWidth={2} color="#868686" size={20} />,
    href: "/client_dashboard/profile/emailinfo",
  },
];

export const clinicianMiniSidebarLinks = [
  {
    label: "Profile",
    subtitle: "Personal info",
    icon: <User strokeWidth={2} color="#868686" size={20} />,
    href: "/clinician_dashboard/profile",
  },

  {
    label: "Business Period",
    subtitle: "Your work schedule ",
    icon: <CalendarDays strokeWidth={2} color="#868686" size={20} />,
    href: "/clinician_dashboard/profile/businessperiodinfo",
  },
  {
    label: "Clinical Service",
    subtitle: "List of clinical services",
    icon: <img src={Coins} width={20} height={20} />,
    href: "/clinician_dashboard/profile/businessservices",
  },

  {
    label: "Email Updates",
    subtitle: "Updates on your schedule",
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
    label: "Clinicians",
    icon: <Users strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/clinicians",
  },

  {
    label: "Appointments",
    icon: <AlarmCheck strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/client_appointment",
  },

  // {
  //   label: "Reports",
  //   icon: <ClipboardPlus strokeWidth={2} color="#868686" size={24} />,
  //   href: "/client_dashboard/clients",
  // },
  {
    label: "Payments",

    icon: <CreditCard strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/billing",
  },
  {
    label: "Receipts",

    icon: <ReceiptText strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/billing",
  },
];
export const clientSidebarLinksTwo = [
  {
    label: "Support",
    icon: <Headset strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/support",
  },
  {
    label: "Profile Settings",
    icon: <SlidersHorizontal strokeWidth={2} color="#868686" size={24} />,
    href: "/client_dashboard/profile",
  },
];
