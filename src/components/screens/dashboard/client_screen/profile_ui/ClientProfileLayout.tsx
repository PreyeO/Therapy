import { Outlet } from "react-router-dom";
import MiniSidebar from "../../../../layouts/MiniSidebar";
import { clientMiniSidebarLinks } from "@/constants/Navigation";

const ClientProfileLayout = () => {
  return (
    <div className=" bg-white  max-w-[100%] mt-7 rounded-[20px] flex py-3">
      <div className="hidden lg:flex w-[35%] border-r-2 px-5">
        <MiniSidebar links={clientMiniSidebarLinks} />
      </div>
      <main className=" w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientProfileLayout;
