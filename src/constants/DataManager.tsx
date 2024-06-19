import Image1 from "@/assets/image/HeroImage1.svg";
import Image2 from "@/assets/image/HeroImage2.svg";
import Image3 from "@/assets/image/HeroImage3.svg";
import { CircleAlert, CircleX } from "lucide-react";
import Avatar from "@/assets/icon/Avater.svg";

export const imageData = [
  { src: Image1, alt: "This is an image of a therapist", id: 1, size: 174.13 },
  { src: Image2, alt: "This is an image of a therapist", id: 2, size: 174.13 },
  { src: Image3, alt: "This is an image of a therapist", id: 3, size: 174.13 },
];

export const requestsData = [
  {
    name: "Burna Boy",
    src: Avatar,
    // avatar: <LayoutDashboard strokeWidth={2} color="#868686" size={24} />,
    time: "Today . 10:00am",
    acceptIcon: (
      <CircleAlert
        strokeWidth={3}
        color="#8BA05F4D"
        size={26}
        fill="#8BA05F4D"
      />
    ),
    rejectIcon: (
      <CircleX strokeWidth={3} color="#EA43354D" size={26} fill="#EA43354D" />
    ),
  },

  {
    name: "Kizz Daniel",
    src: Avatar,
    // icon: <CalendarCheck strokeWidth={2} color="#868686" size={24} />,
    time: "Today . 10:00am",
    acceptIcon: (
      <CircleAlert
        strokeWidth={3}
        color="#8BA05F4D"
        size={26}
        fill="#8BA05F4D"
      />
    ),
    rejectIcon: (
      <CircleX strokeWidth={3} color="#EA43354D" size={26} fill="#EA43354D" />
    ),
  },

  {
    name: "Wizkid Balogun",
    src: Avatar,
    // icon: <AlarmCheck strokeWidth={2} color="#868686" size={24} />,
    time: "Today . 10:00am",
    acceptIcon: (
      <CircleAlert
        strokeWidth={3}
        color="#8BA05F4D"
        size={26}
        fill="#8BA05F4D"
      />
    ),
    rejectIcon: (
      <CircleX strokeWidth={3} color="#EA43354D" size={26} fill="#EA43354D" />
    ),
  },

  {
    name: "Davido Adeleke",
    src: Avatar,
    // icon: <Users strokeWidth={2} color="#868686" size={24} />,
    time: "Today . 10:00am",
    acceptIcon: (
      <CircleAlert
        strokeWidth={3}
        color="#8BA05F4D"
        size={26}
        fill="#8BA05F4D"
      />
    ),
    rejectIcon: (
      <CircleX strokeWidth={3} color="#EA43354D" size={26} fill="#EA43354D" />
    ),
  },
  {
    name: "Omahlay Stanley",
    src: Avatar,
    // icon: <Users strokeWidth={2} color="#868686" size={24} />,
    time: "Today . 10:00am",
    acceptIcon: (
      <CircleAlert
        strokeWidth={3}
        color="#8BA05F4D"
        size={26}
        fill="#8BA05F4D"
      />
    ),
    rejectIcon: (
      <CircleX strokeWidth={3} color="#EA43354D" size={26} fill="#EA43354D" />
    ),
  },
  {
    name: "Rema Divine",
    src: Avatar,
    // icon: <Users strokeWidth={2} color="#868686" size={24} />,
    time: "Today . 10:00am",
    acceptIcon: (
      <CircleAlert
        strokeWidth={3}
        color="#8BA05F4D"
        size={26}
        fill="#8BA05F4D"
      />
    ),
    rejectIcon: (
      <CircleX strokeWidth={3} color="#EA43354D" size={26} fill="#EA43354D" />
    ),
  },
];

export const upcomingData = [
  {
    name: "Burna Boy",
    time: "2:20pm",
    date: "23-07-2024",
    location: "Chicago",
    status: "Pending",
  },

  {
    name: "Kizz Daniel",
    time: "2:20pm",
    date: "23-07-2024",
    location: "Virtual",
    status: "Pending",
  },
];

export const appointmentsData = [
  {
    name: "Omahlay Stanley",
    time: "2:20pm-3:30pm",
    date: "23-07-2024",
    location: "Virtual",
    status: "Pending",
  },
  {
    name: "Davido Adeleke",
    time: "2:20pm-3:30pm",
    date: "23-07-2024",
    location: "Virtual",
    status: "Pending",
  },
  {
    name: "Rema Divine",
    time: "2:20pm-3:30pm",
    date: "23-07-2024",
    location: "Virtual",
    status: "Pending",
  },
  {
    name: "Arya Starr",
    time: "2:20pm-3:30pm",
    date: "23-07-2024",
    location: "Virtual",
    status: "Pending",
  },
];
