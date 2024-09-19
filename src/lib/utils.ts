import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import chroma from "chroma-js";
import { isSameDay, getHours } from "date-fns";
import { Event, AppointmentInfo } from "@/types/formSchema";

// Utility for class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Filter events for a specific day and time
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

// Generate a contrast color for readable text
const getContrastColor = (bgColor: string): string => {
  return chroma.contrast(bgColor, "white") > 4.5 ? "white" : "black";
};

// Generate styles for a time slot
export const getStylesForTimeSlot = (): {
  bgColor: string;
  textColor: string;
} => {
  const bgColor = getRandomColor();
  const textColor = getContrastColor(bgColor);
  return { bgColor, textColor };
};

// Format time range from start to end
export const formatTimeRange = (start: string, end: string) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const formattedStartTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // 24-hour format
  }).format(startTime);
  const formattedEndTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // 24-hour format
  }).format(endTime);
  return `${formattedStartTime} - ${formattedEndTime}`;
};

// Format date to MM-DD-YY
export const formatDate = (date: string) => {
  const formattedDate = new Date(date);
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const year = String(formattedDate.getFullYear()).slice(2);
  return `${month}-${day}-${year}`;
};

// Map AppointmentRequest[] to AppointmentTable format
export const mapToAppointmentTableFormat = (requests: AppointmentInfo[]) => {
  return requests.map((request) => ({
    id: request.id,
    client: `${request.client.first_name} ${request.client.last_name}`,
    appointmentTime: formatTimeRange(request.start_time, request.end_time),
    appointmentDate: formatDate(request.start_time),
    location: request.service.name,
  }));
};
