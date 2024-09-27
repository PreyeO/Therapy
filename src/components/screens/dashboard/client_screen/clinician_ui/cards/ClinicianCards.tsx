import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { clinicianData } from "@/constants/DataManager";
import { CalendarClock, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import Schedule from "../../booking_ui/Schedule";
import BookingReview from "../../booking_ui/BookingReview";
import { useDialogState } from "@/store";
import DialogCard from "../../../components/DialogCard";

const ClinicianCards = () => {
  const { showReview, openSchedule, openReview, openSuccess } =
    useDialogState();
  const navigate = useNavigate();

  const handleContinue = () => {
    openReview();
  };

  const handleBookNow = () => {
    openSuccess({
      title: "You have successfully booked your appointment",
      subtitle: "You can now proceed to view your appointment.",
    });
  };
  const handleViewAppointment = () => {
    navigate("/client_dashboard/client_appointment"); // Navigate to the appointment page
  };

  return (
    <div className="grid grid-cols-4 gap-6 pt-[60px]">
      {clinicianData.slice(0, 12).map((item, index) => (
        <Card className="w-full rounded-xl pt-6" key={index}>
          <CardContent>
            <div className="flex gap-4 items-center">
              <Avatar className="w-[76px] h-[76px] rounded-md">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>Clinician</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <CardTitle
                  className="pt-3 font-bold text-lg truncate"
                  style={{ maxWidth: "200px" }}
                >
                  {item.fullname}
                </CardTitle>
                <p className="text-[#041827B2] text-[14px] pt-2">
                  {item.service}
                </p>
              </div>
            </div>

            <div className="mt-7 flex-shrink-0">
              <div className="border w-full"></div>
            </div>

            <CardFooter className="flex flex-col pt-5">
              <div className="flex gap-3 pt-5">
                <Button
                  className="flex gap-3 rounded-full w-[190px] text-[12px] font-medium flex-shrink-0"
                  onClick={() => openSchedule()}
                >
                  <CalendarClock size={18} />
                  Book Appointment
                </Button>
                <Link to="/client_dashboard/clinician_profile">
                  <div className="rounded-full w-[38px] h-[38px] border-2 border-army_green flex items-center justify-center">
                    <Eye color="#6D7C43" />
                  </div>
                </Link>
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
        {showReview ? (
          <BookingReview onBookNow={handleBookNow} />
        ) : (
          <Schedule onContinue={handleContinue} />
        )}
      </DialogCard>
    </div>
  );
};

export default ClinicianCards;
