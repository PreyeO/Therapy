import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { CalendarClock, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppointmentsStore } from "@/store/useAppointment";
import { useDialogState } from "@/store";
import DialogCard from "../../../components/DialogCard";
import Schedule from "../../booking_ui/Schedule";
import BookingReview from "../../booking_ui/BookingReview";
import SmallLoader from "@/components/ui/loader_effects/SmallLoader";

// Import the BookingData interface
import { BookingData, BusinessPeriod } from "@/types/formSchema"; // Adjust the path as needed
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";

const ClinicianCards = () => {
  const {
    clinicians,
    loading,
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

  useEffect(() => {
    fetchClinicianList();
  }, [fetchClinicianList]);

  const handleViewClinician = async (clinicianId: string) => {
    await fetchIndividualClinician(clinicianId);
    navigate(`/client_dashboard/clinician_profile`);
  };

  const handleContinue = (data: BookingData) => {
    setBookingData(data); // Store booking data
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

  const handleBookAppointment = async (clinician) => {
    // Step 1: Set the selected clinician in the global store
    setSelectedClinician(clinician);

    // Step 2: Fetch business periods for the selected clinician
    if (clinician.clinician_profile?.id) {
      await fetchBusinessPeriodsByClinicianId(clinician.clinician_profile.id);
      setBusinessPeriods(fetchedBusinessPeriods); // Set the fetched business periods to local state
    }

    // Step 3: Open the schedule dialog after setting the clinician and fetching periods
    openSchedule();
  };

  if (loading) {
    return (
      <div className="relative w-full h-[300px] flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

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
                {/* <p className="text-[#041827B2] text-[14px] break-words whitespace-normal">
                  {clinician.email}
                </p> */}
              </div>
            </div>

            <div className="mt-7 flex-shrink-0">
              <div className="border w-full"></div>
            </div>

            <CardFooter className="flex flex-col pt-5">
              <div className="flex gap-3 pt-5">
                <Button
                  className="flex gap-3 rounded-full w-[190px] text-[12px] font-medium flex-shrink-0"
                  onClick={() => handleBookAppointment(clinician)}
                >
                  <CalendarClock size={18} />
                  Book Appointment
                </Button>

                <div
                  className="rounded-full w-[38px] h-[38px] border-2 border-army_green flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    handleViewClinician(clinician.clinician_profile?.id || "")
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
        {showReview && bookingData ? ( // Conditionally render BookingReview when bookingData is not null
          <BookingReview bookingData={bookingData} onBookNow={handleBookNow} />
        ) : (
          <Schedule
            onContinue={handleContinue}
            businessPeriods={businessPeriods}
          />
        )}
      </DialogCard>
    </div>
  );
};

export default ClinicianCards;
