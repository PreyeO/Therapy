import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { clinicianData } from "@/constants/DataManager";
import { CalendarClock, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";

import Schedule from "../../booking_ui/Schedule";
import BookingReview from "../../booking_ui/BookingReview";
import { Link } from "react-router-dom";

const ClinicianCards = () => {
  const [open, setOpen] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const handleContinue = () => {
    setShowReview(true);
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
                  style={{ maxWidth: "200px" }} // This restricts the name to 200px width
                >
                  {item.fullname}
                </CardTitle>
                <p className="text-[#041827B2] text-[14px] pt-2">
                  {item.service}
                </p>
              </div>
            </div>

            {/* Border and Button Section */}
            <div className="mt-7 flex-shrink-0">
              <div className="border w-full"></div>
            </div>

            <CardFooter className="flex flex-col pt-5">
              <div className="flex gap-3 pt-5">
                <Button
                  className="flex gap-3 rounded-full w-[190px] text-[12px] font-medium flex-shrink-0"
                  onClick={() => {
                    setOpen(true);
                    setShowReview(false);
                  }}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-black bg-opacity-50 fixed inset-0 z-50" />
          <DialogContent
            className="w-full max-w-6xl bg-white rounded-lg shadow-lg mx-auto overflow-auto"
            style={{ maxHeight: "90vh" }}
          >
            {showReview ? (
              <BookingReview />
            ) : (
              <Schedule onContinue={handleContinue} />
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default ClinicianCards;
