import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { isSameDay, getHours } from "date-fns";
import { Event, AppointmentInfo } from "@/types/formSchema";
import { calendarSheetColors } from "@/constants/DataManager";

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

// Generate styles for a time slot
export const getStylesForTimeSlot = (
  serviceName: string
): {
  bgColor: string;
  textColor: string;
} => {
  // Use the predefined colors for the service name, or fallback to default values
  const { bgColor, textColor } = calendarSheetColors[serviceName] || {
    bgColor: "#FFFFFF", // Default bg color
    textColor: "#000000", // Default text color
  };
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

export const mapAppointmentResponse = (
  appointments: AppointmentInfo[]
): AppointmentInfo[] => {
  return appointments.map((appointment) => ({
    id: appointment.id,
    client: {
      first_name: appointment.client.first_name,
      last_name: appointment.client.last_name,
      email: appointment.client.email,
    },
    service: appointment.service,
    start_time: appointment.start_time,
    end_time: appointment.end_time,
  }));
};

// Utility function to truncate to the first two words of the address
export const truncateToFirstTwoWords = (str: string) => {
  const words = str.split(" ");
  return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : str;
};
