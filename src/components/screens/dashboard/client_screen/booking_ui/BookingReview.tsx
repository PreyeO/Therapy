import React from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BookingData, BookAppointment } from "@/types/formSchema";
import { bookAppointment } from "@/services/api/clients/appointments";
import { useAppointmentsStore } from "@/store/useAppointment";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { useAuthState } from "@/store";

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
  const clinicianId = selectedClinician?.clinician_profile?.id || "";
  const serviceId =
    services.find((service) => service.name === bookingData.service)?.id || "";
  const locationId =
    appointmentAddresses
      .find((loc) => loc.street_address === bookingData.location)
      ?.id.toString() || "";

  const handleBookNow = async () => {
    if (!bookingData || !clinicianId || !serviceId || !locationId) {
      return;
    }

    try {
      setLoading(true);
      // Combine date and time into the required ISO 8601 format (e.g., "2024-09-24T14:00:00")
      const formattedStartTime = `${bookingData.date}T${bookingData.time}`;

      const payload: BookAppointment = {
        clinician_profile: clinicianId, // Use dynamically retrieved clinician ID
        service: serviceId, // Use dynamically retrieved service ID
        start_time: formattedStartTime, // Use combined date and time in ISO 8601 format
        location: locationId, // Use dynamically retrieved location ID
      };

      // Call the bookAppointment API with the formatted payload
      await bookAppointment(payload);

      // Trigger success callback or notification
      onBookNow();
    } catch (error) {
      // Handle error, show notification, etc.
    } finally {
      setLoading(false); // Reset loading state after the operation
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
          className="rounded-full w-full h-14"
          onClick={handleBookNow} // Set the onClick handler to handleBookNow
        />
      </CardContent>
    </Card>
  );
};

export default BookingReview;
