// utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import chroma from "chroma-js";
import { isSameDay, getHours } from "date-fns";
import { Event } from "@/types/formSchema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEventsForDayAndTime = (
  events: Event[],
  day: Date,
  hour: number
): Event[] => {
  return events.filter((event) => {
    const eventStart = new Date(event.start);
    return isSameDay(eventStart, day) && getHours(eventStart) === hour;
  });
};

// Generate a random background color
const getRandomColor = (): string => {
  return chroma.random().hex();
};

// Generate a contrast color for the text to make it readable against the background
const getContrastColor = (bgColor: string): string => {
  return chroma.contrast(bgColor, "white") > 4.5 ? "white" : "black";
};

// Generate styles for a time slot, returning both background and text color
export const getStylesForTimeSlot = (): {
  bgColor: string;
  textColor: string;
} => {
  const bgColor = getRandomColor(); // Use Chroma.js to get a random color
  const textColor = getContrastColor(bgColor); // Ensure text is readable against the background
  return { bgColor, textColor };
};
