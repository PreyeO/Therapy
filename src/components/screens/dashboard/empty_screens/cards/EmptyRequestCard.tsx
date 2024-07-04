import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

const EmptyRequestCard = () => {
  return (
    <Card className=" h-[500px] bg-white rounded-lg py-5">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between  font-bold text-[15.21px] lg:text-lg items-center">
          <CardTitle className="flex justify-between items-center font-bold text-[15.21px] lg:text-lg">
            Appointment Request
          </CardTitle>
          <Button
            variant="link"
            className="text-[#8BA05F] lg: text-[11.83px] text-sm  font-medium"
          >
            view all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center h-full">
        <CalendarClock size={58} color="#CECECE" />
        <CardDescription className="text-xl font-normal">
          No appointment
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default EmptyRequestCard;
