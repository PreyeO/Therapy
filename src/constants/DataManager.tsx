import Image1 from "@/assets/image/HeroImage1.svg";
import Image2 from "@/assets/image/HeroImage2.svg";
import Image3 from "@/assets/image/HeroImage3.svg";
import { Check, Download, Trash2, X } from "lucide-react";
import Avatar from "@/assets/icon/Avater.svg";

export const imageData = [
  { src: Image1, alt: "This is an image of a clinician", id: 1, size: 174.13 },
  { src: Image2, alt: "This is an image of a clinician", id: 2, size: 174.13 },
  { src: Image3, alt: "This is an image of a clinician", id: 3, size: 174.13 },
];

export const requestsData = [
  {
    name: "Burna Boy",
    src: Avatar,
    time: "Today . 10:00am",
    acceptIcon: (
      <div className="w-6 h-6 border border-[#8BA05F4D] rounded-full bg-[#8BA05F4D] flex flex-col justify-center items-center">
        <Check size={20} strokeWidth={2} color="#8BA05F" className="" />
      </div>
    ),
    rejectIcon: (
      <div className="w-6 h-6 border border-[#0418274D] rounded-full bg-[#EA43354D] flex flex-col justify-center items-center ">
        <X size={20} strokeWidth={2} color="#EA43354D" />
      </div>
    ),
  },

  {
    name: "Kizz Daniel",
    src: Avatar,
    time: "Today . 10:00am",
    acceptIcon: (
      <div className="w-6 h-6 border border-[#8BA05F4D] rounded-full bg-[#8BA05F4D] flex flex-col justify-center items-center">
        <Check size={20} strokeWidth={2} color="#8BA05F" className="" />
      </div>
    ),
    rejectIcon: (
      <div className="w-6 h-6 border border-[#0418274D] rounded-full bg-[#EA43354D] flex flex-col justify-center items-center ">
        <X size={20} strokeWidth={2} color="#EA43354D" />
      </div>
    ),
  },

  {
    name: "Wizkid Balogun",
    src: Avatar,
    time: "Today . 10:00am",
    acceptIcon: (
      <div className="w-6 h-6 border border-[#8BA05F4D] rounded-full bg-[#8BA05F4D] flex flex-col justify-center items-center">
        <Check size={20} strokeWidth={2} color="#8BA05F" className="" />
      </div>
    ),
    rejectIcon: (
      <div className="w-6 h-6 border border-[#0418274D] rounded-full bg-[#EA43354D] flex flex-col justify-center items-center ">
        <X size={20} strokeWidth={2} color="#EA43354D" />
      </div>
    ),
  },

  {
    name: "Davido Adeleke",
    src: Avatar,
    time: "Today . 10:00am",
    acceptIcon: (
      <div className="w-6 h-6 border border-[#8BA05F4D] rounded-full bg-[#8BA05F4D] flex flex-col justify-center items-center">
        <Check size={20} strokeWidth={2} color="#8BA05F" className="" />
      </div>
    ),
    rejectIcon: (
      <div className="w-6 h-6 border border-[#0418274D] rounded-full bg-[#EA43354D] flex flex-col justify-center items-center ">
        <X size={20} strokeWidth={2} color="#EA43354D" />
      </div>
    ),
  },
  {
    name: "Omahlay",
    src: Avatar,
    time: "Today . 10:00am",
    acceptIcon: (
      <div className="w-6 h-6 border border-[#8BA05F4D] rounded-full bg-[#8BA05F4D] flex flex-col justify-center items-center">
        <Check size={20} strokeWidth={2} color="#8BA05F" className="" />
      </div>
    ),
    rejectIcon: (
      <div className="w-6 h-6 border border-[#0418274D] rounded-full bg-[#EA43354D] flex flex-col justify-center items-center ">
        <X size={20} strokeWidth={2} color="#EA43354D" />
      </div>
    ),
  },
  {
    name: "Rema Divine",
    src: Avatar,
    time: "Today . 10:00am",
    acceptIcon: (
      <div className="w-6 h-6 border border-[#8BA05F4D] rounded-full bg-[#8BA05F4D] flex flex-col justify-center items-center">
        <Check size={20} strokeWidth={2} color="#8BA05F" className="" />
      </div>
    ),
    rejectIcon: (
      <div className="w-6 h-6 border border-[#0418274D] rounded-full bg-[#EA43354D] flex flex-col justify-center items-center ">
        <X size={20} strokeWidth={2} color="#EA43354D" />
      </div>
    ),
  },
];

