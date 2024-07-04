import { Bell, Search, Settings } from "lucide-react";
import { Input } from "../ui/input";
import FullLogo from "../ui/logos/FullLogo";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between">
        <div className=" w-[446px] h-[72px] bg-white justify-center items-center px-6 hidden lg:flex rounded-xl">
          <Search
            strokeWidth={2}
            color="#868686"
            size={24}
            className=" cursor-pointer"
          />
          <Input
            readOnly
            placeholder="search for a patient"
            className="focus:ring focus:ring-transparent text-base text-[#BDBDBD] border-none"
          />
        </div>
        <div className="lg:hidden block">
          <FullLogo width={58} height={46} />
        </div>
        <div className="flex gap-3 ">
          <div className="w-[72px] h-[72px]  bg-white rounded-lg justify-center items-center flex-col hidden lg:flex">
            <Settings size={24} strokeWidth={2} className=" cursor-pointer" />
          </div>
          <div className="w-[47.08px] h-[47.08px]  bg-white rounded-lg justify-center items-center flex flex-col lg:hidden ">
            <Search size={18} strokeWidth={2} className=" cursor-pointer" />
          </div>
          <div className="lg:w-[72px] lg:h-[72px] w-[47.08px] h-[47.08px] hidden   bg-white rounded-lg justify-center items-center lg:flex flex-col">
            <Bell size={24} strokeWidth={2} className=" cursor-pointer" />
          </div>
          <div className="lg:w-[72px] lg:h-[72px] w-[47.08px] h-[47.08px]   bg-white rounded-lg justify-center items-center flex flex-col lg:hidden">
            <Bell size={18} strokeWidth={2} className=" cursor-pointer" />
          </div>
          <div className="lg:w-[72px] lg:h-[72px] w-[47.08px] h-[47.08px]   bg-white rounded-lg justify-center items-center flex-col lg:hidden flex">
            <NavBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
