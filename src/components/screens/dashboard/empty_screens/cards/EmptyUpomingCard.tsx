import Title from "@/components/ui/Titles/Title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

const EmptyUpomingCard = () => {
  return (
    <Card className=" max-h-screen bg-white rounded-lg ">
      <CardHeader>
        {" "}
        <div className="flex justify-between">
          <Title
            title="Upcoming Appointments"
            className="text-[#3A5334] font-bold lg:text-lg py-4 px-4 text-[12.63px]"
          />
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

export default EmptyUpomingCard;
