import { Link, useLocation } from "react-router-dom";

import React, { ReactElement } from "react";

interface SidebarLink {
  icon: ReactElement;
  href: string;
  label: string;
  subtitle: string;
}

interface MiniSidebarProps {
  links: SidebarLink[];
}

const MiniSidebar: React.FC<MiniSidebarProps> = ({ links }) => {
  const location = useLocation();

  return (
    <aside className=" bg-white h-screen  z-10">
      <nav className="flex flex-col  pt-9">
        <h2 className="text-lg text-army_green font-bold">Profile</h2>
        <div className="flex flex-col gap-9 pt-8">
          {links.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div>
                {React.cloneElement(item.icon, {
                  color:
                    location.pathname === item.href ? "#6D7C43" : "#868686",
                })}
              </div>
              <div className="flex flex-col ">
                <ul>
                  <li
                    className={`text-base font-normal ${
                      location.pathname === item.href
                        ? "text-[#6D7C43] font-bold"
                        : "text-inactive_text"
                    }`}
                  >
                    <Link to={item.href}>{item.label}</Link>
                  </li>
                </ul>
                <p className=" font-normal text-[12px] text-inactive_text">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default MiniSidebar;
