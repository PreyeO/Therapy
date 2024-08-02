// utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isSameDay } from "date-fns";
import { Event } from "@/types/index";
import chroma from "chroma-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEventsForDayAndTime = (
  events: Event[],
  day: Date,
  time: string
): Event[] =>
  events.filter(
    (event) =>
      isSameDay(event.start, day) &&
      event.start.getHours() === parseInt(time.split(":")[0])
  );

const getRandomColor = (): string => {
  return chroma.random().hex();
};

const getContrastColor = (bgColor: string): string => {
  return chroma.contrast(bgColor, "white") > 4.5 ? "white" : "black";
};

export const getStylesForTimeSlot = (): {
  bgColor: string;
  textColor: string;
} => {
  const bgColor = getRandomColor();
  const textColor = getContrastColor(bgColor);
  return { bgColor, textColor };
};
