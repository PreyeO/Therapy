import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex  bg-white mx-[1%]">
      <SideBar />
      <div className="flex-1 flex flex-col px-[1%] my-[1%] bg-[#FAFAFB] rounded-xl">
        <div className="mt-7">
          <Header />
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
