import { Outlet } from "react-router-dom";

import MiniSidebar from "./MiniSidebar";

const ProfileLayout = () => {
  return (
    <div className=" bg-white  max-w-[100%] mt-7 rounded-[20px] flex py-3 px-10">
      <div className="hidden lg:flex w-[35%] border-r-2">
        <MiniSidebar />
      </div>
      <main className=" w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
