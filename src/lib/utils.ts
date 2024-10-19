import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isSameDay, getHours, getMinutes, isWithinInterval } from "date-fns";
import { Event, AppointmentInfo, AppointmentAddress } from "@/types/formSchema";
import { calendarSheetColors } from "@/constants/DataManager";
import axios from "axios";

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
    service: request.service.name,
    email: request.client.email,
    location: `${request.location.city}${request.location.street_address}${request.location.postal_code}${request.location.id}`,
    clinician: `${request.clinician.first_name} ${request.clinician.last_name}`,
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
    location: {
      id: appointment.location.id,
      street_address: appointment.location.street_address,
      city: appointment.location.city,
      postal: appointment.location.postal_code,
    },
    clinician: {
      id: appointment.clinician.id,
      first_name: appointment.clinician.first_name,
      last_name: appointment.clinician.last_name,
    },
  }));
};

// Utility function to truncate to the first two words of the address
export const truncateToFirstTwoWords = (str: string) => {
  const words = str.split(" ");
  return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : str;
};

// Get styles for a time slot duration based on start and end time
export const getSlotStyle = (start: Date, end: Date) => {
  const startMinutes = getMinutes(start); // Minutes into the hour
  const slotDurationInMinutes = (end.getTime() - start.getTime()) / 1000 / 60; // Slot duration in minutes

  const slotHeightPercentage = (slotDurationInMinutes / 60) * 100; // Height as percentage of 1 hour
  const topOffsetPercentage = (startMinutes / 60) * 100; // Offset as percentage of 1 hour

  return {
    height: `${slotHeightPercentage}%`,
    top: `${topOffsetPercentage}%`,
  };
};

// Check if a slot is blocked based on the list of blocked slots
export const isSlotBlocked = (
  day: Date,
  timeSlot: string,
  blockedSlots: Array<{ start: Date; end: Date }>
): boolean => {
  const [slotHour, slotMinute] = timeSlot.split(":");
  const slotStart = new Date(day);
  slotStart.setHours(Number(slotHour), Number(slotMinute), 0, 0); // Set the hours and minutes from the time slot

  return blockedSlots.some(({ start, end }) =>
    isWithinInterval(slotStart, { start, end })
  );
};

// utils.ts

// Utility function to map business hours from API response
// utils.ts

import { BusinessPeriod } from "@/types/formSchema";

// Utility function to map business hours from API response
export const mapBusinessHours = (businessPeriods: BusinessPeriod[] = []) => {
  if (!Array.isArray(businessPeriods) || businessPeriods.length === 0) {
    // Return an empty object if the input is not a valid array
    return {};
  }

  return businessPeriods.reduce((acc, period) => {
    const day = period.day_of_week.toLowerCase(); // Convert day to lowercase for consistency
    acc[day] = {
      openingHour: parseInt(period.opening_hour.split(":")[0]), // Extract opening hour as an integer
      closingHour: parseInt(period.closing_hour.split(":")[0]), // Extract closing hour as an integer
    };
    return acc;
  }, {} as Record<string, { openingHour: number; closingHour: number }>);
};

/**
 * Utility functions to manage localStorage operations.
 */

/**
 * Get a value from localStorage and parse it as JSON.
 * @param key - The key to retrieve from localStorage.
 * @returns Parsed JSON value or null if not found.
 */
export const getLocalStorage = <T>(key: string): T | null => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

/**
 * Set a value in localStorage as a JSON string.
 * @param key - The key to set in localStorage.
 * @param value - The value to store.
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Remove an item from localStorage.
 * @param key - The key to remove from localStorage.
 */
export const clearLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const formatTime = (time: string): string => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const formattedHours = parseInt(hours, 10) % 12 || 12;
  const period = parseInt(hours, 10) < 12 ? "AM" : "PM";
  return `${formattedHours}:${minutes} ${period}`;
};

export const getAddressTextById = (
  id: string | undefined,
  appointmentAddresses: AppointmentAddress[]
): string => {
  if (!id) return "Location";
  const address = appointmentAddresses.find(
    (address) => String(address.id) === id
  );
  return address
    ? `${address.street_address}, ${address.city}, ${address.state} ${address.postal_code}`
    : "Location";
};

// utils/timeUtils.ts

/**
 * Check if the given start time is within the next 24 hours.
 * @param startTime - The start time of the appointment.
 * @returns {boolean} - Returns true if within 24 hours, otherwise false.
 */
export const isWithinNext24Hours = (startTime: string): boolean => {
  const now = new Date();
  const appointmentTime = new Date(startTime);
  const timeDifferenceInMs = appointmentTime.getTime() - now.getTime();

  // Calculate the time difference in hours and check if it's less than or equal to 24 hours.
  return timeDifferenceInMs <= 24 * 60 * 60 * 1000 && timeDifferenceInMs >= 0;
};

export const getErrorMessage = (error: unknown): string => {
  // Check if the error is an Axios error
  if (axios.isAxiosError(error) && error.response) {
    // Try to extract a message from different fields (common structure in many APIs)
    return (
      error.response.data?.message || // Custom message from the server
      error.response.data?.error || // Sometimes it's under 'error'
      error.response.data?.detail || // Sometimes it's under 'detail'
      "An error occurred. Please try again." // Default message if no specific error message found
    );
  }

  // If it's a generic JS error, return its message
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback message for unknown errors
  return "An unexpected error occurred. Please try again.";
};
