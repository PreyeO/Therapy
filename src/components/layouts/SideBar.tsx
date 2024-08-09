import { sidebarLinks, sidebarLinksTwo } from "@/constants/Navigation";
import FullLogo from "../ui/logos/FullLogo";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React from "react";

const SideBar = () => {
  const location = useLocation();

  return (
    <aside className="w-[18%] bg-white h-screen fixed left-0 top-0 z-10">
      <div className="flex flex-col justify-center items-center mt-9">
        <FullLogo width={116} height={92} />
      </div>
      <nav className="flex flex-col gap-[60px] pt-9 pl-5">
        <div className="flex flex-col gap-9 pt-8">
          {sidebarLinks.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div>
                {React.cloneElement(item.icon, {
                  color:
                    location.pathname === item.href ? "#6D7C43" : "#868686",
                })}
              </div>
              <ul>
                <li
                  className={`text-xl ${
                    location.pathname === item.href
                      ? "text-[#6D7C43] font-bold"
                      : "text-inactive_text"
                  }`}
                >
                  <Link to={item.href}>{item.label}</Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-7">
          {sidebarLinksTwo.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div>
                {React.cloneElement(item.icon, {
                  color:
                    location.pathname === item.href ? "#6D7C43" : "#868686",
                })}
              </div>
              <ul>
                <li
                  className={`text-xl ${
                    location.pathname === item.href
                      ? "text-[#6D7C43] font-bold"
                      : "text-inactive_text"
                  }`}
                >
                  <Link to={item.href}>{item.label}</Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Avatar className="lg:w-[52px] lg:h-[52px] w-[44px] h-[44px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>avatar</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-base font-bold"> Dr. Preye</h2>
            <h2 className="text-[12px] text-[#BDBDBD] font-normal">
              speak2preye@co.uk
            </h2>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
