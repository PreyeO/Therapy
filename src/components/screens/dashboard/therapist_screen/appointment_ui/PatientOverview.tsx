import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PatientOverview = () => {
  return (
    <div className="flex flex-col gap-4 py-10 ">
      <div className="flex gap-4 ">
        <Card className="rounded-lg w-[40%]">
          <CardHeader className="w-[285px] ">
            <Avatar className="w-[150px] h-[150px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <CardTitle className="text-3xl font-bold text-primary_black_text">
              Burna Boy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-[260px] ">
              <div className="flex justify-between text-lg font-normal text-[#5C5C5C]">
                <div className="flex flex-col gap-5">
                  <h3>Gender</h3>
                  <h3>Age</h3>
                  <h3>Language</h3>
                </div>
                <div className="flex flex-col gap-5">
                  <h3>Man</h3>
                  <h3>34</h3>
                  <h3>English</h3>
                </div>
              </div>
            </div>
            <div className="flex justify-between  bg-[#FAFAFB] p-3 rounded-lg mt-10 textsm font-medium text-[#5C5C5C]">
              <h3>Last visited</h3>
              <h3>06/06/2024, Thursday, 10:00am</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg w-[58%] h-fit py-16">
          <CardHeader>
            <CardTitle className="text-2xl font-medium text-primary_black_text">
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-16 text-[17px] font-normal ">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Last Name</h4>
              <h4 className="text-[#041827] ">Damini</h4>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">First Name</h4>
              <h4 className="text-[#041827] ">Burna boy</h4>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Date of birth</h4>
              <h4 className="text-[#041827] ">20/08/1999</h4>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Phone number</h4>
              <h4 className="text-[#041827] ">233-566-061</h4>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Email</h4>
              <h4 className="text-[#041827] ">shoutout2burna@gmail.com</h4>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Address</h4>
              <h4 className="text-[#041827] ">
                83 Miles Drive, Los Angeles, CA{" "}
              </h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="  rounded-lg w-[40%] ">
        <CardHeader>
          {" "}
          <CardTitle className="text-2xl font-medium text-primary_black_text">
            Known Allergies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 text-sm font-medium  text-army_green">
            <div className="bg-[#8BA05F1A] rounded-full px-[40px] py-3 ">
              <h3>Peanut Allergy</h3>
            </div>
            <div className="bg-[#8BA05F1A] rounded-full px-[40px] py-3">
              <h3>Lactose intolerant</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientOverview;
