import { create } from "zustand";
import {
  getAppointments,
  getUnavailableSlots,
} from "@/services/api/therapist/appointment"; // Ensure to import getUnavailableSlots
import { Event } from "@/types/formSchema";

interface AppointmentsState {
  appointments: Event[];
  unavailableSlots: { start: Date; end: Date; reason: string }[]; // Store unavailable slots here
  fetchAppointments: () => Promise<void>;
  fetchUnavailableSlots: () => Promise<void>; // Fetch unavailable slots
}

export const useAppointmentsStore = create<AppointmentsState>((set) => ({
  appointments: [],
  unavailableSlots: [], // Initialize with an empty array
  fetchAppointments: async () => {
    try {
      const appointments = await getAppointments();
      const parsedAppointments = appointments.map((appointment) => ({
        title: appointment.service.name,
        start: new Date(appointment.start_time),
        end: new Date(appointment.end_time),
        client: appointment.client.first_name,
        service: appointment.service,
        serviceDuration: appointment.service.duration,
      }));
      set({ appointments: parsedAppointments });
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  },
  fetchUnavailableSlots: async () => {
    try {
      const unavailableSlots = await getUnavailableSlots();
      const parsedUnavailableSlots = unavailableSlots.map((slot) => ({
        start: new Date(slot.start_time),
        end: new Date(slot.end_time),
        reason: slot.reason,
      }));
      set({ unavailableSlots: parsedUnavailableSlots });
    } catch (error) {
      console.error("Failed to fetch unavailable slots:", error);
    }
  },
}));
