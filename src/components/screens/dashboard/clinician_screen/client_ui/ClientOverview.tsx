import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClientOverview = () => {
  return (
    <div className="flex gap-5 flex-wrap my-7">
      <Card className="rounded-lg bg-white w-full lg:w-[40%]">
        <CardContent className="flex items-center gap-[25px] w-[385px]">
          <CardHeader className="">
            <Avatar className="lg:w-[150px] lg:h-[150px] w-[117px] h-[117px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle className="text-[21.15px] lg:text-3xl font-bold text-primary_black_text">
              Burna Boy
            </CardTitle>
            <div className="w-[260px]">
              <div className="flex  gap-4 lg:text-lg text-[12.69px] font-normal text-[#5C5C5C]">
                <div className="flex flex-col gap-4">
                  <h3>Gender</h3>
                  <h3>Age</h3>
                </div>
                <div className="flex flex-col gap-4">
                  <h3>Man</h3>
                  <h3>34</h3>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="flex justify-between flex-nowrap p-3 rounded-lg mt-10 lg:text-sm text-[9.87px] font-medium text-[#5C5C5C]  bg-[#FAFAFB]  mx-4">
          <h3>Last visited</h3>
          <h3>06/06/2024, Thursday, 10:00am</h3>
        </div>
      </Card>

      <Card className="rounded-lg w-full lg:w-[58%]  my-4 lg:my-0 bg-white">
        <CardHeader>
          <CardTitle className="lg:text-2xl text-base font-medium text-primary_black_text">
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-8  lg:text-[17px] text-[13.22px] font-normal ">
          <div className="flex lg:gap-[114px] gap-7">
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
          </div>
          <div className="flex gap-10 lg:gap-[80px]">
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Phone number</h4>
              <h4 className="text-[#041827] ">233-566-061</h4>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[#041827B2]">Email</h4>
              <h4 className="text-[#041827] ">burna@gmail.com</h4>
            </div>
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
  );
};

export default ClientOverview;
