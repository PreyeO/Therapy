// import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/Titles/Title";
import ProfileForm from "./ProfileForm";
import { CircleCheck } from "lucide-react";
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";

const ProfileInfo = () => {
  const { profile } = useBusinessPeriodsStore();
  return (
    <div className="pt-9 flex flex-col gap-10 mx-6">
      <Title title="Profile Information" className="text-xl font-medium  " />
      <div className="flex justify-between ">
        <div className="flex gap-4 items-center">
          <Avatar className="w-[102px] h-[102px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Photo Pics</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">{profile?.firstName || ""}</h3>
            <p className="font-normal text-base opacity-[0.7]">
              User ID: HY234K
            </p>
          </div>
        </div>
        <Button className="rounded-full flex gap-2" disabled>
          <CircleCheck />
          Save Changes
        </Button>
      </div>
      <ProfileForm />
    </div>
  );
};

export default ProfileInfo;
