import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isSameDay } from "date-fns";
import { Event } from "@/types/index";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEventsForDayAndTime = (
  events: Event[],
  day: Date,
  time: string
) =>
  events.filter(
    (event) =>
      isSameDay(event.start, day) &&
      event.start.getHours() === parseInt(time.split(":")[0])
  );

export const getStylesForTimeSlot = (hour: number) => {
  if (hour >= 7 && hour < 12)
    return { bgColor: "bg-[#0EA5E91A]", textColor: "#0369A1" };
  if (hour >= 12 && hour < 16)
    return { bgColor: "bg-[#8B5CF61A]", textColor: "#6D28D9" };
  if (hour >= 16 && hour < 18)
    return { bgColor: "bg-[#FFE4E6]", textColor: "#BE123C" };
  return { bgColor: "bg-white", textColor: "" };
};
