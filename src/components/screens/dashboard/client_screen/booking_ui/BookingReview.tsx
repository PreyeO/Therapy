import { Card, CardContent, CardTitle } from "@/components/ui/card";

const BookingReview = () => {
  return (
    <Card>
      <CardTitle>Booking Summary</CardTitle>

      <CardContent className="flex flex-col gap-5">
        <div className="flex gap-3">
          <p>Appointment Date:</p>
          <p>September 24th, 2024</p>
        </div>
        <div className="flex gap-3">
          <p>Appointment Time:</p>
          <p>10:00AM</p>
        </div>
        <div className="flex gap-3">
          <p>Location:</p>
          <p>7521 Morgan rd Suite 1 Liverpool, NY 13090</p>
        </div>
        <div className="flex gap-3">
          <p>Service:</p>
          <p>psychotherapy</p>
        </div>
        <div className="flex gap-3">
          <p>Duration:</p>
          <p>58mins</p>
        </div>
        <div className="flex gap-3">
          <p>Rate:</p>
          <p>$132</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingReview;
