import { Search } from "lucide-react";
import { Input } from "./input";

const SearchInput = () => {
  return (
    <div className="flex  justify-center items-center px-6 rounded-full border ">
      <Search
        strokeWidth={2}
        color="#868686"
        size={24}
        className=" cursor-pointer"
      />
      <Input
        placeholder="search for a patient"
        className="focus:ring focus:ring-transparent text-base text-[#BDBDBD] border-none w-full h-[62px] "
      />
    </div>
  );
};

export default SearchInput;
