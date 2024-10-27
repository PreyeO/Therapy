import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BookingData, BookAppointment } from "@/types/formSchema";
import { bookAppointment } from "@/services/api/clients/appointments";
import { useAppointmentsStore } from "@/store/useAppointment";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { useAuthState } from "@/store";
import { toast, ToastContainer } from "react-toastify";
import { getErrorMessage } from "@/lib/utils";

interface BookingReviewProps {
  bookingData: BookingData | null;
  onBookNow: () => void; // Callback function for booking success
}

const BookingReview: React.FC<BookingReviewProps> = ({
  bookingData,
  onBookNow,
}) => {
  const { selectedClinician } = useAppointmentsStore();
  const { loading, setLoading } = useAuthState();
  const { services, appointmentAddresses } = useBusinessPeriodsStore();

  if (!bookingData)
    return <p className="text-center">No booking data available</p>;

  // Retrieve clinician, service, and location IDs based on bookingData
  const serviceId =
    services.find((service) => service.name === bookingData.service)?.id || "";
  const locationId =
    appointmentAddresses.find(
      (loc) => loc.street_address === bookingData.location
    )?.id || "";

  const handleBookNow = async () => {
    if (!bookingData || !selectedClinician || !serviceId || !locationId) {
      toast.error("Incomplete booking data. Please check the details.");
      return;
    }

    try {
      setLoading(true);

      // Ensure that the clinician ID matches the selected clinician's ID
      const clinicianId = selectedClinician.clinician_profile?.id || "";
      if (!clinicianId) {
        toast.error("Clinician selection is invalid.");
        return;
      }

      // Format the payload for booking
      const formattedStartTime = `${bookingData.date}T${bookingData.time}`;
      const payload: BookAppointment = {
        clinician_profile: clinicianId,
        service: serviceId,
        start_time: formattedStartTime,
        location: locationId,
      };

      // Attempt to book appointment
      await bookAppointment(payload);
      onBookNow(); // Trigger success callback
    } catch (error) {
      // Use the centralized error handler to get the error message
      const errorMessage = getErrorMessage(error);

      // Toast the error message extracted
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="">
      <CardContent className="flex flex-col gap-7 ">
        <CardTitle className="text-[22px] font-bold ">
          Booking Summary
        </CardTitle>

        {/* Display each field of the booking data */}
        <div className="flex gap-3 text-lg font-normal">
          <p className="font-medium">Appointment Date:</p>
          <p>{bookingData.date}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-medium">Appointment Time:</p>
          <p>{bookingData.time}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-medium">Location:</p>
          <p>{bookingData.location || "Not selected"}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-medium">Service:</p>
          <p>{bookingData.service || "Not selected"}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Duration:</p>
          <p>{bookingData.duration || "N/A"}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-medium">Rate:</p>
          <p>{bookingData.rate || "N/A"}</p>
        </div>

        {/* Button to confirm booking */}
        <ButtonLoader
          loading={loading} // Use loading from the store
          text="Book Now"
          className="rounded-full w-full h-14 text-base"
          onClick={handleBookNow} // Set the onClick handler to handleBookNow
        />
      </CardContent>
      <ToastContainer
        toastStyle={{ backgroundColor: "crimson", color: "white" }}
        className="text-white"
      />
    </Card>
  );
};

export default BookingReview;
