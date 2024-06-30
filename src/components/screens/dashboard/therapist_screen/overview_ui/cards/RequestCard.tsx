import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requestsData } from "@/constants/DataManager";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RequestCard = () => {
  return (
    <Card className="h-auto  bg-white rounded-lg py-5">
      <CardHeader className="flex justify-between">
        <CardTitle className="flex justify-between items-center font-bold text-[15.21px] lg:text-lg">
          Appointment Request
          <Button
            variant="link"
            className="text-[#8BA05F] lg: text-[11.83px] text-sm  font-medium"
          >
            view all
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" flex flex-col gap-5">
          {requestsData.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex gap-6 justify-center items-center">
                <Avatar className="lg:w-[52px] lg:h-[52px] w-[43.9px] h-[43.9px]]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>avatar</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="text-[12.68] lg:text-[15px] font-bold text-primary_black_text">
                    {item.name}
                  </h2>
                  <p className="font-normal lg:text-[12px] text-[10.14] text-[#A8A8A8]">
                    {item.time}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-center items-center">
                <div>{item.acceptIcon}</div>
                <div>{item.rejectIcon}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
