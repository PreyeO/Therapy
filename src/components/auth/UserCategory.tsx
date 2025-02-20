// UserCategory.tsx
import { FC } from "react";
import { User, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { RegisterDataType, handleNextProps } from "@/types/formSchema";
import { useToast } from "../ui/use-toast";
import { useUserState } from "@/store";
import { useNavigate } from "react-router-dom";

// Define registration categories with icons
const registrationCategories: {
  key: RegisterDataType["userType"];
  title: string;
  desc: string;
  icon: JSX.Element;
}[] = [
  {
    key: "is_client",
    title: "Client",
    desc: "Get started as a user",
    icon: <User className="" size={30} color="#6D7C43" />,
  },
  {
    key: "is_clinician",
    title: "Clinician",
    desc: "Get started as a user",
    icon: <Mail size={30} className="" color="#6D7C43" />,
  },
];

interface CategoryProps extends handleNextProps {
  handleType: (type: RegisterDataType["userType"]) => void;
  type: RegisterDataType["userType"] | undefined;
}

export const UserCategory: FC<CategoryProps> = ({
  handleNext,
  handleType,
  type,
}) => {
  const { toast } = useToast();
  const setUserType = useUserState((state) => state.setUserType);
  const navigate = useNavigate();

  return (
    <div className="max-w-[821px] flex flex-col justify-center mx-auto min-h-screen">
      <Card className="rounded-lg md:p-5 flex flex-col justify-center gap-10 mx-[3%] lg:mx-0 md:shadow-md">
        <CardHeader>
          <CardTitle className="font-medium md:text-3xl text-primary_black_text text-xl">
            Get Started As?
          </CardTitle>
          <CardDescription className=" text-base md:text-lg font-normal text-[#BDBDBD]">
            Select the specification that suits you
          </CardDescription>
        </CardHeader>
        <div className="flex justify-center gap-[21px] flex-wrap">
          {registrationCategories.map((category, index) => (
            <Card
              key={index}
              className={`h-[100px] cursor-pointer min-w-[44%] rounded-[20px] bg-[#FBFBFB] border flex flex-col ${
                category.key === type
                  ? "border-army_green shadow-md shadow-army_green"
                  : ""
              }`}
              onClick={() => {
                setUserType(category.key as RegisterDataType["userType"]);
                handleType(category.key as RegisterDataType["userType"]);
              }}
            >
              <CardContent className="flex h-full items-center gap-4 py-6">
                <div className="w-[56px] h-[56px] bg-[#6D7C431A] rounded-full flex flex-col justify-center  items-center">
                  {category.icon}
                </div>
                <div className="flex flex-col">
                  <h1 className=" font-bold text-base ">{category.title}</h1>
                  <p className="text-base font-normal text-placeholder_text">
                    {category.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          onClick={() => {
            if (!type) {
              toast({
                description: "Please select a category to continue",
                variant: "destructive",
              });
              return;
            }
            handleNext("", "", "");
            navigate("/signup");
          }}
          className="h-[71px] w-full bg-army_green text-white text-xl font-medium rounded-full my-5"
        >
          Continue
        </Button>
      </Card>
    </div>
  );
};