export const documentData = [
  {
    name: "Medical checkup report.pdf",
    src: Avatar,
    time: "Today . 10:00am",
    acceptIcon: (
      <div className="w-[30px] h-[30px] rounded-md bg-[#F9F9F9] flex flex-col justify-center items-center">
        <Trash2 size={13} color="red" />
      </div>
    ),
    rejectIcon: (
      <div className="w-[30px] h-[30px] rounded-md bg-[#F9F9F9] flex flex-col justify-center items-center">
        <Download size={13} color="#8BA05F" />
      </div>
    ),
  },

  {
    name: "Psychological history report.pdf",
    src: Avatar,
    time: "Today . 10:00am",
    acceptIcon: (
      <div className="w-[30px] h-[30px] rounded-md bg-[#F9F9F9] flex flex-col justify-center items-center">
        <Trash2 size={13} color="red" />
      </div>
    ),
    rejectIcon: (
      <div className="w-[30px] h-[30px] rounded-md bg-[#F9F9F9] flex flex-col justify-center items-center">
        <Download size={13} color="#8BA05F" />
      </div>
    ),
  },

  {
    name: "Consent Form report.pdf",
    src: Avatar,
    time: "Today . 10:00am",
    acceptIcon: (
      <div className="w-[30px] h-[30px] rounded-md bg-[#F9F9F9] flex flex-col justify-center items-center">
        <Trash2 size={13} color="red" />
      </div>
    ),
    rejectIcon: (
      <div className="w-[30px] h-[30px] rounded-md bg-[#F9F9F9] flex flex-col justify-center items-center">
        <Download size={13} color="#8BA05F" />
      </div>
    ),
  },

  {
    name: "Substance use report.pdf",
    src: Avatar,
    time: "Today . 10:00am",
    acceptIcon: (
      <div className="w-[30px] h-[30px] rounded-md bg-[#F9F9F9] flex flex-col justify-center items-center">
        <Trash2 size={13} color="red" />
      </div>
    ),
    rejectIcon: (
      <div className="w-[30px] h-[30px] rounded-md bg-[#F9F9F9] flex flex-col justify-center items-center">
        <Download size={13} color="#8BA05F" />
      </div>
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
    name: "Omahlay",
    time: "2:20pm-3:30pm",
    date: "23-07-2024",
    location: "Virtual",
    status: "Pending",
    color: "#FBA704",
  },
  {
    name: "Davido",
    time: "2:20pm-3:30pm",
    date: "23-07-2024",
    location: "Virtual",
    status: "Pending",
    color: "#FBA704",
  },
  {
    name: "Rema",
    time: "2:20pm-3:30pm",
    date: "23-07-2024",
    location: "Virtual",
    status: "Pending",
    color: "#FBA704",
  },
  {
    name: "Arya Starr",
    time: "2:20pm-3:30pm",
    date: "23-07-2024",
    location: "Virtual",
    status: "Pending",
    color: "#FBA704",
  },
];

export const clinicianclientData = [
  {
    name: "Omahlay",
    id: "RR00000",
    number: "+44 604 5392 66",
    email: "laurajames@gmail.com",
    src: Avatar,
  },
  {
    name: "Omahlay",
    id: "RR00001",
    number: "+44 604 5392 66",
    email: "laurajames@gmail.com",
    src: Avatar,
  },
  {
    name: "Omahlay",
    id: "RR00002",
    number: "+44 604 5392 66",
    email: "laurajames@gmail.com",
    src: Avatar,
  },
  {
    name: "Omahlay",
    id: "RR00003",
    number: "+44 604 5392 66",
    email: "laurajames@gmail.com",
    src: Avatar,
  },
  {
    name: "Omahlay",
    id: "RR00004",
    number: "+44 604 5392 66",
    email: "laurajames@gmail.com",
    src: Avatar,
  },
  {
    name: "Omahlay",
    id: "RR00005",
    number: "+44 604 5392 66",
    email: "laurajames@gmail.com",
    src: Avatar,
  },
  {
    name: "Omahlay",
    id: "RR00006",
    number: "+44 604 5392 66",
    email: "laurajames@gmail.com",
    src: Avatar,
  },
  {
    name: "Omahlay",
    id: "RR00007",
    number: "+44 604 5392 66",
    email: "laurajames@gmail.com",
    src: Avatar,
  },
];

export const TimeData = [
  {
    day: "Monday",
  },

  {
    day: "Tuesday",
  },
  {
    day: "Wednesday",
  },
  {
    day: "Thursday",
  },
  {
    day: "Friday",
  },
];

// clinician profile

export const clinicianProfileData = [
  {
    office_name: "Rockline",
    state: "California",
    city: "San Diego",
    street: "Arouba Rd, San Diego County",
    email_update: "Update when you get new appointment",
  },
  {
    office_name: "Rockline",
    state: "California",
    city: "San Diego",
    street: "Arouba Rd, San Diego County",
    email_update: "Daily update about your schedule",
  },
  {
    office_name: "Rockline",
    state: "California",
    city: "San Diego",
    street: "Arouba Rd, San Diego County",
    email_update: "Update when users cancel an appointment",
  },
];
