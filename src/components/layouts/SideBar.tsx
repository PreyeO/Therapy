import { sidebarLinks, sidebarLinksTwo } from "@/constants/Navigation";
import FullLogo from "../ui/logos/FullLogo";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="w-[18%] bg-white h-screen fixed left-0 top-0 z-10 ">
      <div className="flex flex-col justify-center items-center mt-9">
        <FullLogo width={116} height={92} />
      </div>
      <nav className="flex flex-col gap-[60px] pt-9 pl-5">
        <div className="flex flex-col gap-9  pt-8">
          {sidebarLinks.map((item) => (
            <div className="flex gap-4">
              <div>{item.icon}</div>
              <ul>
                <li className="text-xl text-inactive_text font-normal">
                  <Link to={item.href}>{item.label}</Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-7 ">
          {sidebarLinksTwo.map((item) => (
            <div className="flex gap-4">
              <div>{item.icon}</div>
              <ul>
                <li className="text-xl text-inactive_text font-normal">
                  <Link to={item.href}>{item.label}</Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="">Dr. Christian</div>
      </nav>
    </aside>
  );
};

export default SideBar;
