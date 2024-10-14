import { Outlet } from "react-router-dom";
import Header from "./Header";
import ClientSideBar from "./ClientSideBar";

const ClientDashboard = () => {
  return (
    <div className="flex bg-white lg:mx-[1%]">
      <div className="hidden lg:flex">
        <ClientSideBar />
      </div>
      <div className="flex-1 flex flex-col lg:px-[1.5%] px-[2%] lg:my-[1%] bg-[#FAFAFB] rounded-[20px] lg:ml-[20%] max-w-[100%]">
        <div className="mt-10">
          <Header message="Search for a clinician" />
        </div>
        <main className="flex-1 overflow-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
