import Title from "@/components/ui/Titles/Title";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { FC, ReactNode } from "react";

interface ContactCardProps {
  icon: ReactNode;
  title: string;
}

const Contact: FC<ContactCardProps> = ({ icon, title }) => {
  return (
    <Card className="w-full rounded-lg flex justify-around bg-white h-[142px] max-w-[591.96px] items-center">
      <div className="flex gap-[30.17px] justify-center items-center">
        {icon}
        <Title
          title={title}
          className="text-[28.4px] text-[#32343E] font-normal"
        />
      </div>

      <ChevronLeft />
    </Card>
  );
};

export default Contact;
