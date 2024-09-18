import { Bell, Search, Settings } from "lucide-react";

import FullLogo from "../ui/logos/FullLogo";
import NavBar from "./NavBar";
import SearchInput from "../ui/search";

const Header = () => {
  return (
    <header>
      {/* w-[446px] h-[72px] bg-white justify-center items-center px-6 hidden lg:flex rounded-xl */}
      <div className="flex justify-between">
        <div className="w-[446px] h-[72px] bg-white  px-6 hidden lg:flex rounded-xl ">
          <SearchInput
            className="text-base text-[#BDBDBD] border-none focus:ring-transparents focus:ring-transparent "
            placeholder="search for a client"
          />
        </div>
        <div className="lg:hidden block">
          <FullLogo width={58} height={46} />
        </div>
        <div className="flex gap-3 ">
          <div className="w-[72px] h-[72px]  bg-white rounded-[10px] justify-center items-center flex-col hidden lg:flex">
            <Settings size={24} strokeWidth={2} className=" cursor-pointer" />
          </div>
          <div className="w-[47.08px] h-[47.08px]  bg-white rounded-[10px] justify-center items-center flex flex-col lg:hidden ">
            <Search size={18} strokeWidth={2} className=" cursor-pointer" />
          </div>
          <div className="lg:w-[72px] lg:h-[72px] w-[47.08px] h-[47.08px] hidden   bg-white rounded-[10px] justify-center items-center lg:flex flex-col">
            <Bell size={24} strokeWidth={2} className=" cursor-pointer" />
          </div>
          <div className="lg:w-[72px] lg:h-[72px] w-[47.08px] h-[47.08px]   bg-white rounded-[10px] justify-center items-center flex flex-col lg:hidden">
            <Bell size={18} strokeWidth={2} className=" cursor-pointer" />
          </div>
          <div className="lg:w-[72px] lg:h-[72px] w-[47.08px] h-[47.08px]   bg-white rounded-[10px] justify-center items-center flex-col lg:hidden flex">
            <NavBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
