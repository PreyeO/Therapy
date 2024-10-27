import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { CalendarClock, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppointmentsStore } from "@/store/useAppointment";

import DialogCard from "../../../components/DialogCard";
import Schedule from "../../booking_ui/Schedule";
import BookingReview from "../../booking_ui/BookingReview";

// Import the BookingData interface
import { BookingData, BusinessPeriod } from "@/types/formSchema"; // Adjust the path as needed
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import ButtonLoader from "@/components/ui/loader_effects/ButtonLoader";
import { useDialogState } from "@/store";

const ClinicianCards = () => {
  const {
    clinicians,
    fetchClinicianList,
    fetchIndividualClinician,
    setSelectedClinician,
  } = useAppointmentsStore();

  const { showReview, openSchedule, openReview, openSuccess } =
    useDialogState();
  const navigate = useNavigate();
  const { fetchBusinessPeriodsByClinicianId, fetchedBusinessPeriods } =
    useBusinessPeriodsStore();

  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [businessPeriods, setBusinessPeriods] = useState<BusinessPeriod[]>([]);
  const [loadingClinician, setLoadingClinician] = useState<string | null>(null);
  const [isBusinessPeriodsLoading, setBusinessPeriodsLoading] = useState(false); // Track loading of business periods

  useEffect(() => {
    fetchClinicianList();
  }, [fetchClinicianList]);

  const handleViewClinician = async (clinicianId: string) => {
    await fetchIndividualClinician(clinicianId);
    navigate(`/client_dashboard/clinician_profile`);
  };

  const handleContinue = (data: BookingData) => {
    setBookingData(data);
    openReview();
  };

  const handleBookNow = () => {
    openSuccess({
      title: "You have successfully booked your appointment",
      subtitle: "You can now proceed to view your appointment.",
    });
  };

  const handleViewAppointment = () => {
    navigate("/client_dashboard/client_appointment");
  };

  const handleBookAppointment = async (clinicianId: string, clinician) => {
    setLoadingClinician(clinicianId); // Set loading for the specific clinician
    setSelectedClinician(clinician);

    if (clinician?.clinician_profile?.id) {
      setBusinessPeriodsLoading(true); // Set loading state for business periods
      await fetchBusinessPeriodsByClinicianId(clinician.clinician_profile.id);
      setBusinessPeriods(fetchedBusinessPeriods); // Set fetched business periods to local state
      setBusinessPeriodsLoading(false); // Reset loading after the data is fetched
    }

    setLoadingClinician(null); // Reset loading after the data is fetched
    openSchedule(); // Open the schedule dialog once business periods are available
  };

  return (
    <div className="grid grid-cols-4 gap-6 pt-[60px] h-[196px]">
      {clinicians.slice(0, 12).map((clinician, index) => (
        <Card className="w-full rounded-xl pt-6" key={index}>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-[76px] h-[76px] rounded-md">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={`${clinician.first_name} ${clinician.last_name}`}
                />
                <AvatarFallback>Clinician</AvatarFallback>
              </Avatar>

              <div className="flex flex-col justify-between min-w-0 max-w-[250px]">
                <CardTitle className="font-bold text-lg break-words whitespace-normal">
                  {`${clinician.first_name} ${clinician.last_name}`}
                </CardTitle>
              </div>
            </div>

            <div className="mt-7 flex-shrink-0">
              <div className="border w-full"></div>
            </div>

            <CardFooter className="flex flex-col pt-5">
              <div className="flex gap-3 pt-5">
                {clinician?.clinician_profile?.id && (
                  <ButtonLoader
                    loading={
                      loadingClinician === clinician.clinician_profile?.id
                    }
                    className="flex gap-3 rounded-full w-[190px] text-[12px] font-medium flex-shrink-0"
                    onClick={() => {
                      const clinicianId = clinician.clinician_profile?.id;
                      if (clinicianId) {
                        handleBookAppointment(clinicianId, clinician);
                      }
                    }}
                    disabled={
                      loadingClinician === clinician.clinician_profile?.id
                    }
                  >
                    Book Appointment
                    <CalendarClock size={18} />
                  </ButtonLoader>
                )}

                <div
                  className="rounded-full w-[38px] h-[38px] border-2 border-army_green flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    clinician?.clinician_profile?.id &&
                    handleViewClinician(clinician.clinician_profile.id)
                  }
                >
                  <Eye color="#6D7C43" />
                </div>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      ))}

      <DialogCard
        buttonLabel="View Appointment"
        className={showReview ? "w-[649px]" : "max-w-6xl scale-90"}
        buttonAction={handleViewAppointment}
      >
        {showReview && bookingData ? (
          <BookingReview bookingData={bookingData} onBookNow={handleBookNow} />
        ) : (
          // Only show the schedule when business periods are fully loaded
          <Schedule
            onContinue={handleContinue}
            businessPeriods={businessPeriods}
            loading={isBusinessPeriodsLoading} // Pass loading state to the Schedule component
          />
        )}
      </DialogCard>
    </div>
  );
};

export default ClinicianCards;
