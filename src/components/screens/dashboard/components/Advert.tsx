import WandIcon from "@/assets/icon/Wand";
import { useEffect, useState } from "react";
import { getUserData } from "@/services/api/authentication/auth";

const Advert = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      const { first_name } = userData.user;
      setName(`${first_name}`);
    }
  }, []);
  return (
    <div className="flex lg:gap-3 gap-1 pl-3">
      <WandIcon width={24} height={24} className="hidden lg:block" />
      <WandIcon width={18} height={18} className="block lg:hidden" />
      <p className="md:text-[17px] text-army_green font-normal text-[12px] ">
        Hello! {name} you can now setup your account
      </p>
    </div>
  );
};

export default Advert;
