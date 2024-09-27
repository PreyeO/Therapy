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

export const bookingData = [
  {
    name: "Preye Omusuku",
    date: "September 24th, 2024 10:00 AM",
    email: "p@billionaire.com",
    service: "psychology",
    src: Avatar,
    status: "canceled",
  },
  {
    name: "Preye Omusuku",
    date: "September 24th, 2024 10:00 AM",
    email: "p@billionaire.com",
    service: "psychology",
    src: Avatar,
    status: "Attented",
  },
  {
    name: "Preye Omusuku",
    date: "September 24th, 2024 10:00 AM",
    email: "p@billionaire.com",
    service: "psychology",
    src: Avatar,
    status: "Waitlisted",
  },
  {
    name: "Preye Omusuku",
    date: "September 24th, 2024 10:00 AM",
    email: "p@billionaire.com",
    service: "psychology",
    src: Avatar,
    status: "Clinician canceled",
  },
  {
    name: "Preye Omusuku",
    date: "September 24th, 2024 10:00 AM",
    email: "p@billionaire.com",
    service: "psychology",
    src: Avatar,
    status: "Clinician canceled",
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

export const clinicianData = [
  {
    fullname: "Elon Musk",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
  {
    fullname: "Jeff Bezos",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
  {
    fullname: "Preye Omusuku",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
  {
    fullname: "Oprah Winfrey",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$85",
  },
  {
    fullname: "Aliko Dangote",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
  {
    fullname: "Bola Shagaya",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
  {
    fullname: "Mark Zuckerberg",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
  {
    fullname: "Mike Adenuga ",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
  {
    fullname: "Alice Walton ",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
  {
    fullname: "Warren Buffett",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
  {
    fullname: "Daisy Danjuma",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
  {
    fullname: "Dr. Stella Okoli",
    email: "p@yahoo.com",
    city: "New York",
    rate: "$50",
  },
];

export const TimesData = [
  {
    day: "Monday",
    open_hour: "8:00AM",
    closing_hour: "3:00PM",
    location: "7521 Morgan rd Suite 1 Liverpool, NY 13090",
  },

  {
    day: "Tuesday",
    open_hour: "12:00PM",
    closing_hour: "4:00PM",
    location: "7523 Morgan rd Liverpool, NY 13090 ",
  },
  {
    day: "Wednesday",
    open_hour: "10:00AM",
    closing_hour: "5:00PM",
    location: "620 Erie Blvd West Suite 300D Syracuse, NY 13204",
  },

  {
    day: "Friday",
    open_hour: "12:00PM",
    closing_hour: "4:00PM",
    location: "Virtual",
  },
];

// DataManager.ts

// Define color mapping for each service
export const calendarSheetColors = {
  "Psychiatric Evaluation": {
    bgColor: "#E6F0F6",
    textColor: "#0369A1",
  },
  "Psychotherapy 1": {
    bgColor: "#F4EFFF",
    textColor: "#8B5CF6",
  },
  "Psychotherapy 2": {
    bgColor: "#E8F8F3",
    textColor: "#047857",
  },
  "Psychotherapy 3": {
    bgColor: "#FFE4E6",
    textColor: "#BE123C",
  },
  "Family Therapy": {
    bgColor: "#FEF6E7",
    textColor: "#B45309",
  },
  "Group Therapy": {
    bgColor: "#FEC3FF",
    textColor: "#A1039B",
  },
  "Crisis Therapy": {
    bgColor: "#C9D5FF",
    textColor: "#1A4ED5",
  },
  Unavailable: {
    bgColor: "#F9F9F9",
    textColor: "#868686",
  },
};
