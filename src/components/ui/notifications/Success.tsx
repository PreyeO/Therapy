import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface MyComponentProps {
  title: string;
  subtitle: string;
}

const Success: FC<MyComponentProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col mx-auto min-h-screen justify-center">
      <div className="w-[600px]  mx-auto h-[600px] rounded-lg flex flex-col justify-center ">
        <Card className="flex flex-col justify-center gap-[40px] mx-auto h-[395.22px] max-w-[449px] bg-transparent">
          <CardHeader className="flex flex-col justify-center items-center">
            <Check className="text-[50px] text-white bg-army_green rounded-full h-[100px] w-[100px] p-3 " />
            <CardTitle className="pt-8 text-[25.03px] font-bold text-primary_black_text">
              {title}
            </CardTitle>
            <CardDescription className=" font-normal text-[16.93px] text-placeholder_text">
              {subtitle}
            </CardDescription>
          </CardHeader>

          <Link to={"/signin"}>
            <Button className="h-[71px] w-full bg-army_green text-white text-xl font-medium rounded-full">
              Login
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Success;
