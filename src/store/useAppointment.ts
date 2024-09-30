import {
  getCliniciansList,
  getIndividualClinician,
} from "./../services/api/clients/appointments";
import { create } from "zustand";
import {
  getAppointmentRequests,
  getAppointments,
  getFullAppointments,
  getUnavailableSlots,
  getUpcomingAppointments,
  getWaitlistedAppointments,
} from "@/services/api/clinicians/appointment"; // Ensure to import getUnavailableSlots
import { AppointmentInfo, Clinician, Event } from "@/types/formSchema";
import { mapAppointmentResponse } from "@/lib/utils";

interface AppointmentsState {
  appointments: Event[];
  unavailableSlots: { start: Date; end: Date; reason: string }[];
  fullAppointments: AppointmentInfo[];
  appointmentRequests: AppointmentInfo[];
  waitlistedAppointments: AppointmentInfo[];
  upcomingAppointments: AppointmentInfo[];
  clinicians: Clinician[];
  selectedClinician: Clinician | null;

  filteredAppointmentRequests: AppointmentInfo[] | null;
  filteredUpcomingAppointments: AppointmentInfo[] | null;
  filteredWaitlistedAppointments: AppointmentInfo[] | null;
  filteredFullAppointments: AppointmentInfo[] | null;

  setFilteredAppointmentRequests: (
    appointments: AppointmentInfo[] | null
  ) => void;
  setFilteredUpcomingAppointments: (
    appointments: AppointmentInfo[] | null
  ) => void;
  setFilteredWaitlistedAppointments: (
    appointments: AppointmentInfo[] | null
  ) => void;
  setFilteredFullAppointments: (appointments: AppointmentInfo[] | null) => void;

  fetchAppointments: () => Promise<void>;
  fetchUnavailableSlots: () => Promise<void>;
  fetchAppointmentRequests: () => Promise<void>;
  fetchWaitlistedAppointments: () => Promise<void>; // Ensure this is defined
  fetchUpcomingAppointments: () => Promise<void>;
  fetchFullAppointments: () => Promise<void>;
  fetchClinicianList: () => Promise<void>;
  fetchIndividualClinician: (clinicianId: string) => Promise<void>;

  loading: boolean;
}

export const useAppointmentsStore = create<AppointmentsState>((set) => ({
  appointments: [],
  unavailableSlots: [],
  fullAppointments: [],
  appointmentRequests: [],
  waitlistedAppointments: [],
  upcomingAppointments: [],
  clinicians: [],
  selectedClinician: null,

  filteredAppointmentRequests: null,
  filteredUpcomingAppointments: null,
  filteredWaitlistedAppointments: null,
  filteredFullAppointments: null,

  setFilteredAppointmentRequests: (appointments) =>
    set({ filteredAppointmentRequests: appointments }),
  setFilteredUpcomingAppointments: (appointments) =>
    set({ filteredUpcomingAppointments: appointments }),
  setFilteredWaitlistedAppointments: (appointments) =>
    set({ filteredWaitlistedAppointments: appointments }),
  setFilteredFullAppointments: (appointments) =>
    set({ filteredFullAppointments: appointments }),
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
  fetchFullAppointments: async () => {
    set({ loading: true });
    try {
      const full = await getFullAppointments();
      const parsedFull = mapAppointmentResponse(full);
      set({ fullAppointments: parsedFull });
    } catch (error) {
      console.error("Failed to fetch full appointments:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Fetch appointment requests
  fetchAppointmentRequests: async () => {
    set({ loading: true });
    try {
      const requests = await getAppointmentRequests();
      const parsedRequests = mapAppointmentResponse(requests);
      set({ appointmentRequests: parsedRequests });
    } catch (error) {
      console.error("Failed to fetch appointment requests:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Fetch waitlisted appointments
  fetchWaitlistedAppointments: async () => {
    set({ loading: true });
    try {
      const waitlisted = await getWaitlistedAppointments();
      const parsedWaitlisted = mapAppointmentResponse(waitlisted);
      set({ waitlistedAppointments: parsedWaitlisted });
    } catch (error) {
      console.error("Failed to fetch waitlisted appointments:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Fetch upcoming appointments
  fetchUpcomingAppointments: async () => {
    set({ loading: true });
    try {
      const upcoming = await getUpcomingAppointments();
      const parsedUpcoming = mapAppointmentResponse(upcoming);
      set({ upcomingAppointments: parsedUpcoming });
    } catch (error) {
      console.error("Failed to fetch upcoming appointments:", error);
    } finally {
      set({ loading: false });
    }
  },
  // Fetch clinicians and set the state
  fetchClinicianList: async () => {
    set({ loading: true });
    try {
      const clinicians = await getCliniciansList();
      set({ clinicians });
    } catch (error) {
      console.error("Failed to fetch clinicians:", error);
    } finally {
      set({ loading: false });
    }
  },
  fetchIndividualClinician: async (clinicianId: string) => {
    set({ loading: true });
    try {
      const clinician = await getIndividualClinician(clinicianId);
      set({ selectedClinician: clinician }); // Set the fetched clinician in the state
    } catch (error) {
      console.error("Failed to fetch individual clinician:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
