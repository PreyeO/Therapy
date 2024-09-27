import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface BookingReviewProps {
  onBookNow: () => void; // Accepts a callback function as a prop to handle booking
}

const BookingReview: React.FC<BookingReviewProps> = ({ onBookNow }) => {
  return (
    <Card className="">
      <CardContent className="flex flex-col gap-7 ">
        <CardTitle className="text-[22px] font-bold ">
          Booking Summary
        </CardTitle>
        <div className="flex gap-3 text-lg font-normal">
          <p className="font-medium">Appointment Date:</p>
          <p>September 24th, 2024</p>
        </div>
        <div className="flex gap-3">
          <p className="font-medium">Appointment Time:</p>
          <p>10:00AM</p>
        </div>
        <div className="flex gap-3">
          <p className="font-medium">Location:</p>
          <p>7521 Morgan rd Suite 1 Liverpool, NY 13090</p>
        </div>
        <div className="flex gap-3">
          <p className="font-medium">Service:</p>
          <p>Psychotherapy</p>
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">Duration:</p>
          <p>58 mins</p>
        </div>
        <div className="flex gap-3">
          <p className="font-medium">Rate:</p>
          <p>$132</p>
        </div>

        <Button onClick={onBookNow} className="rounded-full w-full h-14">
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingReview;
