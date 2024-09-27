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

const ProfileInfo = () => {
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
    <Card className="w-full flex justify-between px-[3%] rounded-lg py-9 pb-12">
      <div className="w-full flex flex-col gap-2">
        <Avatar className="w-[152px] h-[152px] rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>Clinician</AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl font-bold">Dr. Preye</CardTitle>
        <p className="text-base font-normal text-[#041827B2]">Psychologist</p>

        <Button
          className="flex gap-3 rounded-full w-full h-[50px] mx-auto text-[12px] font-medium mt-4"
          onClick={openSchedule}
        >
          <CalendarClock size={18} />
          Book Appointment
        </Button>
      </div>

      <div className="border mx-8"></div>
      <div className="flex flex-col gap-4">
        <Title title="Clinician Info" className="text-xl font-bold" />
        <div className="flex flex-col gap-3 text-lg font-medium">
          <div className="">
            <p>
              First Name:{" "}
              <span className="font-normal text-[#041827B2] pl-4">preye</span>
            </p>
          </div>
          <div className="">
            <p>
              Last Name:{" "}
              <span className="font-normal text-[#041827B2] pl-4">
                preye@gmail.com
              </span>
            </p>
          </div>
        </div>
        <div className="">
          <p>
            Email Address:
            <span className="font-normal text-[#041827B2] pl-4">
              preye@gmail.com
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4 w-[570px] pt-6">
          <Title title="BIO" className="text-xl font-bold" />
          <p className="text-lg font-normal leading-9 text-primary_black_text opacity-[0.7]">
            Lorem ipsum dolor sit amet consectetur. Leo est dignissim curabitur
            nisl. Vel vitae commodo aliquam elementum molestie urna convallis
            egestas. Libero quisque iaculis volutpat viverra feugiat aliquet.
            Ornare aliquet vitae nec nibh odio lorem.
          </p>
        </div>
      </div>

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
    </Card>
  );
};

export default ProfileInfo;
