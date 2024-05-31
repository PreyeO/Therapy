import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Success = () => {
  return (
    <div className="w-[500px] flex flex-col mx-auto">
      <Card className=" h-[395.23px]  rounded-lg flex flex-col justify-center gap-[40px]">
        <CardHeader className="flex flex-col justify-center items-center">
          <Check className="text-[50px] text-white bg-army_green rounded-full h-[100px] w-[100px] p-3 " />
          <CardTitle className="pt-8 text-[25.03px] font-bold text-primary_black_text">
            Account Verification Successful
          </CardTitle>
          <CardDescription className=" font-normal text-[16.93px] text-placeholder_text">
            You can now procced to your dashboard
          </CardDescription>
        </CardHeader>

        <Link to={"/signin"}>
          <Button className="h-[71px] w-full bg-army_green text-white text-xl font-medium rounded-full">
            Login
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default Success;
