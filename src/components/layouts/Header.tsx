import { Bell, Search, Settings } from "lucide-react";
import { Input } from "../ui/input";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between">
        <div className="flex w-[446px] h-[72px] bg-white justify-center items-center px-6">
          <Search
            strokeWidth={2}
            color="#868686"
            size={24}
            className=" cursor-pointer"
          />
          <Input
            placeholder="search for a patient"
            className="focus:ring focus:ring-transparent text-base text-[#BDBDBD] border-none"
          />
        </div>
        <div className="flex gap-3 ">
          <div className="w-[72px] h-[72px]  bg-white rounded-lg justify-center items-center flex flex-col">
            <Settings size={24} strokeWidth={2} className=" cursor-pointer" />
          </div>
          <div className="w-[72px] h-[72px]  bg-white rounded-lg justify-center items-center flex flex-col">
            <Bell size={24} strokeWidth={2} className=" cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
