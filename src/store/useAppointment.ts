import { create } from "zustand";
import {
  getAppointmentRequests,
  getAppointments,
  getUnavailableSlots,
  getUpcomingAppointments,
  getWaitlistedAppointments,
} from "@/services/api/clinicians/appointment"; // Ensure to import getUnavailableSlots
import { AppointmentRequest, Event } from "@/types/formSchema";

interface AppointmentsState {
  appointments: Event[];
  unavailableSlots: { start: Date; end: Date; reason: string }[]; // Store unavailable slots here
  fetchAppointments: () => Promise<void>;
  fetchUnavailableSlots: () => Promise<void>;
  appointmentRequests: AppointmentRequest[];
  waitlistedAppointments: AppointmentRequest[];
  upcomingAppointments: AppointmentRequest[];
  fetchAppointmentRequests: () => Promise<void>;
  fetchWaitlistedAppointments: () => Promise<void>; // Ensure this is defined
  fetchUpcomingAppointments: () => Promise<void>;
  loading: boolean;
}

export const useAppointmentsStore = create<AppointmentsState>((set) => ({
  appointments: [],
  unavailableSlots: [],
  appointmentRequests: [],
  waitlistedAppointments: [],
  upcomingAppointments: [],
  loading: false,
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

  fetchAppointmentRequests: async () => {
    set({ loading: true });
    try {
      const requests = await getAppointmentRequests();
      const parsedRequests: AppointmentRequest[] = requests.map((request) => ({
        id: request.id,
        client: {
          first_name: request.client.first_name,
          last_name: request.client.last_name,
          email: request.client.email,
        },
        service: request.service,
        start_time: request.start_time,
        end_time: request.end_time,
      }));
      set({ appointmentRequests: parsedRequests });
    } catch (error) {
      console.error("Failed to fetch appointment requests:", error);
    } finally {
      set({ loading: false }); // Set loading to false after the fetch
    }
  },
  fetchWaitlistedAppointments: async () => {
    set({ loading: true });
    try {
      const waitlisted = await getWaitlistedAppointments();
      const parsedWaitlisted = waitlisted.map((appointment) => ({
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
      set({ waitlistedAppointments: parsedWaitlisted });
    } catch (error) {
      console.error("Failed to fetch waitlisted appointments:", error);
    } finally {
      set({ loading: false }); // Set loading to false after the fetch
    }
  },

  fetchUpcomingAppointments: async () => {
    set({ loading: true });
    try {
      const upcoming = await getUpcomingAppointments();
      const parsedUpcoming = upcoming.map((appointment) => ({
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
      set({ upcomingAppointments: parsedUpcoming });
    } catch (error) {
      console.error("Failed to fetch upcoming appointments:", error);
    } finally {
      set({ loading: false }); // Set loading to false after the fetch
    }
  },
}));
