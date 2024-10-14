import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Title from "@/components/ui/Titles/Title";
import { CalendarClock } from "lucide-react";
import Schedule from "../../booking_ui/Schedule";
import BookingReview from "../../booking_ui/BookingReview";
import { useDialogState } from "@/store";
import DialogCard from "../../../components/DialogCard";
import { useNavigate } from "react-router-dom";
import { useAppointmentsStore } from "@/store/useAppointment";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { BookingData, BusinessPeriod } from "@/types/formSchema";
import LoadingOverlay from "@/components/ui/loader_effects/LoadingOverlay";

const ProfileInfo = () => {
  const { selectedClinician, loading } = useAppointmentsStore();
  const { fetchBusinessPeriodsByClinicianId, fetchedBusinessPeriods } =
    useBusinessPeriodsStore(); // Use new setFetchedBusinessPeriods function
  const { showReview, openSchedule, openReview, openSuccess } =
    useDialogState();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [businessPeriods, setBusinessPeriods] = useState<BusinessPeriod[]>([]);

  useEffect(() => {
    console.log("Selected Clinician:", selectedClinician);
  }, [selectedClinician]);

  const handleFetchBusinessPeriods = async () => {
    if (selectedClinician?.clinician_profile?.id) {
      await fetchBusinessPeriodsByClinicianId(
        selectedClinician.clinician_profile.id
      );
      setBusinessPeriods(fetchedBusinessPeriods); // Set local state after fetching

      openSchedule(); // Open the schedule dialog after fetching periods
    }
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

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!selectedClinician) {
    return <p>No clinician selected. Please select a clinician.</p>;
  }

  return (
    <Card className="w-full flex justify-between px-[3%] rounded-lg py-9 pb-12">
      <div className="w-full flex flex-col gap-2">
        <Avatar className="w-[152px] h-[152px] rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" alt="Clinician" />
          <AvatarFallback>Clinician</AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl font-bold">
          {`${selectedClinician.first_name} ${selectedClinician.last_name}`}
        </CardTitle>

        <Button
          className="flex gap-3 rounded-full w-full h-[50px] mx-auto text-[12px] font-medium mt-4"
          onClick={handleFetchBusinessPeriods}
        >
          <CalendarClock size={18} />
          Book Appointment
        </Button>
      </div>

      <div className="border mx-8"></div>
      <div className="flex flex-col gap-4">
        <Title title="Clinician Info" className="text-xl font-bold" />
        <div className="flex flex-col gap-3 text-lg font-medium">
          <div>
            <p>
              First Name:{" "}
              <span className="font-normal text-[#041827B2] pl-4">
                {selectedClinician.first_name}
              </span>
            </p>
          </div>
          <div>
            <p>
              Last Name:{" "}
              <span className="font-normal text-[#041827B2] pl-4">
                {selectedClinician.last_name}
              </span>
            </p>
          </div>
        </div>
        <div>
          {/* <p>
            Email Address:
            <span className="font-normal text-[#041827B2] pl-4">
              {selectedClinician.email}
            </span>
          </p> */}
        </div>
        <div className="flex flex-col gap-4 w-[570px] pt-6">
          <Title title="BIO" className="text-xl font-bold" />
          <p className="text-lg font-normal leading-9 text-primary_black_text opacity-[0.7]">
            {selectedClinician.clinician_profile?.bio || "No bio available"}
          </p>
        </div>
      </div>

      <DialogCard
        buttonLabel="View Appointment"
        className={showReview ? "w-[649px]" : "max-w-6xl scale-90"}
        buttonAction={handleViewAppointment}
      >
        {showReview && bookingData ? (
          <BookingReview bookingData={bookingData} onBookNow={handleBookNow} />
        ) : (
          <Schedule
            onContinue={handleContinue}
            businessPeriods={businessPeriods} // Pass the business periods here
          />
        )}
      </DialogCard>
    </Card>
  );
};

export default ProfileInfo;
