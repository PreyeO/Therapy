import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Contact from "./cards/Contact";
import SupportIcon from "@/assets/icon/support.svg";
import EmailIcon from "@/assets/icon/email.svg";
import Title from "@/components/ui/Titles/Title";
import Faq from "./cards/Faq";

const SupportScreen = () => {
  return (
    <div className="mt-[37px] mb-10">
      <div className="flyer h-[292px] text-white flex flex-col justify-center items-center">
        <div className="max-w-[705px]">
          <h2 className="text-[40px] font-bold ">Welcome, How Can We Help?</h2>
          <p className="font-normal text-base leading-[19.84px] pt-[7px]">
            Browse FAQs, Live Chat or Email Us.
          </p>
          <div className="backdrop-blur-lg border-3px shadow-md p-2 mt-4 border-army_green bg-transparent rounded-lg  flex items-center px-6 ">
            <Search
              strokeWidth={2}
              color="white"
              size={20}
              className="cursor-pointer"
            />
            <Input
              placeholder="Type your question or keyword..."
              className="focus:ring-transparent border-none bg-transparent text-white placeholder-white w-[250px] text-base font-normal "
            />
          </div>
        </div>
      </div>
      <div className="flex gap-[26.63px] mt-[50px]">
        <Contact
          icon={
            <img
              src={SupportIcon}
              alt="support icon"
              width={31.95}
              height={31.95}
            />
          }
          title="Contact Live Chat"
        />
        <Contact
          icon={
            <img
              src={EmailIcon}
              alt="support icon"
              width={31.95}
              height={31.95}
            />
          }
          title="Send us an Email"
        />
      </div>
      <div className="pt-[53px]">
        <Title
          title="Frequently Asked Questions (FAQs)"
          className="text-3xl font-medium"
        />
      </div>
      <div className="max-w-full bg-white mt-[46px] px-[95px]">
        <Faq />
      </div>
    </div>
  );
};

export default SupportScreen;
