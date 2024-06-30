import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks, sidebarLinksTwo } from "@/constants/Navigation";
import { BarChartHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav>
      <Sheet>
        <SheetTrigger>
          <BarChartHorizontal
            size={18}
            strokeWidth={2}
            className=" cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="pt-16 flex flex-col gap-20">
          <div className="flex flex-col gap-12">
            {sidebarLinks.map((item, index) => (
              <ul key={index}>
                <SheetClose asChild>
                  <Link to={item.href} className="flex gap-5">
                    <div className="w-[18.3px] h-[18.3px]">{item.icon}</div>
                    <li className="text-[15.69px] font-normal">{item.label}</li>
                  </Link>
                </SheetClose>
              </ul>
            ))}
          </div>
          <div className="flex flex-col gap-12">
            {sidebarLinksTwo.map((item, index) => (
              <ul key={index}>
                <SheetClose asChild>
                  <Link to={item.href} className="flex gap-5">
                    <div className="w-[18.3px] h-[18.3px]">{item.icon}</div>
                    <li className="text-[15.69px] font-normal">{item.label}</li>
                  </Link>
                </SheetClose>
              </ul>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavBar;
