import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Title from "@/components/ui/Titles/Title";
import { CalendarClock } from "lucide-react";

const ProfileInfo = () => {
  return (
    <Card className="w-full flex justify-between px-[2%] rounded-lg py-9 pb-12">
      <div className="w-full flex flex-col gap-2">
        <Avatar className="w-[152px] h-[152px] rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>Clinician</AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl font-bold">Dr. Preye</CardTitle>
        <p className="text-base font-normal text-[#041827B2]">Phsychologist</p>

        <Button className="flex gap-3 rounded-full w-full h-[50px] mx-auto text-[12px] font-medium mt-4">
          <CalendarClock size={18} />
          Book Appointment
        </Button>
      </div>

      <div className="border mx-8"></div>
      <div className="flex flex-col gap-4">
        <Title title="Clinician info" className="text-xl font-bold  " />
        <div className="flex gap-6 text-lg font-medium">
          <div className="flex flex-col gap-2">
            <p>Legal first name</p>
            <h3 className="font-normal text-[#041827B2]">Preye</h3>
          </div>
          <div className="flex flex-col gap-2">
            <p>Legal last name</p>
            <h3 className="font-normal text-[#041827B2]">Omusuku</h3>
          </div>
          <div className="flex flex-col gap-2">
            <p>Email</p>
            <h3 className="font-normal text-[#041827B2]">p@gmail.com</h3>
          </div>
        </div>
        <div className="flex  flex-col gap-4 w-[570px] pt-6">
          <Title title="BIO" className="text-xl font-bold  " />
          <p className="text-lg font-normal leading-9 text-primary_black_text opacity-[0.7]">
            Lorem ipsum dolor sit amet consectetur. Leo est dignissim curabitur
            nisl. Vel vitae commodo aliquam elementum molestie urna convallis
            egestas. Libero quisque iaculis volutpat viverra feugiat aliquet.
            Ornare aliquet vitae nec nibh odio lorem.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileInfo;
