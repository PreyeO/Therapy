import Image1 from "@/assets/image/HeroImage1.svg";
import Image2 from "@/assets/image/HeroImage2.svg";
import Image3 from "@/assets/image/HeroImage3.svg";
import { Check, X } from "lucide-react";
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
    name: "Omahlay Stanley",
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
    color: "#FBA704",
  },
  {
    name: "Davido Adeleke",
    time: "2:20pm-3:30pm",
    date: "23-07-2024",
    location: "Virtual",
    status: "Pending",
    color: "#FBA704",
  },
  {
    name: "Rema Divine",
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
