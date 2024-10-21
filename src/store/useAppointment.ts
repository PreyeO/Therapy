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
  getAllClients,
} from "@/services/api/clinicians/appointment";

import {
  AppointmentInfo,
  BusinessPeriod,
  Client,
  Clinician,
  Event,
} from "@/types/formSchema";
import { mapAppointmentResponse } from "@/lib/utils";
import { getAppointmentHistory } from "@/services/api/joint";

interface AppointmentsState {
  appointments: Event[];
  unavailableSlots: { start: Date; end: Date; reason: string }[];
  fullAppointments: AppointmentInfo[];
  appointmentRequests: AppointmentInfo[];
  waitlistedAppointments: AppointmentInfo[];
  upcomingAppointments: AppointmentInfo[];
  clinicians: Clinician[];
  businessPeriods: BusinessPeriod[];
  selectedClinician: Clinician | null;
  clients: Client[];
  removeAppointmentFromState: (appointmentId: string) => void;
  updateAppointmentInState: (updatedAppointment: AppointmentInfo) => void;
  appointmentHistory: AppointmentInfo[];

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
  setSelectedClinician: (clinician: Clinician) => void; // Correct type for the parameter
  setBusinessPeriods: (periods: BusinessPeriod[]) => void;

  fetchAppointments: () => Promise<void>;
  fetchUnavailableSlots: () => Promise<void>;
  fetchAppointmentRequests: () => Promise<void>;
  fetchWaitlistedAppointments: () => Promise<void>;
  fetchUpcomingAppointments: () => Promise<void>;
  fetchFullAppointments: () => Promise<void>;
  fetchClinicianList: () => Promise<void>;
  fetchAppointmentHistory: () => Promise<void>;

  fetchIndividualClinician: (
    clinicianId: string
  ) => Promise<Clinician | undefined>;
  fetchAllClients: () => Promise<void>;

  loading: boolean;
}

export const useAppointmentsStore = create<AppointmentsState>((set, get) => ({
  appointments: [],
  unavailableSlots: [],
  fullAppointments: [],
  appointmentRequests: [],
  waitlistedAppointments: [],
  upcomingAppointments: [],
  clinicians: [],
  selectedClinician: null,
  businessPeriods: [],
  clients: [],
  appointmentHistory: [],

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
  setSelectedClinician: (clinician: Clinician) =>
    set({ selectedClinician: clinician }), // Expect full clinician object
  setBusinessPeriods: (periods) => set({ businessPeriods: periods }),
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
  updateAppointmentInState: (updatedAppointment: AppointmentInfo) => {
    const {
      appointmentRequests,
      upcomingAppointments,
      waitlistedAppointments,
      fullAppointments,
    } = get();

    // Replace the appointment with the updated one in all relevant state arrays
    const updateInList = (appointments: AppointmentInfo[]) =>
      appointments.map((appt) =>
        appt.id === updatedAppointment.id ? updatedAppointment : appt
      );

    set({
      appointmentRequests: updateInList(appointmentRequests),
      upcomingAppointments: updateInList(upcomingAppointments),
      waitlistedAppointments: updateInList(waitlistedAppointments),
      fullAppointments: updateInList(fullAppointments),
    });
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
  removeAppointmentFromState: (appointmentId: string) => {
    const { appointments } = get(); // Get the current appointments state
    const updatedAppointments = appointments.filter(
      (appt) => appt.id !== appointmentId
    );
    set({ appointments: updatedAppointments });
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
  fetchIndividualClinician: async (
    clinicianId: string
  ): Promise<Clinician | undefined> => {
    set({ loading: true });
    try {
      const clinician = await getIndividualClinician(clinicianId);
      set({ selectedClinician: clinician });
      return clinician; // Return the clinician object
    } catch (error) {
      console.error("Failed to fetch individual clinician:", error);
    } finally {
      set({ loading: false });
    }
    return undefined; // Return undefined if fetching fails
  },
  fetchAllClients: async () => {
    set({ loading: true });
    try {
      const clients = await getAllClients(); // Directly fetch all clients without an ID
      set({ clients }); // Set the fetched clients to the state
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      set({ loading: false });
    }
  },
  fetchAppointmentHistory: async () => {
    set({ loading: true });
    try {
      const history = await getAppointmentHistory(); // Assuming this is already implemented
      const parsedHistory = mapAppointmentResponse(history);
      set({ appointmentHistory: parsedHistory });
    } catch (error) {
      console.error("Failed to fetch appointment history:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
