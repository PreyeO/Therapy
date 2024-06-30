import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex bg-white lg:mx-[1%]">
      <div className="hidden lg:flex">
        <SideBar />
      </div>
      <div className="flex-1 flex flex-col lg:px-[1.5%] px-[2%] lg:my-[1%] bg-[#FAFAFB] rounded-xl lg:ml-[18%] max-w-[100%]">
        <div className="mt-7">
          <Header />
        </div>
        <main className="flex-1 overflow-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
